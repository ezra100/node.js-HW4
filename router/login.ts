// tslint:disable:typedef
import * as express from "express";
import { Router } from "express-serve-static-core";
import { Strategy } from "passport-local";
import * as passport from "passport";



import { DBFactory } from "../DataBase/DBFactory";
import { IDataBase } from "../DataBase/IDataBase";
let db = DBFactory.getDB();

import { User, Flower, Customer, Manager, Employee, Provider } from "../types";
var router = express.Router();







export default router;