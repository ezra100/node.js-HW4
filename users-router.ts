import express = require("express");
import { DBFactory } from "./DataBase/DBFactory";
import { User, Customer, Manager, Employee, Provider } from "./types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "./helpers";

var db = DBFactory.getDB();

router.get("/", function (req, res) {
    var client = db.findUser(req.query.clientUserName);
    var filter = req.query.filter;
    var users = db.getUsers(client instanceof Manager ? [User] : [Customer, Provider], filter);
    res.json(users);
});



/**
 * update user
 */
router.put("/", function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    res.json(db.updateUser(user));
});
/**
 * add user
 */
router.post("/", function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    res.json(db.addUser(user));
});
/**
 * delete user
 */
router.delete("/", function (req, res) {
    res.json(db.deleteUser(req.body.item));
});

