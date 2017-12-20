"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender = exports.Gender || (exports.Gender = {}));
class Person {
    constructor(init) {
        console.assert(!Person.findByUserName(init.userName));
        Object.assign(this, init);
        this.id = Person.idCounter++;
        Person.persons.push(this);
    }
    static findByUserName(userName) {
        return this.persons.find(x => (x.userName.localeCompare(userName) === 0));
    }
}
Person.idCounter = 0;
Person.persons = [];
exports.Person = Person;
class Customer extends Person {
}
exports.Customer = Customer;
class MyWorker extends Person {
    constructor(init) {
        super(init);
        Object.assign(this, init);
    }
}
exports.MyWorker = MyWorker;
class Manager extends MyWorker {
    constructor(init) {
        super(init);
        Object.assign(this, init);
    }
}
exports.Manager = Manager;
class Branch {
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.Branch = Branch;
//# sourceMappingURL=types.js.map