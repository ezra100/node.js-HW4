// tslint:disable:typedef
import * as express from "express";
import { Router } from "express-serve-static-core";
//import * as multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as mime from "mime";

import { DBFactory } from "../DataBase/DBFactory";
import { IDataBase } from "../DataBase/IDataBase";

export var router: Router = express.Router();

var db: IDataBase = DBFactory.getDB();
var defaultImgae: string = path.join(__dirname, "../res/profile-images/default.png");
var profileLocatoin: string = path.join(__dirname, "../res/profile-images/");

// var storage = multer.diskStorage({
//     destination: profileLocatoin,
//     filename: function (req, file, cb) {
//         crypto.randomBytes(16, function (err, raw) {
//         cb(null, raw.toString("hex") + Date.now() + "." + mime.getExtension(file.mimetype));
//       });
//     }
//   });

// let upload = multer({ storage });


// returns the user's profile image image
router.get("/profile-image", async function (req, res) {
    var user = req.session.userName && await db.findUser(req.session.userName).catch(console.error);
    if (user && user.image) {
        var imgPath = path.join(profileLocatoin, user.image);
        if (fs.existsSync(imgPath)) {
            res.sendfile(imgPath);
            return;
        }
    }
    res.sendFile(defaultImgae);
});

// uploads an image from the client (via form)
router.post("/profile-image", /*upload.any(), */ function (req, res) {
    var userName = req.session.userName;
    db.updateUserById(userName, { image: (<any>req.files)[0].filename });
    res.end();
});