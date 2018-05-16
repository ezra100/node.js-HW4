"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:typedef
const express = require("express");
const DBFactory_1 = require("../DataBase/DBFactory");
let db = DBFactory_1.DBFactory.getDB();
var router = express.Router();
exports.default = router;
//# sourceMappingURL=login.js.map