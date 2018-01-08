"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_db_1 = require("./local-db");
var DBType;
(function (DBType) {
    DBType[DBType["Local"] = 0] = "Local";
    DBType[DBType["Mongo"] = 1] = "Mongo";
})(DBType = exports.DBType || (exports.DBType = {}));
class DBFactory {
    static getDB() {
        if (this.db === null) {
            switch (this.type) {
                case DBType.Local:
                default:
                    this.db = new local_db_1.LocalDB();
                    break;
            }
        }
        return this.db;
    }
}
DBFactory.db = null;
DBFactory.type = DBType.Local;
exports.DBFactory = DBFactory;
//# sourceMappingURL=DBFactory.js.map