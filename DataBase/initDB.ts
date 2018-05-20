import { DBFactory } from "./DBFactory";
import { IDataBase } from "./IDataBase";
import { User } from "../types";
import { users, branches, flowers } from "./data";

let db: IDataBase = DBFactory.getDB();

export function initUsers(): void {
    // todo
    users.forEach(function (user: User) {
        db.addUser(user, user.hashedPassword)
    });

}

    // branches
    //     .map((u) => new branchModel(u))
    //     .forEach((v) => v.save((err: Error, branch: Branch) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         console.log(branch);
    //     }
    //     ));
    // flowers
    //     .map((u) => new flowerModel(u))
    //     .forEach((v) => v.save((err: Error, flower: Flower) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         console.log(flower);
    //     }
    //     ));

// here we decide if to init or not
export async function initDB(): Promise<void> {
    if ((await db.getUsers()).length < 5) {
        initUsers();
    }
}
