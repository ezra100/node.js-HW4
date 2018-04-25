"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:typedef
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime");
const DBFactory_1 = require("../DataBase/DBFactory");
exports.router = express.Router();
var db = DBFactory_1.DBFactory.getDB();
var defaultImgae = path.join(__dirname, "../res/profile-images/default.png");
var profileLocatoin = path.join(__dirname, "../res/profile-images/");
var storage = multer.diskStorage({
    destination: profileLocatoin,
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            cb(null, raw.toString("hex") + Date.now() + "." + mime.getExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage });
// returns the user's profile image image
exports.router.get("/profile-image", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = req.cookies && req.cookies.userName && (yield db.findUser(req.cookies.userName).catch(console.error));
        if (user && user.image) {
            var imgPath = path.join(profileLocatoin, user.image);
            if (fs.existsSync(imgPath)) {
                res.sendfile(imgPath);
                return;
            }
        }
        res.sendFile(defaultImgae);
    });
});
// uploads an image from the client (via form)
exports.router.post("/profile-image", upload.any(), function (req, res) {
    var userName = req.cookies && req.cookies.userName;
    db.updateUserById(userName, { image: req.files[0].filename });
    res.end();
});
//# sourceMappingURL=profile-router.js.map