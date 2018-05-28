"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const data = require("./data.json");
const nodemailer = require("nodemailer");
var helpers;
(function (helpers) {
    let reallySendEmail = true;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data.email,
            pass: data.password
        }
    });
    function objectToUser(obj) {
        if (obj.gender && typeof obj.gender !== "number") {
            obj.gender = parseInt(obj.gender, 10);
        }
        switch (obj.className.toLowerCase()) {
            case "manager":
                return new types_1.Manager(obj);
            case "employee":
                return new types_1.Employee(obj);
            case "customer":
                return new types_1.Customer(obj);
            case "provider":
                return new types_1.Provider(obj);
        }
    }
    helpers.objectToUser = objectToUser;
    function dataFilter(users, filter) {
        if (filter.gender && typeof filter.gender !== "number") {
            filter.gender = parseInt(filter.gender, 10);
        }
        return users.filter((user) => {
            for (var key in filter) {
                if (filter[key] && filter[key] !== "" && filter[key] !== user[key]) {
                    return false;
                }
            }
            return true;
        });
    }
    helpers.dataFilter = dataFilter;
    function sendEmail(email, name, subject, msg) {
        if (!reallySendEmail) {
            return;
        }
        const mailOptions = {
            from: { name: "Flowers++", address: data.email },
            to: { name: name, address: email },
            replyTo: data.replyTo,
            subject: subject,
            html: msg // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
    helpers.sendEmail = sendEmail;
})(helpers = exports.helpers || (exports.helpers = {}));
//# sourceMappingURL=helpers.js.map