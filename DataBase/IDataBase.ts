import { User, Flower, Branch } from "../types";

export interface IDataBase {
    getUsers(userType: any[], filter?: any): Promise<User[]>;
    updateUser(user: User): Promise<User>;
    updateUserById(userName: string, update: Partial<User>): Promise<User>;

    addUser(user: User): Promise<User>;
    deleteUser(user: User): Promise<User>;
    findUser(userName: string): Promise<User>;

    getFlowers(): Promise<Flower[]>;
    addFlower(flower : Flower): Promise<Flower>;
    getBranches(filter: any): Promise<Branch[]>;
    addBranch(branch: Branch): Promise<Branch>;
    updateBranch(branch: Branch): Promise<Branch>;
    deleteBranch(branch: Branch): Promise<Branch>;
}