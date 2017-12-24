"use strict";
// tslint:disable:typedef
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const types_1 = require("./types");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
// set the view engine to ejs
app.set("view engine", "ejs");
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.post("/login", function (req, res) {
    var userName = req.body.name;
    var password = req.body.password;
    var user = types_1.Person.findByUserName(userName);
    if (!user) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end();
        return;
    }
    if (user.password === password) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
    }
    else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end();
    }
});
app.get(/\/ajax\/*/i, function (req, res) {
    res.render(req.url.substring(1, req.url.indexOf("?")), { query: req.query, user: types_1.Person.findByUserName(req.query.userName) });
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
//# sourceMappingURL=index.js.map