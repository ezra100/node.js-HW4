// tslint:disable:typedef

import express = require("express");
import * as data from "./data";
import { Person, Customer, Manager, MyWorker } from "./types";
import { Response } from "express-serve-static-core";
import { Request } from "express";
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


// set the view engine to ejs
app.set("view engine", "ejs");
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css", express.static(path.join(__dirname, "css")));




app.post("/login", function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var user = Person.findByUserName(userName, data.persons);
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
    res.render(req.url.substring(1, req.url.indexOf("?")),
        { query: req.query, user: Person.findByUserName(req.query.userName) });

});



// redirecting form the home page to login page
app.get("/", function (req, res) {
    res.redirect(301, "/login");
});
app.get("/login", function (req, res) {
    res.render("login");
});

app.listen(8080);
console.log("8080 is the magic port");
