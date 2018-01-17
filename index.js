"use strict";
// tslint:disable:typedef
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBFactory_1 = require("./DataBase/DBFactory");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const users = require("./users-router");
const branchesRouter = require("./branches-router");
var db = DBFactory_1.DBFactory.getDB();
// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
// set the view engine to ejs
app.set("view engine", "ejs");
app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "public/img/favicon.jpg"));
});
app.post("/login", function (req, res) {
    var clientUserName = req.body.clientUserName;
    var password = req.body.password;
    var user = db.findUser(clientUserName);
    if (!user) {
        res.status(400);
        res.end();
        return;
    }
    if (user.password === password) {
        res.status(200).json({ userType: user.className });
    }
    else {
        res.status(401);
        res.end();
    }
});
app.post(/\/ajax\/*/i, function (req, res) {
    var user = db.findUser(req.body.clientUserName);
    res.render(req.url.substring(1), { query: req.body, user: user, data: { flowers: db.getFlowers() } });
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
app.listen(8080);
console.log("8080 is the magic port");
//# sourceMappingURL=index.js.map