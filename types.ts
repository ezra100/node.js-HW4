export enum Gender { Male, Female }

export class Person {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    gender: Gender;
    address: string;
    static idCounter: number = 0;
    static persons: Person[] = [];
    public constructor(init?: Partial<Person>) {
        console.assert(!Person.findByUserName(init.userName));
        Object.assign(this, init);
        this.id = Person.idCounter++;
        Person.persons.push(this);
    }

    static findByUserName(userName: string, persons: Person[] = this.persons): Person {
        return persons.find(x =>
            (x.userName.toLowerCase() === userName.toLowerCase())
        );
    }
}

export class Customer extends Person {

}

export class MyWorker extends Person {
    branchID: number;
    public constructor(init?: Partial<MyWorker>) {
        super(init);
        Object.assign(this, init);
    }
}

export class Manager extends MyWorker {
    public constructor(init?: Partial<Manager>) {
        super(init);
        Object.assign(this, init);
    }
}

export class Branch {
    id: number;
    address: string;
    public constructor(init?: Partial<Branch>) {
        Object.assign(this, init);
    }
}

