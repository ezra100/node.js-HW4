"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBFactory_1 = require("../DataBase/DBFactory");
const types_1 = require("../types");
// tslint:disable:typedef
exports.router = express.Router();
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    var filter = req.query.filter;
    var branches = db.getBranches(req.query.filter);
    res.json(branches);
});
/**
 * update branch
 */
exports.router.put("/", function (req, res) {
    var branch = new types_1.Branch(req.body.item);
    res.json(db.updateBranch(branch));
});
/**
 * add branch
 */
exports.router.post("/", function (req, res) {
    var branch = new types_1.Branch(req.body.item);
    res.json(db.addBranch(branch));
});
/**
 * delete branch
 */
exports.router.delete("/", function (req, res) {
    res.json(db.deleteBranch(req.body.item));
});
//# sourceMappingURL=branches-router.js.map