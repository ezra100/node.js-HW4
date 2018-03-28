"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
class LocalDB /*implements IDataBase*/ {
    getFlowers() {
        return new Promise((resolve, reject) => resolve(data_1.flowers));
    }
    //#region users
    getUsers(types, filter) {
        if (!types) {
            return data_1.users;
        }
        return data_1.users.filter((user) => {
            if (types && !types.reduce((prev, value) => prev || user instanceof value, false)) {
                return false;
            }
            for (var key in filter) {
                if (filter[key] === "") {
                    continue;
                }
                switch (typeof user[key]) {
                    case "string":
                        var regex = new RegExp(filter[key].split(/\s+/).join("|"), "gi");
                        if (!regex.test(user[key])) {
                            return false;
                        }
                        break;
                    case "boolean":
                        if (typeof filter[key] === "string") {
                            filter[key] = (filter[key] === "true");
                        }
                        if (filter[key] !== user[key]) {
                            return false;
                        }
                        break;
                    case "number":
                        // exception for 'gender' since it's an enum
                        if (key === "gender" && filter[key] === "0") {
                            break;
                        }
                        if (parseFloat(filter[key]) !== user[key]) {
                            return false;
                        }
                }
            }
            return true;
        });
    }
    findUser(userName) {
        return data_1.users.find((user) => user.compareByUserName(userName));
    }
    updateUser(user) {
        var index = data_1.users.findIndex((u) => u.compare(user));
        if (index < 0) {
            console.error("User not found");
            return null;
        }
        data_1.users[index] = user;
        return user;
    }
    addUser(user) {
        // check that the user doesn't exists yet
        if (data_1.users.findIndex((u) => u.compare(user)) >= 0) {
            console.error("User" + user.userName + " already exists");
            return null;
        }
        data_1.users.push(user);
        return user;
    }
    deleteUser(user) {
        var index = data_1.users.findIndex((u) => u.compare(user));
        if (index < 0) {
            console.error("User not found");
            return null;
        }
        data_1.users.splice(index, 1);
        return user;
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
exports.LocalDB = LocalDB;
//# sourceMappingURL=local-db.js.map