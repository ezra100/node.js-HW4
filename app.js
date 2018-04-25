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
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const usersRouter = require("./router/users-router");
const branchesRouter = require("./router/branches-router");
const flowersRouter = require("./router/flowers-router");
const resRouter = require("./router/profile-router");
const DBFactory_1 = require("./DataBase/DBFactory");
const types_1 = require("./types");
var app = express();
var db = DBFactory_1.DBFactory.getDB();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
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
            res.cookie("userName", user.userName);
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
        var user = yield db.findUser(req.cookies.userName);
        res.render(req.url.substring(1), { query: req.body, Color: types_1.Color, user: user, data: { flowers: yield db.getFlowers() } });
    });
});
// redirecting form the home page to login page
app.get("/", function (req, res) {
    res.redirect(301, "/login");
});
app.get("/login", function (req, res) {
    res.render("login", { flowers: db.getFlowers() });
});
module.exports = app;
//# sourceMappingURL=app.js.map