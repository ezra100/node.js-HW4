import { branches, users, flowers } from "./data";
import { IDataBase } from "./IDataBase";
import { User, Flower, Branch } from "../types";

export class LocalDB implements IDataBase {

    getFlowers(): Flower[] {
        return flowers;
    }
    //#region users
    getUsers(types?: any[], filter?: any): User[] {

        if (!types) {
            return users;
        }

        return users.filter((user) => {
            if (types && !types.reduce((prev, value) => prev || user instanceof value, false)) {
                return false;
            }
            for (var key in filter) {
                if (filter[key] && filter[key] !== "" && filter[key] !== (<any>user)[key]) {
                    return false;
                }
            }
            return true;
        });
    }
    findUser(userName: string): User | null {
        return users.find((user) => user.compareByUserName(userName));
    }
    updateUser(user: User): User | null {
        var index: number = users.findIndex((u: User) => u.compare(user));
        if (index < 0) {
            console.error("User not found");
            return null;
        }
        users[index] = user;
        return user;
    }
    addUser(user: User): User | null {
        // check that the user doesn't exists yet
        if (users.findIndex((u: User) => u.compare(user)) >= 0) {
            console.error("User" + user.userName + " already exists");
            return null;
        }
        users.push(user);
        return user;
    }
    deleteUser(user: User): User | null {
        var index: number = users.findIndex((u) => u.compare(user));
        if (index < 0) {
            console.error("User not found");
            return null;
        }
        users.splice(index, 1);
        return user;
    }
    //#endregion

    //#region branches
    getBranches(filter: any): Branch[] {
        return branches.filter((branch) => {
            for (var key in filter) {
                if (filter[key] && filter[key] !== "" && filter[key] !== (<any>branch)[key]) {
                    return false;
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