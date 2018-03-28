"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBFactory_1 = require("../DataBase/DBFactory");
const types_1 = require("../types");
// tslint:disable:typedef
exports.router = express.Router();
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var filter = req.query.filter;
        var branchesPromise = db.getBranches(req.query.filter);
        res.json(yield branchesPromise);
    });
});
/**
 * update branch
 */
exports.router.put("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var branch = new types_1.Branch(req.body.item);
        res.json(yield db.updateBranch(branch));
    });
});
/**
 * add branch
 */
exports.router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var branch = new types_1.Branch(req.body.item);
        res.json(yield db.addBranch(branch));
    });
});
/**
 * delete branch
 */
exports.router.delete("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield db.deleteBranch(req.body.item));
    });
});
//# sourceMappingURL=branches-router.js.map