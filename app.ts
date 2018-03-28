// tslint:disable:typedef

import express = require("express");
import { DBFactory } from "./DataBase/DBFactory";
import { Color, Flower, Customer, Manager, Employee } from "./types";
import { Response } from "express-serve-static-core";
import { Request } from "express";
 var app = express();
import path = require("path");
import bodyParser = require("body-parser");
import users = require("./router/users-router");
import branchesRouter = require("./router/branches-router");
var db = DBFactory.getDB();
// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// set the view engine to ejs
app.set("view engine", "ejs");


app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/favicon.jpg"));
});

app.post("/login",async function (req, res) {
    var clientUserName = req.body.clientUserName;
    var password = req.body.password;
    var user = await db.findUser(clientUserName);
    if (!user) {
        res.status(400);
        res.end();
        return;
    }
    if (user.password === password) {
        res.status(200).json({ userType: user.className });
    } else {
        res.status(401);
        res.end();
    }

});
app.post(/\/ajax\/*/i,async function (req: Request, res) {
    var user = await db.findUser(req.body.clientUserName);
    res.render(req.url.substring(1),
        { query: req.body, user: user, data: { flowers:  await db.getFlowers() } });

});



// redirecting form the home page to login page
app.get("/", function (req, res) {
    res.redirect(301, "/login");
});
app.get("/login", function (req, res) {
    res.render("login", { flowers: db.getFlowers() });
});



app.use("/users", users.router);
app.use("/branches", branchesRouter.router);
app.use("/", express.static(path.join(__dirname, "public")));


export = app;

