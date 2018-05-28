import { User, Flower, Branch, UserData } from "../types";

export interface IDataBase {
    // leave userType null or undefined in order to show all types
    getUsers(userType?: any[], filter?: any): Promise<User[]>;
    updateUser(user: Partial<User>, password? : string): Promise<User>;
    updateUserById(username: string, update: Partial<User>, password?: string): Promise<User>;

    addUser(user: User, password: string): Promise<User>;
    deleteUser(user: User): Promise<User>;
    findUser(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;

    updateResetKey(username: string, key: string): Promise<string>;
    getResetKey(username: string): Promise<UserData>;
    removeKey(username: string): Promise<string>;


    getFlowers(): Promise<Flower[]>;
    addFlower(flower: Flower): Promise<Flower>;
    findFlower(name: string): Promise<Flower | null>;

    getBranches(filter: any): Promise<Branch[]>;
    addBranch(branch: Branch): Promise<Branch>;
    updateBranch(branch: Branch): Promise<Branch>;
    deleteBranch(branch: Branch): Promise<Branch>;
}