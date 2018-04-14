import { branches, users, flowers } from "./data";
import { IDataBase } from "./IDataBase";
import { User, Flower, Branch, Customer, Manager, Provider } from "../types";

// import the mongoose module
import * as mongoose from "mongoose";
import { resolve } from "dns";



// set up default mongoose connection
var connectionString: string = "mongodb://127.0.0.1/flowersPP";
mongoose.connect(connectionString);

// get the default connection
var db: mongoose.Connection = mongoose.connection;

//#region schema
// define a schema
let Schema: any = mongoose.Schema;



let userSchema: mongoose.Schema = new Schema({
    _id: String,
    className: String,
    firstName: String,
    lastName: String,
    userName: String,// key/id field
    password: String,
    email: String,
    gender: Number,
    address: String,
    image: String
});
userSchema.pre("save", function (next: Function): void {
    this._id = (<any>this).userName;
    next();
});
let userModel: mongoose.Model<any> = mongoose.model("User", userSchema);

let customerModel: mongoose.Model<any> = userModel.discriminator("Customer", new mongoose.Schema({}, { discriminatorKey: "customer" }));
let providerModel: mongoose.Model<any> = userModel.discriminator("Provider",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "provider" }));
let employeerModel: mongoose.Model<any> = userModel.discriminator("Employee",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "employee" }));
let managerModel: mongoose.Model<any> = userModel.discriminator("Manager",
    new mongoose.Schema({ branchID: Number }, { discriminatorKey: "manager" }));

let branchSchema: any = new Schema({
    _id: Number,
    id: Number,
    address: String,
    active: Boolean,
    name: String
});
branchSchema.pre("save", function (next: Function): void {
    this._id = this.id;
    next();
});
let branchModel: mongoose.Model<any> = mongoose.model("Branch", branchSchema);
let flowerSchema: any = new Schema({
    _id: String,
    name: String,
    family: String,
    price: Number,
    img: String,
    colorDesc: String,
    color: String,
});
flowerSchema.pre("save", function (next: Function): void {
    this._id = this.name;
    next();
});
let flowerModel: mongoose.Model<any> = mongoose.model("Flower", flowerSchema);
//#endregion

function init(): void {
    // todo
    users
        .map((u) => new userModel(u))
        .forEach((v) => v.save((err: Error, user: User) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(user);
        }
        ));
    branches
        .map((u) => new branchModel(u))
        .forEach((v) => v.save((err: Error, branch: Branch) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(branch);
        }
        ));
    flowers
        .map((u) => new flowerModel(u))
        .forEach((v) => v.save((err: Error, flower: Flower) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(flower);
        }
        ));
}
 //init();


// bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export class MongoDB implements IDataBase {


    getFlowers(): Promise<Flower[]> {
        return new Promise<Flower[]>(
            (resolve, reject) => {
                flowerModel.find({}, (err: Error, flowers: Flower[]) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(flowers);
                });
            }
        );
    }

    findFlower(name: string): Promise<Flower | null> {
        return new Promise<Flower | null>(
            (resolve, reject) => {
                flowerModel.findById(name, (err: Error, flower: Flower) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(flower);
                });
            }
        );
    }
    updateFlower(flower: Flower): Promise<Flower | null> {
        return new Promise((resolve, reject) => {
            flowerModel.findByIdAndUpdate(flower.name, flower, (err: Error, oldFlower: Flower) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(flower);
            });
        });
    }
    addFlower(flower: Flower): Promise<Flower | null> {
        return new Promise(
            (resolve, reject) => {
                let flowerDoc: any = new flowerModel(flower);
                flowerDoc.save((err: Error, flower: Flower) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(flower);
                });
            }
        );
    }
    deleteFlower(flower: Flower): Promise<Flower | null> {
        return new Promise((resolve, reject) => {
            flowerModel.findByIdAndRemove(flower.name, (err: Error, flower: Flower) => {
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
    updateUserById(userName: string, update: Partial<User>): Promise<User> {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(userName, update, (err: Error, oldUser: User) => {
                if (err) {
                    reject(err);
                    return;
                }
                // sending back the new one
                resolve(Object.assign([], oldUser, update));
            });
        });
    }
    addUser(user: User): Promise<User | null> {
        return new Promise(
            (resolve, reject) => {
                let userDoc: any = new userModel(user);
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
    getBranches(filter: any): Promise<Branch[]> {
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
        return new Promise<Branch[]>(
            (resolve, reject) => {
                branchModel.find(filter, (err: Error, branches: Branch[]) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(branches);
                });
            }
        );

    }
    findBranch(id: string): Promise<Branch | null> {
        return new Promise<Branch | null>(
            (resolve, reject) => {
                branchModel.findById(id, (err: Error, branch: Branch) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(branch);
                });
            }
        );
    }
    updateBranch(branch: Branch): Promise<Branch | null> {
        return new Promise((resolve, reject) => {
            branchModel.findByIdAndUpdate(branch.id, branch, (err: Error, oldBranch: Branch) => {
                if (err) {
                    reject(err);
                    return;
                }
                // we want to send back the new one
                resolve(branch);
            });
        });
    }
    addBranch(branch: Branch): Promise<Branch | null> {
        return new Promise(
            (resolve, reject) => {
                let branchDoc: any = new branchModel(branch);
                branchDoc.save((err: Error, branch: Branch) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(branch);
                });
            }
        );
    }
    deleteBranch(branch: Branch): Promise<Branch | null> {
        return new Promise((resolve, reject) => {
            branchModel.findByIdAndRemove(branch.id, (err: Error, branch: Branch) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(branch);
            });
        });
    }
    //#endregion
}

function getUserKeyType(key: string): string {
    return (<string>(<any>userModel.schema).paths[key].instance).toLowerCase();
}

function getBranchKeyType(key: string): string {
    return (<string>(<any>branchModel.schema).paths[key].instance).toLowerCase();
}