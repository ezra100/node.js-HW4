// tslint:disable:typedef

import express = require("express");
import * as data from "./data";
import { Color, User, Customer, Manager, MyWorker } from "./types";
import { Response } from "express-serve-static-core";
import { Request } from "express";
var app = express();
import path = require("path");
import bodyParser = require("body-parser");
import users = require("./users-router");

// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// set the view engine to ejs
app.set("view engine", "ejs");


app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/logo-black.jpg"));
});

app.post("/login", function (req, res) {
    var clientUserName = req.body.clientUserName;
    var password = req.body.password;
    var user = User.findByUserName(clientUserName, data.users);
    if (!user) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end();
        return;
    }
    if (user.password === password) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
    } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end();
    }

});
app.get(/\/ajax\/*/i, function (req: Request, res) {
    var user = User.findByUserName(req.query.clientUserName);
    res.render(req.url.substring(1, req.url.indexOf("?")),
        { query: req.query, user: user, data: data });

});



// redirecting form the home page to login page
app.get("/", function (req, res) {
    res.redirect(301, "/login");
});
app.get("/login", function (req, res) {
    res.render("login", { flowers: data.flowers });
});


app.use("/users", users.router);
app.use("/", express.static(path.join(__dirname, "public")));

app.listen(8080);
console.log("8080 is the magic port");

