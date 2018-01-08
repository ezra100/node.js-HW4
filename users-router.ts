import express = require("express");
import { DBFactory } from "./DataBase/DBFactory";
import { User, Customer, Manager, Employee } from "./types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "./helpers";

var db = DBFactory.getDB();

router.get("/", function (req, res) {
    var users = db.getUsers(req.query.filter);
    res.json(users);
});



/**
 * add user
 */
router.post("/", function (req, res) {
    res.json( db.updateUser(req.body.item));


});
/**
 * update user
 */
router.put("/", function (req, res) {
    res.json(db.addUser(req.body.item));
});
/**
 * delete user
 */
router.delete("/", function (req, res) {
    res.json(db.deleteUser(req.body.item));
});

