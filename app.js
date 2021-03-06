"use strict";
// tslint:disable:typedef
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region import
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto_1 = require("./crypto");
const usersRouter = require("./router/users-router");
const branchesRouter = require("./router/branches-router");
const flowersRouter = require("./router/flowers-router");
const resRouter = require("./router/profile-router");
const DBFactory_1 = require("./DataBase/DBFactory");
const types_1 = require("./types");
const session = require("express-session");
const passport = require("passport");
const passport_local_1 = require("passport-local");
const initDB_1 = require("./DataBase/initDB");
const helpers_1 = require("./helpers");
//#endregion
//#region initialize
initDB_1.initDB();
let secret = "atgasdv82aergfnsg";
var app = express();
var db = DBFactory_1.DBFactory.getDB();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(secret));
// this must become before loginRouter
app.use(session({ secret }));
let tempSecrets = {};
passport.use(new passport_local_1.Strategy(function (username, password, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        db.findUser(username).catch(cb).then((user) => {
            if (user) {
                let hashedPassword = crypto_1.sha512(user.hashedPassword, tempSecrets[username]);
                if (hashedPassword === password) {
                    return cb(null, user);
                }
            }
            return cb(null, false, { message: "Wrong username or password" });
        });
    });
}));
passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});
passport.deserializeUser(function (username, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        db.findUser(username).catch(cb).then((user) => cb(null, user));
    });
});
app.use(passport.initialize());
app.use(passport.session());
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/users", usersRouter.router);
app.use("/branches", branchesRouter.router);
app.use("/flowers", flowersRouter.router);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/res", resRouter.router);
//#endregion
// server favicon (without an external package)
app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/favicon.jpg"));
});
// logout the user
app.post("/logout", function (req, res) {
    req.logout();
    res.end();
});
// serves html parts that are requested via ajax (see the views/ajax folder)
app.post(/\/ajax\/*/i, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render(req.url.substring(1), { query: req.body, Color: types_1.Color, user: req.user, data: { flowers: yield db.getFlowers() } });
    });
});
// redirecting form the home page to login page
app.get("/", function (req, res) {
    // temporary redirect, we don't want it to be cached in the browser after a shutdown
    res.redirect(307, "/login");
});
app.get(["/login", "/index"], function (req, res) {
    res.render("login", { flowers: db.getFlowers() });
});
let userProperties = [
    "address",
    "username",
    "firstName",
    "lastName",
    "email",
    "gender",
    "className"
];
app.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {};
        for (let key of userProperties) {
            user[key] = req.body[key];
        }
        if (user.className === types_1.Provider.name) {
            user.branchID = req.body.branchID;
        }
        // todo(?) validation here or on the DB
        user = yield db.addUser(user, req.body.password).catch(function (reason) {
            res.status(500).end("Failed to add user, reason: " + JSON.stringify(reason));
        });
        res.render("signup-success", { user });
    });
});
app.post("/login", passport.authenticate("local", { failureMessage: "wrong username or password" }), function (req, res) {
    if (req.user) {
        res.status(200).json({ userType: req.user.className });
        return;
    }
    res.status(400).end("Wrong username or password");
});
let updateUserProperties = [
    "address",
    "username",
    "firstName",
    "lastName",
    "email",
    "gender",
    "className"
];
app.post("/update-details", function (req, res) {
    let user = {};
    for (let key of userProperties) {
        if (req.body[key]) {
            user[key] = req.body[key];
        }
    }
    let username = req.user.username;
    let response = db.updateUserById(username, user);
    res.render("redirect", {
        data: {
            header: "user updated successfully",
            paragraph: "",
            redirect: "/index"
        }
    });
});
//#region reset
// reset message that will be sent to the user by mail
const resetString = `
Dear customer <br>
You've requested a password reset for your account, in order to complete this procedure please click the follwoing 
<a href="placeholder">
link
</a>
<br>
Thanks,
<br>
Flowers++
`;
// request a password reset - sends an email to the given address if a user with such email exists
app.post("/requestPasswordReset", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let email = req.body.email;
        let key = crypto_1.getRandomString(16);
        let users = yield db.getUsers(null, { email: email });
        if (users.length > 1) {
            res.status(400).end("There's more than one user with the email " + email);
            return;
        }
        let user = users[0];
        if (!(user && user.username)) {
            res.status(400).end("There's no user with the email " + email);
            return;
        }
        if (!user.username) {
            console.log(user);
            console.error(user.username + " not found");
        }
        db.updateResetKey(user.username, key);
        helpers_1.helpers.sendEmail(email, user.firstName + " " + user.lastName, "Password reset for your account at flowers++", resetString.replace("placeholder", "https://localhost:3000/completeReset?key=" + key + "&&username=" + user.username));
        res.end("reset email sent to " + email);
    });
});
// returns a page with the reset form
app.get("/completeReset", function (req, res) {
    let key = req.query.key;
    let username = req.query.username;
    res.render("password-recovery", { key, username });
});
// the target of the reset form - here the  password is replaced with the new one
app.post("/completeReset", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = req.body.key;
        let username = req.body.username;
        let newPassword = req.body.password;
        let userData = yield db.getResetKey(username);
        if (newPassword && userData && userData.recoveryKey === key) {
            // if more than 24 hours past since the creation
            if ((new Date()).getTime() - userData.creationDate.getTime() >= (1000 * 3600 * 24)) {
                res.status(400).end("Can't reset after more than 24 hours");
                return;
            }
            db.updateUserById(username, {}, newPassword);
            res.render("redirect", {
                data: {
                    header: "password reset successfully",
                    paragraph: "you'll be redirected to login soon",
                    redirect: "/login",
                    title: "password reset successfully"
                }
            });
            db.removeKey(username);
            return;
        }
        else {
            res.status(400).end("failed to reset password, key doesn't match or username not found");
        }
    });
});
//#endregion
// requests the salts for the challengs
app.post("/salts", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = req.body.user.username;
        tempSecrets[username] = crypto_1.getRandomString(crypto_1.hashLength);
        res.json({
            tempSalt: tempSecrets[username],
            permSalt: (yield db.findUser(username)).salt
        });
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map