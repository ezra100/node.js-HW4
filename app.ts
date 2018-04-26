// tslint:disable:typedef

import * as express from "express";
import { Response } from "express-serve-static-core";
import { Request } from "express";
import * as path from "path";
// import bodyParser = require("body-parser");
import * as fs from "fs";
import * as formidable from "formidable";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import * as usersRouter from "./router/users-router";
import * as branchesRouter from "./router/branches-router";
import * as flowersRouter from "./router/flowers-router";
import * as resRouter from "./router/profile-router";
import { DBFactory } from "./DataBase/DBFactory";
import { Color, Flower, Customer, Manager, Employee } from "./types";


var app = express();
var db = DBFactory.getDB();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());

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
    if (!user) {
        res.status(400);
        res.end();
        return;
    }
    if (user.password === password) {
        res.cookie("userName", user.userName);
        res.status(200).json({ userType: user.className });
    } else {
        res.status(401);
        res.end();
    }

});
app.post(/\/ajax\/*/i, async function (req: Request, res) {
    var user = await db.findUser(req.cookies.userName);
    res.render(req.url.substring(1),
        { query: req.body, Color, user: user, data: { flowers: await db.getFlowers() } });

});





// redirecting form the home page to login page
app.get("/", function (req, res) {
    res.redirect(301, "/login");
});
app.get("/login", function (req, res) {
    res.render("login", { flowers: db.getFlowers() });
});





export default app;