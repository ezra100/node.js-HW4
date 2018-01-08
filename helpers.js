"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
var helpers;
(function (helpers) {
    function objectToUser(obj) {
        if (obj.gender && typeof obj.gender !== "number") {
            obj.gender = parseInt(obj.gender, 10);
        }
        switch (obj.className.toLowerCase()) {
            case "user":
                return new types_1.User(obj);
            case "manager":
                return new types_1.Manager(obj);
            case "Employee":
                return new types_1.Employee(obj);
            case "customer":
                return new types_1.Customer(obj);
        }
    }
    helpers.objectToUser = objectToUser;
    function dataFilter(users, filter) {
        if (filter.gender && typeof filter.gender !== "number") {
            filter.gender = parseInt(filter.gender, 10);
        }
        return users.filter((user) => {
            for (var key in filter) {
                if (filter[key] && filter[key] !== "" && filter[key] !== user[key]) {
                    return false;
                }
            }
            return true;
        });
    }
    helpers.dataFilter = dataFilter;
})(helpers = exports.helpers || (exports.helpers = {}));
//# sourceMappingURL=helpers.js.map