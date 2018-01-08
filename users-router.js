"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBFactory_1 = require("./DataBase/DBFactory");
const types_1 = require("./types");
// tslint:disable:typedef
exports.router = express.Router();
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    var client = db.findUser(req.query.clientUserName);
    var users = db.getUsers(client instanceof types_1.Manager ? [types_1.User] : [types_1.Customer], req.query.filter);
    res.json(users);
});
/**
 * add user
 */
exports.router.post("/", function (req, res) {
    res.json(db.updateUser(req.body.item));
});
/**
 * update user
 */
exports.router.put("/", function (req, res) {
    res.json(db.addUser(req.body.item));
});
/**
 * delete user
 */
exports.router.delete("/", function (req, res) {
    res.json(db.deleteUser(req.body.item));
});
//# sourceMappingURL=users-router.js.map