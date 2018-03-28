import { IDataBase } from "./IDataBase";
import { LocalDB } from "./local-db";
import { MongoDB } from "./mongoDB";
export enum DBType { Local, Mongo }
export class DBFactory {
    static db: IDataBase = null;
    static type = DBType.Local;
    static getDB(): IDataBase {
        if (this.db === null) {
            switch (this.type) {
                case DBType.Local:
                default:
                    this.db = new MongoDB();
                    break;
            }
        }
        return this.db;
    }

}
