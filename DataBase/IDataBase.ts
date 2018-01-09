import { User, Flower, Branch } from "../types";

export interface IDataBase {
    getUsers(userType: any[], filter?: any): User[];
    updateUser(user: User): User;
    addUser(user: User): User;
    deleteUser(user: User): User;
    findUser(userName: string): User;

    getFlowers(): Flower[];

    getBranches(filter: any): Branch[];
    addBranch(branch: Branch): Branch;
    updateBranch(branch: Branch): Branch;
    deleteBranch(branch: Branch): Branch;
}