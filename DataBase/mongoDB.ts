import { branches, users, flowers } from "./data";
import { IDataBase } from "./IDataBase";
import { User, Flower, Branch, Customer, Manager, Provider } from "../types";

// import the mongoose module
import * as mongoose from "mongoose";
import { resolve } from "dns";



// set up default mongoose connection
var connectionString: string = "mongodb://127.0.0.1/localhost";
mongoose.connect(connectionString);

// get the default connection
var db: mongoose.Connection = mongoose.connection;
// define a schema
var Schema: any = mongoose.Schema;



var UserSchema: any = new Schema({
    _id: String,
    className: String,
    firstName: String,
    lastName: String,
    userName: String,// key/id field
    password: String,
    email: String,
    gender: Number,
    address: String
});
let userModel: mongoose.Model<any> = mongoose.model("User", UserSchema);

let customerModel: mongoose.Model<any> = userModel.discriminator("Customer", new mongoose.Schema({}, { discriminatorKey: "customer" }));
let providerModel: mongoose.Model<any> = userModel.discriminator("Provider",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "provider" }));
let employeerModel: mongoose.Model<any> = userModel.discriminator("Employee",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "employee" }));
let managerModel: mongoose.Model<any> = userModel.discriminator("Manager",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "manager" }));

function init(): void {
    users
        .map((u) => new userModel(Object.assign({}, u, { _id: u.userName })))
        .forEach((v) => v.save((err: Error, user: User) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(user);
        }
        ));
}
init();
// bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export class MongoDB {

    getFlowers(): Flower[] {
        return flowers;
    }
    //#region users
    // todo: return the users as a user object(?)
    getUsers(types?: any[], filter?: any): Promise<User[]> {


        if (types) {
            // if filter isn't defined yet, define it as an empty object
            filter = filter || {};
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
                        .map((v: any) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                        ).join("|"), "gi");
                    break;
                case "boolean":

                    if (typeof filter[key] === "string") {
                        if (filter[key] === "") {
                            delete filter[key];
                        } else {
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
        return new Promise<User[]>(
            (resolve, reject) => {
                userModel.find(filter, (err: Error, users: User[]) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(users);
                });
            }
        );
    }
    findUser(userName: string): Promise<User | null> {
        return new Promise<User | null>(
            (resolve, reject) => {
                userModel.findById(userName, (err: Error, user: User) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(user);
                });
            }
        );
    }
    updateUser(user: User): Promise<User | null> {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(user.userName, user, (err: Error, oldUser: User) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(user);
            });
        });
    }
    addUser(user: User): Promise<User | null> {
        return new Promise(
            (resolve, reject) => {
                let userDoc: any = new userModel(Object.assign({}, user, { _id: user.userName }));
                userDoc.save((err: Error, user: User) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(user);
                });
            }
        );
    }
    deleteUser(user: User): Promise<User | null> {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndRemove(user.userName, (err: Error, user: User) => {
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
    getBranches(filter: any): Branch[] {
        return branches.filter((branch) => {

            for (var key in filter) {
                if (filter[key] === "") {
                    continue;
                }
                switch (getUserKeyType(key)) {
                    case "string":
                        var regex: RegExp = new RegExp(filter[key].split(/\s+/).join("|"), "gi");
                        if (!regex.test((<any>branch)[key])) {
                            return false;
                        }
                        break;
                    case "boolean":
                        if (typeof filter[key] === "string") {
                            filter[key] = (filter[key] === "true");
                        }
                        if (filter[key] !== (<any>branch)[key]) {
                            return false;
                        }
                        break;
                    case "number":
                        if (parseFloat(filter[key]) !== (<any>branch)[key]) {
                            return false;
                        }
                }
            }
            return true;
        });
    }
    addBranch(branch: Branch): Branch {
        if (branches.findIndex((b) => branch.id === b.id) >= 0) {
            console.error("User" + branch.id + ":" + branch.name + " already exists");
            return null;
        }
        branches.push(branch);
        return branch;
    }
    updateBranch(branch: Branch): Branch {
        var index: number = branches.findIndex((b: Branch) => b.id === branch.id);
        if (index < 0) {
            console.error("Branch not found");
            return null;
        }
        branches[index] = branch;
        return branch;
    }
    deleteBranch(branch: Branch): Branch {
        var index: number = branches.findIndex((b: Branch) => b.id === branch.id);
        if (index < 0) {
            console.error("Branch not found");
            return null;
        }
        branches.splice(index, 1);
        return branch;
    }
    //#endregion
}

function getUserKeyType(key: string): string {
    return (<string>(<any>userModel.schema).paths[key].instance).toLowerCase();
}