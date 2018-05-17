import { User, Flower, Branch } from "../types";

export interface IDataBase {
    getUsers(userType?: any[], filter?: any): Promise<User[]>;
    updateUser(user: User): Promise<User>;
    updateUserById(username: string, update: Partial<User>): Promise<User>;

    addUser(user: User, password : string): Promise<User>;
    deleteUser(user: User): Promise<User>;
    findUser(username: string): Promise<User>;

    getFlowers(): Promise<Flower[]>;
    addFlower(flower : Flower): Promise<Flower>;
    findFlower(name: string): Promise<Flower | null> ;

    getBranches(filter: any): Promise<Branch[]>;
    addBranch(branch: Branch): Promise<Branch>;
    updateBranch(branch: Branch): Promise<Branch>;
    deleteBranch(branch: Branch): Promise<Branch>;
}