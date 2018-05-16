// tslint:disable:typedef

//#region import
import * as express from "express";
import { Response } from "express-serve-static-core";
import { Request } from "express";
import * as path from "path";
import * as fs from "fs";
import * as formidable from "formidable";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as crypto from "crypto";

import * as usersRouter from "./router/users-router";
import * as branchesRouter from "./router/branches-router";
import * as flowersRouter from "./router/flowers-router";
import * as resRouter from "./router/profile-router";
import { DBFactory } from "./DataBase/DBFactory";
import { User, Color, Flower, Customer, Manager, Employee, Provider } from "./types";
import * as session from "express-session";
import * as passport from "passport";
import { Strategy } from "passport-local";
//#endregion


//#region initialize
let secret = "atgasdv82aergfnsg";
var app = express();
var db = DBFactory.getDB();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser(secret));
// this must become before loginRouter
app.use(session({ secret }));


passport.use(new Strategy(
    async function (username, password, cb) {
        db.findUser(username).catch(cb).then((user) => {
            if (user && user.password === password) {
                return cb(null, user);
            }
            return cb(null, false, { message: "Wrong username or password" });
        });
    }));

passport.serializeUser(function (user: User, cb) {
    cb(null, user.userName);
});

passport.deserializeUser(async function (userName: string, cb) {
    db.findUser(userName).catch(cb).then(
        (user) =>
            cb(null, <User>user)
    );
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



app.post("/logout", function (req: Request, res) {
    req.logout()
    res.end();
});
app.post(/\/ajax\/*/i, async function (req: Request, res) {
    res.render(req.url.substring(1),
        { query: req.body, Color, user: req.user, data: { flowers: await db.getFlowers() } });

});





// redirecting form the home page to login page
app.get("/", function (req, res) {
    // temporary redirect, we don't want it to be cached in the browser after a shutdown
    res.redirect(307, "/login");
});
app.get(["/login", "/index"], function (req, res) {
    res.render("login", { flowers: db.getFlowers() });
});

let userProperties: string[] = [
    "address",
    "userName",
    "firstName",
    "lastName",
    "password",
    "email",
    "gender",
    "className"
];
app.post("/signup", async function (req: Request, res) {
    let user: any = {};
    for (let key of userProperties) {
        user[key] = req.body[key];
    }
    if (user.className === Provider.name) {
        user.branchID = req.body.branchID;
    }
    // todo(?) validation here or on the DB
    user = await db.addUser(<User>user).catch(
        function (reason) {
            res.status(500).end("Failed to add user, reason: " + JSON.stringify(reason));
        }
    );
    res.render("signup-success", { user });
});

app.post("/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
        res.status(200).json({ userType: req.user.className });
    }
);

function getRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString("hex") /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
}
function sha512(password: string, salt: string): { salt: string, passwordHash: string } {
    var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest("hex");
    return {
        salt: salt,
        passwordHash: value
    };
}

export default app;