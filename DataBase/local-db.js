"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
class LocalDB {
    getFlowers() {
        return data_1.flowers;
    }
    getUsers(filter) {
        if (filter.gender && typeof filter.gender !== "number") {
            filter.gender = parseInt(filter.gender, 10);
        }
        return data_1.users.filter((user) => {
            for (var key in filter) {
                if (filter[key] && filter[key] !== "" && filter[key] !== user[key]) {
                    return false;
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
}
exports.LocalDB = LocalDB;
//# sourceMappingURL=local-db.js.map