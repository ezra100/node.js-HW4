import express = require("express");
import * as data from "./data";
import { User, Customer, Manager, MyWorker } from "./types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "./helpers";


router.get("/", function (req, res) {
    var users = helpers.dataFilter(data.users, req.query.filter);
    res.json(users);
});

/**
 * add user
 */
router.post("/", function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    // check that the user doesn't exists yet
    if (data.users.findIndex((u) => u.compare(user)) >= 0) {
        res.write("User already exists");
        res.status(400).end();
        return;
    }
    data.users.push(user);
    res.json(user);
});
/**
 * update user
 */
router.put("/", function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    var index: number = data.users.findIndex((u) => u.compare(user));
    if (index < 0) {
        res.write("User not found");
        res.status(400).end();
        return;
    }
    data.users[index] = user;
    res.json(user);
});
/**
 * delete user
 */
router.delete("/", function (req, res) {
    var user = helpers.objectToUser(req.body.item);
    var index: number = data.users.findIndex((u) => u.compare(user));
    if (index < 0) {
        res.write("User not found");
        res.status(400).end();
        return;
    }
    data.users.splice(index, 1);
    res.json(user);
});

