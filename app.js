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
//#endregion
//#region initialize
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
passport.use(new passport_local_1.Strategy(function (username, hashedPassword, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        db.findUser(username).catch(cb).then((user) => {
            if (user) {
                let hashedPassword = crypto_1.sha512(user.hashedPassword, tempSecrets[username]);
                return cb(null, user);
            }
            return cb(null, false, { message: "Wrong username or password" });
        });
    });
}));
passport.serializeUser(function (user, cb) {
    cb(null, user.userName);
});
passport.deserializeUser(function (userName, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        db.findUser(userName).catch(cb).then((user) => cb(null, user));
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
app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/favicon.jpg"));
});
app.post("/logout", function (req, res) {
    req.logout();
    res.end();
});
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
    "userName",
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
app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    res.status(200).json({ userType: req.user.className });
});
app.post("/salts", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        tempSecrets[req.body.user.username] = crypto_1.getRandomString(crypto_1.hashLength);
        res.json({
            tempSalt: tempSecrets[req.user.userName],
            permSalt: (yield db.findUser(req.user.userName)).salt
        });
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map