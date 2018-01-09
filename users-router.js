"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBFactory_1 = require("./DataBase/DBFactory");
const types_1 = require("./types");
// tslint:disable:typedef
exports.router = express.Router();
const helpers_1 = require("./helpers");
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    var client = db.findUser(req.query.clientUserName);
    var filter = req.query.filter;
    filter.gender = parseInt(filter.gender, 10);
    var users = db.getUsers(client instanceof types_1.Manager ? [types_1.User] : [types_1.Customer, types_1.Provider], filter);
    res.json(users);
});
/**
 * update user
 */
exports.router.put("/", function (req, res) {
    var user = helpers_1.helpers.objectToUser(req.body.item);
    res.json(db.updateUser(user));
});
/**
 * add user
 */
exports.router.post("/", function (req, res) {
    var user = helpers_1.helpers.objectToUser(req.body.item);
    res.json(db.addUser(user));
});
/**
 * delete user
 */
exports.router.delete("/", function (req, res) {
    res.json(db.deleteUser(req.body.item));
});
//# sourceMappingURL=users-router.js.map