import { User, Manager, Employee, Customer } from "./types";

export namespace helpers {
    export function objectToUser(obj: any): User {
        if (obj.gender && typeof obj.gender !== "number") {
            obj.gender = parseInt(obj.gender, 10);
        }
        switch (obj.className.toLowerCase()) {
            case "user":
                return new User(obj);
            case "manager":
                return new Manager(obj);
            case "Employee":
                return new Employee(obj);
            case "customer":
                return new Customer(obj);
        }
    }

    export function dataFilter(users: User[], filter: any): User[] {
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
}