import express = require("express");
import { DBFactory } from "../DataBase/DBFactory";
import { Branch, Customer, Manager, Employee } from "../types";
import path = require("path");
// tslint:disable:typedef
export var router = express.Router();
import { helpers } from "../helpers";

var db = DBFactory.getDB();

router.get("/", async function (req, res) {
    var filter = req.query.filter;
    var branchesPromise = db.getBranches(req.query.filter);
    res.json(await branchesPromise);
});



/**
 * update branch
 */
router.put("/", async function (req, res) {
    var branch = new Branch(req.body.item);
    res.json(await db.updateBranch(branch));
});
/**
 * add branch
 */
router.post("/", async function (req, res) {
    var branch = new Branch(req.body.item);
    res.json(await db.addBranch(branch));
});
/**
 * delete branch
 */
router.delete("/", async function (req, res) {
    res.json(await db.deleteBranch(req.body.item));
});

