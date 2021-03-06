import express = require("express");
import { DBFactory } from "../DataBase/DBFactory";
import {User, Flower, Customer, Manager, Employee, Provider } from "../types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "../helpers";

var db = DBFactory.getDB();

router.get("/", async function (req, res) {
    var client = req.user;
    var filter = req.query.filter;
    var usersPromise: Promise<User[]> =
        db.getUsers(client.className === Manager.name ? null /* = any type*/ : [Customer, Provider], filter);
    res.json(await usersPromise);
});



/**
 * update user
 */
router.put("/", async function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    res.json(await db.updateUser(user));
});
/**
 * add user
 */
router.post("/", async function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    let password = req.body.password;
    res.json(await db.addUser(user, password));
});
/**
 * delete user
 */
router.delete("/", async function (req, res) {
    res.json(await db.deleteUser(req.body.item));
});

