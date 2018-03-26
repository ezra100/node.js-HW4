"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const types_1 = require("../types");
// import the mongoose module
const mongoose = require("mongoose");
// set up default mongoose connection
var connectionString = "mongodb://127.0.0.1/localhost";
mongoose.connect(connectionString);
// get the default connection
var db = mongoose.connection;
// define a schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id: String,
    className: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    gender: Number,
    address: String
});
let userModel = mongoose.model("User", UserSchema);
let customerModel = userModel.discriminator("Customer", new mongoose.Schema({}, { discriminatorKey: "customer" }));
let providerModel = userModel.discriminator("Provider", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "provider" }));
let employeerModel = userModel.discriminator("Employee", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "employee" }));
let managerModel = userModel.discriminator("Manager", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "manager" }));
// bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
class MongoDB {
    getFlowers() {
        return data_1.flowers;
    }
    //#region users
    getUsers(types, filter) {
        if (types) {
            // if filter isn't defined yet, define it as an empty object
            filter = filter || {};
            // types = types.map((v, i, a) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
            filter.className = new RegExp("^(" + types.map((clss) => clss.className).join("|") + ")$");
        }
        for (var key in filter) {
            if (filter[key] === "") {
                continue;
            }
            switch (typeof types_1.User[key]) {
                case "string":
                    // replace it with a regex that will search for any one of the given words
                    filter[key] = new RegExp(filter[key].split(/\s+/)
                        .map((v) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join("|"), "gi");
                    break;
                case "boolean":
                    if (typeof filter[key] === "string") {
                        if (filter[key] === "") {
                            delete filter[key];
                        }
                        else {
                            filter[key] = (filter[key] === "true");
                        }
                    }
                    break;
                case "number":
                    // exception for 'gender' since it's an enum
                    if (typeof filter[key] === "string" || filter[key] instanceof String) {
                        filter[key] = parseInt(filter[key], 10);
                    }
                    if (key === "gender" && filter[key] === "0") {
                        delete filter[key];
                    }
            }
        }
        return new Promise((resolve, reject) => {
            userModel.find(filter, (err, users) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(users);
            });
        });
    }
    findUser(userName) {
        return new Promise((resolve, reject) => {
            userModel.findById(userName, (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }
    updateUser(user) {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(user.userName, user, (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            let userDoc = new userModel(Object.assign({}, user, { _id: user.userName }));
            userDoc.save((err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }
    deleteUser(user) {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndRemove(user.userName, (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }
    //#endregion
    //#region branches
    getBranches(filter) {
        return data_1.branches.filter((branch) => {
            for (var key in filter) {
                if (filter[key] === "") {
                    continue;
                }
                switch (typeof branch[key]) {
                    case "string":
                        var regex = new RegExp(filter[key].split(/\s+/).join("|"), "gi");
                        if (!regex.test(branch[key])) {
                            return false;
                        }
                        break;
                    case "boolean":
                        if (typeof filter[key] === "string") {
                            filter[key] = (filter[key] === "true");
                        }
                        if (filter[key] !== branch[key]) {
                            return false;
                        }
                        break;
                    case "number":
                        if (parseFloat(filter[key]) !== branch[key]) {
                            return false;
                        }
                }
            }
            return true;
        });
    }
    addBranch(branch) {
        if (data_1.branches.findIndex((b) => branch.id === b.id) >= 0) {
            console.error("User" + branch.id + ":" + branch.name + " already exists");
            return null;
        }
        data_1.branches.push(branch);
        return branch;
    }
    updateBranch(branch) {
        var index = data_1.branches.findIndex((b) => b.id === branch.id);
        if (index < 0) {
            console.error("Branch not found");
            return null;
        }
        data_1.branches[index] = branch;
        return branch;
    }
    deleteBranch(branch) {
        var index = data_1.branches.findIndex((b) => b.id === branch.id);
        if (index < 0) {
            console.error("Branch not found");
            return null;
        }
        data_1.branches.splice(index, 1);
        return branch;
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=mongoDB.js.map