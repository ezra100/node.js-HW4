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
const bodyParser = require("body-parser");
const fs = require("fs");
const formidable = require("formidable");
const users = require("./router/users-router");
const branchesRouter = require("./router/branches-router");
const DBFactory_1 = require("./DataBase/DBFactory");
var app = express();
var db = DBFactory_1.DBFactory.getDB();
app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
// app.use(cookieParser());
// to get access for the post method fields https://stackoverflow.com/a/12008719/4483033
// 
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
        var user = yield db.findUser(req.body.clientUserName);
        res.render(req.url.substring(1), { query: req.body, user: user, data: { flowers: yield db.getFlowers() } });
    });
});
var defaultImgae = path.join(__dirname, "/res/profile-images/default.png");
var profileLocatoin = "/res/profile-images/";
// returns the user's profile image image
app.get("/res/profile-image", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = req.cookies && req.cookies.userName && (yield db.findUser(req.cookies.userName).catch(console.error));
        if (user && user.image) {
            var imgPath = path.join(__dirname, profileLocatoin, user.image);
            if (fs.existsSync(imgPath)) {
                res.sendfile(imgPath);
                return;
            }
        }
        res.sendFile(defaultImgae);
    });
});
// uploads an image from the client (via form)
app.post("/res/profile-image", function (req, res) {
    var form = new formidable.IncomingForm();
    var userName = req.cookies && req.cookies.userName;
    form.parse(req);
    form.on("fileBegin", function (name, file) {
        let fName = file.name;
        var tempPath = path.join(__dirname, profileLocatoin, fName);
        while (fs.existsSync) {
            let rand = (Math.random() * 1000).toFixed(0);
            tempPath = path.join(__dirname, profileLocatoin, fName.substring(0, fName.lastIndexOf(".")) + rand + fName.substring(fName.lastIndexOf(".")));
        }
        file.path = tempPath;
    });
    form.on("file", function (name, file) {
        console.log("Uploaded " + file.name);
        db.updateUserById(userName, { image: file.name });
    });
    res.end();
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