import { User, Flower } from "../types";

export interface IDataBase {
    getUsers(filter: any): User[];
    updateUser(user: User): User;
    addUser(user: User): User;
    deleteUser(user: User): User;
    findUser(userName: string): User;
    getFlowers(): Flower[];
}