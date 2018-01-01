"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const data = require("./data");
// tslint:disable:typedef
exports.router = express.Router();
const helpers_1 = require("./helpers");
exports.router.get("/", function (req, res) {
    var users = helpers_1.helpers.dataFilter(data.users, req.query.filter);
    res.json(users);
});
/**
 * add user
 */
exports.router.post("/", function (req, res) {
    var user = helpers_1.helpers.objectToUser(req.body.item);
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
exports.router.put("/", function (req, res) {
    var user = helpers_1.helpers.objectToUser(req.body.item);
    var index = data.users.findIndex((u) => u.compare(user));
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
exports.router.delete("/", function (req, res) {
    var user = helpers_1.helpers.objectToUser(req.body.item);
    var index = data.users.findIndex((u) => u.compare(user));
    if (index < 0) {
        res.write("User not found");
        res.status(400).end();
        return;
    }
    data.users.splice(index, 1);
    res.json(user);
});
//# sourceMappingURL=users-router.js.map