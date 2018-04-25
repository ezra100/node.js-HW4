import express = require("express");
import { DBFactory } from "../DataBase/DBFactory";
import { User, Flower, Customer, Manager, Employee, Provider } from "../types";
import path = require("path");
import {URL} from "url";
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "../helpers";
import { Router } from "express-serve-static-core";
import * as multer from "multer";
import * as fs from "fs";
import * as crypto from "crypto";
import * as mime from "mime";
import * as https from "https";
import * as http from "http";
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

var db = DBFactory.getDB();

router.get("/", async function (req, res) {
    var flowersPromise: Promise<Flower[]> = db.getFlowers();
    res.json(await flowersPromise);
});




/**
 * add flower
 */
router.post("/", upload.any(), async function (req, res) {
    var flower = new Flower({
        name: req.body.name,
        family: req.body.family,
        price: parseFloat(req.body.price),
        color: req.body.color,
    });
    var files: any[] = <any>req.files;
    if (files.length > 0) {
        flower.img = new URL("/flowers/" + files[0].filename, hostBase);
    } else {
        var url = new URL(req.body["image-url"]);
        var file = fs.createWriteStream(path.join(flowersDir, flower.name));
        let request;
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
        flower.img = new URL("/flowers/" + flower.name, hostBase);

    }
    res.json(await db.addFlower(flower));
});


