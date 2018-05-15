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
const helpers_1 = require("../helpers");
var db = DBFactory_1.DBFactory.getDB();
exports.router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var client = yield db.findUser(req.query.clientUserName);
        var filter = req.query.filter;
        var usersPromise = db.getUsers(client.className === types_1.Manager.name ? null /* = any type*/ : [types_1.Customer, types_1.Provider], filter);
        res.json(yield usersPromise);
    });
});
/**
 * update user
 */
exports.router.put("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = helpers_1.helpers.objectToUser(req.body.item);
        res.json(yield db.updateUser(user));
    });
});
/**
 * add user
 */
exports.router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = helpers_1.helpers.objectToUser(req.body.item);
        res.json(yield db.addUser(user));
    });
});
/**
 * delete user
 */
exports.router.delete("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield db.deleteUser(req.body.item));
    });
});
//# sourceMappingURL=users-router.js.map