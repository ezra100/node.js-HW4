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
const DBFactory_1 = require("./DBFactory");
const data_1 = require("./data");
let db = DBFactory_1.DBFactory.getDB();
function initUsers() {
    // todo
    data_1.users.forEach(function (user) {
        db.addUser(user, user.hashedPassword);
    });
    // branches
    //     .map((u) => new branchModel(u))
    //     .forEach((v) => v.save((err: Error, branch: Branch) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         console.log(branch);
    //     }
    //     ));
    // flowers
    //     .map((u) => new flowerModel(u))
    //     .forEach((v) => v.save((err: Error, flower: Flower) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         console.log(flower);
    //     }
    //     ));
}
exports.initUsers = initUsers;
// here we decide if to init or not
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield db.getUsers()).length < 5) {
            initUsers();
        }
    });
}
init();
//# sourceMappingURL=initDB.js.map