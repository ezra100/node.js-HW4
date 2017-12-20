export enum Gender { Male, Female }

export class Person {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    gender: Gender;
    address: string;
    static idCounter: number = 0;
    public constructor(init?: Partial<Person>) {
        Object.assign(this, init);
        this.id = Person.idCounter++;
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

