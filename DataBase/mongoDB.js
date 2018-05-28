"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import the mongoose module
const mongoose = require("mongoose");
const crypto_1 = require("../crypto");
// set up default mongoose connection
var connectionString = "mongodb://127.0.0.1/flowersPP";
mongoose.connect(connectionString);
// get the default connection
var db = mongoose.connection;
//#region schema
// define a schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
    _id: String,
    className: String,
    firstName: String,
    lastName: String,
    username: String,
    hashedPassword: String,
    email: String,
    gender: Number,
    address: String,
    image: String,
    salt: String
});
let userDataSchema = new Schema({
    _id: String,
    username: String,
    recoveryKey: String,
    creationDate: Date
});
userDataSchema.pre("save", function (next) {
    this._id = this.username;
    next();
});
userSchema.pre("save", function (next) {
    this._id = this.username;
    next();
});
let userModel = mongoose.model("User", userSchema);
let userDataModel = mongoose.model("UserData", userDataSchema);
let customerModel = userModel.discriminator("Customer", new mongoose.Schema({}, { discriminatorKey: "customer" }));
let providerModel = userModel.discriminator("Provider", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "provider" }));
let employeerModel = userModel.discriminator("Employee", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "employee" }));
let managerModel = userModel.discriminator("Manager", new mongoose.Schema({ branchID: Number }, { discriminatorKey: "manager" }));
let branchSchema = new Schema({
    _id: Number,
    id: Number,
    address: String,
    active: Boolean,
    name: String
});
branchSchema.pre("save", function (next) {
    this._id = this.id;
    next();
});
let branchModel = mongoose.model("Branch", branchSchema);
let flowerSchema = new Schema({
    _id: String,
    name: String,
    family: String,
    price: Number,
    img: String,
    colorDesc: String,
    color: String,
});
flowerSchema.pre("save", function (next) {
    this._id = this.name;
    next();
});
let flowerModel = mongoose.model("Flower", flowerSchema);
//#endregion
// bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
class MongoDB {
    getResetKey(username) {
        return new Promise((resolve, reject) => {
            userDataModel.findById(username, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
    updateResetKey(username, key) {
        let data = { username: username, recoveryKey: key, creationDate: new Date() };
        return new Promise((resolve, reject) => {
            userDataModel.findByIdAndUpdate(username, data, { upsert: true }, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.username);
            });
        });
    }
    removeKey(username) {
        return new Promise((resolve, reject) => {
            userDataModel.findByIdAndRemove(username, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.username);
            });
        });
    }
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            userModel.findOne({ email }, (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    }
    getFlowers() {
        return new Promise((resolve, reject) => {
            flowerModel.find({}, (err, flowers) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(flowers);
            });
        });
    }
    findFlower(name) {
        return new Promise((resolve, reject) => {
            flowerModel.findById(name, (err, flower) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(flower);
            });
        });
    }
    updateFlower(flower) {
        return new Promise((resolve, reject) => {
            flowerModel.findByIdAndUpdate(flower.name, flower, (err, oldFlower) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(flower);
            });
        });
    }
    addFlower(flower) {
        return new Promise((resolve, reject) => {
            let flowerDoc = new flowerModel(flower);
            flowerDoc.save((err, flower) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(flower);
            });
        });
    }
    deleteFlower(flower) {
        return new Promise((resolve, reject) => {
            flowerModel.findByIdAndRemove(flower.name, (err, flower) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(flower);
            });
        });
    }
    //#region users
    // todo: return the users as a user object(?)
    getUsers(types, filter = {}) {
        if (types) {
            // types = types.map((v, i, a) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
            filter.className = new RegExp("^(" + types.map((clss) => clss.className).join("|") + ")$");
        }
        for (const key of Object.keys(filter)) {
            if (filter[key] === "") {
                delete filter[key];
                continue;
            }
            switch (getUserKeyType(key)) {
                case "string":
                    // replace it with a regex that will search for any one of the given words
                    filter[key] = new RegExp(filter[key].split(/\s+/)
                        // escape regex characters
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
                    if (key === "gender" && filter[key] === 0) {
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
    findUser(username) {
        return new Promise((resolve, reject) => {
            userModel.findById(username, (err, user) => {
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
            userModel.findByIdAndUpdate(user.username, user, (err, oldUser) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(user);
            });
        });
    }
    updateUserById(username, update) {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(username, update, (err, oldUser) => {
                if (err) {
                    reject(err);
                    return;
                }
                // sending back the new one
                resolve(Object.assign([], oldUser, update));
            });
        });
    }
    addUser(user, password) {
        if (user.salt) {
            console.warn("Overriding salt for " + user.username + ", previous salt: " + user.salt);
        }
        user.salt = crypto_1.getRandomString(crypto_1.hashLength);
        user.hashedPassword = crypto_1.sha512(password, user.salt);
        return new Promise((resolve, reject) => {
            let userDoc = new userModel(user);
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
            userModel.findByIdAndRemove(user.username, (err, user) => {
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
        for (const key of Object.keys(filter)) {
            if (filter[key] === "") {
                delete filter[key];
                continue;
            }
            switch (getBranchKeyType(key)) {
                case "string":
                    // replace it with a regex that will search for any one of the given words
                    filter[key] = new RegExp(filter[key].split(/\s+/)
                        // escape regex characters
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
                    if (key === "gender" && filter[key] === 0) {
                        delete filter[key];
                    }
            }
        }
        return new Promise((resolve, reject) => {
            branchModel.find(filter, (err, branches) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(branches);
            });
        });
    }
    findBranch(id) {
        return new Promise((resolve, reject) => {
            branchModel.findById(id, (err, branch) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(branch);
            });
        });
    }
    updateBranch(branch) {
        return new Promise((resolve, reject) => {
            branchModel.findByIdAndUpdate(branch.id, branch, (err, oldBranch) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(branch);
            });
        });
    }
    addBranch(branch) {
        return new Promise((resolve, reject) => {
            let branchDoc = new branchModel(branch);
            branchDoc.save((err, branch) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(branch);
            });
        });
    }
    deleteBranch(branch) {
        return new Promise((resolve, reject) => {
            branchModel.findByIdAndRemove(branch.id, (err, branch) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(branch);
            });
        });
    }
}
exports.MongoDB = MongoDB;
function getUserKeyType(key) {
    return userModel.schema.paths[key].instance.toLowerCase();
}
function getBranchKeyType(key) {
    return branchModel.schema.paths[key].instance.toLowerCase();
}
//# sourceMappingURL=mongoDB.js.map