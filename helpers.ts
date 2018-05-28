import { User, Manager, Employee, Customer, Provider } from "./types";
import * as data from "./data.json";
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/ses-transport";


export namespace helpers {
    let reallySendEmail = true;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data.email,
            pass: data.password
        }
    });

    export function objectToUser(obj: any): User {
        if (obj.gender && typeof obj.gender !== "number") {
            obj.gender = parseInt(obj.gender, 10);
        }
        switch (obj.className.toLowerCase()) {
            case "manager":
                return new Manager(obj);
            case "employee":
                return new Employee(obj);
            case "customer":
                return new Customer(obj);
            case "provider":
                return new Provider(obj);
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

    export function sendEmail(email: string, name: string, subject: string, msg: string): void {
        if (!reallySendEmail) {
            return;
        }
        const mailOptions: nodemailer.SendMailOptions = {
            from: { name: "Flowers++", address: data.email }, // sender address
            to: { name: name, address: email }, // list of receivers
            replyTo: data.replyTo,
            subject: subject, // subject line
            html: msg// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info): void {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }
}