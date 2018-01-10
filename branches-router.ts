import express = require("express");
import { DBFactory } from "./DataBase/DBFactory";
import { Branch, Customer, Manager, Employee } from "./types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "./helpers";

var db = DBFactory.getDB();

router.get("/", function (req, res) {
    var filter = req.query.filter;
    var branches = db.getBranches(req.query.filter);
    res.json(branches);
});



/**
 * update branch
 */
router.put("/", function (req, res) {
    var branch = new Branch(req.body.item);
    res.json(db.updateBranch(branch));
});
/**
 * add branch
 */
router.post("/", function (req, res) {
    var branch = new Branch(req.body.item);
    res.json(db.addBranch(branch));
});
/**
 * delete branch
 */
router.delete("/", function (req, res) {
    res.json(db.deleteBranch(req.body.item));
});

