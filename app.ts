// tslint:disable:typedef

import * as express from "express";
import { Response } from "express-serve-static-core";
import { Request } from "express";
import * as path from "path";
import * as fs from "fs";
import * as formidable from "formidable";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import * as usersRouter from "./router/users-router";
import * as branchesRouter from "./router/branches-router";
import * as flowersRouter from "./router/flowers-router";
import * as resRouter from "./router/profile-router";
import { DBFactory } from "./DataBase/DBFactory";
import { User, Color, Flower, Customer, Manager, Employee, Provider } from "./types";
import * as session from "express-session";
let secret = "atgasdv82aergfnsg";
var app = express();
var db = DBFactory.getDB();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser(secret));
app.use(session({ secret }));

// set the view engine to ejs
app.set("view engine", "ejs");
app.use("/users", usersRouter.router);
app.use("/branches", branchesRouter.router);
app.use("/flowers", flowersRouter.router);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/res", resRouter.router);

app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/favicon.jpg"));
});

app.post("/login", async function (req, res) {
    var clientUserName = req.body.clientUserName;
    var password = req.body.password;
    var user = await db.findUser(clientUserName);
    if (user && user.password === password) {
        req.session.userName = user.userName;
        req.session.userType = user.className;
        res.status(200).json({ userType: user.className });
    } else {
        res.status(401);
        res.end();
    }
});

app.post("/logout", function (req: Request, res) {
    delete req.session.userName;
    delete req.session.userType;
    res.end();
});
app.post(/\/ajax\/*/i, async function (req: Request, res) {
    var user = await db.findUser(req.session.userName);
    res.render(req.url.substring(1),
        { query: req.body, Color, user: user, data: { flowers: await db.getFlowers() } });

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
]
app.post("/signup", async function (req: Request, res) {
    let user: any = {};
    for (let key of userProperties) {
        user[key] = req.body[key];
    }
    if (user.className === Provider.name) {
        user.branchID = req.body.branchID;
    }
    // todo(?) validation here or on the DB
    user = await db.addUser(<User>user).catch(res.json);
    res.render("signup-success", {user});
});

export default app;