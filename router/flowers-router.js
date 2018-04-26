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
const express = require("express");
const DBFactory_1 = require("../DataBase/DBFactory");
const types_1 = require("../types");
const path = require("path");
const url_1 = require("url");
// tslint:disable:typedef
exports.router = express.Router();
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const mime = require("mime");
const https = require("https");
const http = require("http");
var hostBase = "http://localhost:3000";
var flowersDir = path.join(__dirname, "../public/flowers");
if (!fs.existsSync(flowersDir)) {
    fs.mkdirSync(flowersDir);
}
var storage = multer.diskStorage({
    destination: flowersDir,
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            cb(null, raw.toString("hex") + Date.now() + "." + mime.getExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage });
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var flowersPromise = db.getFlowers();
        res.json(yield flowersPromise);
    });
});
/**
 * add flower
 */
exports.router.post("/", upload.any(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var flower = new types_1.Flower({
            name: req.body.name,
            family: req.body.family,
            price: parseFloat(req.body.price),
            colorDesc: req.body.color,
        });
        if ((yield db.findFlower(flower.name))) {
            res.status(400);
            res.end("flower named '" + flower.name + "' already exists");
            return;
        }
        let fileName;
        let request;
        let file;
        var files = req.files;
        if (files.length > 0) {
            fileName = files[0].filename;
        }
        else {
            var url = new url_1.URL(req.body["image-url"]);
            // prevent duplicates
            fileName = flower.name + Date.now();
            file = fs.createWriteStream(path.join(flowersDir, fileName));
            switch (url.protocol) {
                case "https:":
                    request = https.get(url, function (response) {
                        response.pipe(file);
                    });
                    break;
                case "http:":
                    request = http.get(url, function (response) {
                        response.pipe(file);
                    });
                    break;
                default:
                    throw "unknown protocol" + JSON.stringify(url);
            }
        }
        flower.img = new url_1.URL("/flowers/" + fileName, hostBase);
        res.json(yield db.addFlower(flower));
    });
});
//# sourceMappingURL=flowers-router.js.map