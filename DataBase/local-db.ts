import { users, flowers } from "./data";
import { IDataBase } from "./IDataBase";
import { User , Flower} from "../types";

export class LocalDB implements IDataBase {
    getFlowers(): Flower[] {
        return flowers;
    }
    getUsers(filter: any): User[] {
        if (filter.gender && typeof filter.gender !== "number") {
            filter.gender = parseInt(filter.gender, 10);
        }
        return users.filter((user) => {
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

}