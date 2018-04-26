// tslint:disable:typedef
import * as express from "express";
import { Router } from "express-serve-static-core";
import * as multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as mime from "mime";
import * as https from "https";
import * as http from "http";
import { URL } from "url";

import { DBFactory } from "../DataBase/DBFactory";
import { IDataBase } from "../DataBase/IDataBase";


import { User, Flower, Customer, Manager, Employee, Provider } from "../types";
export var router = express.Router();



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
        colorDesc: req.body.color,
    });
    if ((await db.findFlower(flower.name))) {
        res.status(400);
        res.end("flower named '" + flower.name + "' already exists");
        return;
    }

    let fileName: string;
    let request: http.ClientRequest = null;
    let file: fs.WriteStream;
    var files: any[] = <any>req.files;
    if (files.length > 0) {
        fileName = files[0].filename;
    } else {
        var url = new URL(req.body["image-url"]);
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
    flower.img = new URL("/flowers/" + fileName, hostBase);
    // if there was a request, wait till the request complete to send the response
    // so that when the client asks for the image, the image would be on the server already
    request ? request.on("finish",async function () {
        res.json(await db.addFlower(flower));
    }) : res.json(await db.addFlower(flower));
});


