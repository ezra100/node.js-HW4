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
const express = require("express");
const DBFactory_1 = require("./DataBase/DBFactory");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const users = require("./router/users-router");
const branchesRouter = require("./router/branches-router");
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
    return __awaiter(this, void 0, void 0, function* () {
        var clientUserName = req.body.clientUserName;
        var password = req.body.password;
        var user = yield db.findUser(clientUserName);
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
});
app.post(/\/ajax\/*/i, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = yield db.findUser(req.body.clientUserName);
        res.render(req.url.substring(1), { query: req.body, user: user, data: { flowers: yield db.getFlowers() } });
    });
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
module.exports = app;
//# sourceMappingURL=app.js.map