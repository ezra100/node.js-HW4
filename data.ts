import {Person, Manager, MyWorker, Customer, Gender } from "./types";


export var persons: Person [] = [new Customer({
    "userName": "Shelba",
    "firstName": "Shelba",
    "lastName": "Tipper",
    "email": "stipper0@cafepress.com",
    "gender": Gender.Female,
    "address": "9 Continental Trail",
    "password": "asdff"
}), new Customer({
    "userName": "Rolland",
    "firstName": "Rolland",
    "lastName": "Bright",
    "email": "rbright1@yelp.com",
    "gender": Gender.Male,
    "address": "97 Mandrake Center",
    "password": "asdf1234"
}), new Customer({
    "userName": "Roderigo",
    "firstName": "Roderigo",
    "lastName": "Domegan",
    "email": "rdomegan2@about.com",
    "gender": Gender.Male,
    "address": "9 Anzinger Way",
    "password": "asdf"
}), new Customer({
    "userName": "Dalston",
    "firstName": "Dalston",
    "lastName": "Bannester",
    "email": "dbannester3@nsw.gov.au",
    "gender": Gender.Male,
    "address": "84 Nobel Lane",
    "password": "fdsa"
}), new Customer({
    "userName" : "Wilie",

    "firstName": "Wilie",
    "lastName": "Nuss",
    "email": "wnuss4@java.com",
    "gender": Gender.Female,
    "address": "1 Lien Place",
    "password": "asdf1234"
}), new MyWorker({
    "userName" : "Aldo",

    "branchID": 5,
    "firstName": "Aldo",
    "lastName": "Blackett",
    "email": "ablackett5@vkontakte.ru",
    "gender": Gender.Male,
    "address": "14203 Thierer Crossing",
    "password": "asdf4"
}), new MyWorker({
    "userName" : "Raimund",

    "branchID": 3,
    "firstName": "Raimund",
    "lastName": "Vink",
    "email": "rvink6@baidu.com",
    "gender": Gender.Male,
    "address": "30239 Gale Place",
    "password": "fff"
}), new MyWorker({
    "userName" : "Niki",
    "branchID": 2,
    "firstName": "Niki",
    "lastName": "Wedgwood",
    "email": "nwedgwood7@merriam-webster.com",
    "gender": Gender.Male,
    "address": "5 Tony Pass",
    "password": "assss"
}), new Manager({
    "branchID": 1,
    "userName" : "Karine",
    "firstName": "Karine",
    "lastName": "Bolsteridge",
    "email": "kbolsteridge8@exblog.jp",
    "gender": Gender.Female,
    "address": "3654 Hanover Street",
    "password": "sdfsdf"
}), new Manager({
    "branchID": 5,
    "userName" : "Norman",
    "firstName": "Norman",
    "lastName": "Bradnam",
    "email": "nbradnam9@cornell.edu",
    "gender": Gender.Male,
    "address": "3179 Cascade Court",
    "password": "aaa123"
}), new MyWorker({
    "branchID": 4,
    "userName" : "Erich",
    "firstName": "Erich",
    "lastName": "Lippitt",
    "email": "elippitta@altervista.org",
    "gender": Gender.Male,
    "address": "147 Fieldstone Hill",
    "password": "fff564"
}), new Customer({
    "firstName": "Crawford",
    "userName" : "Crawford",
    "lastName": "Cooksley",
    "email": "ccooksleyb@slashdot.org",
    "gender": Gender.Male,
    "address": "84336 Beilfuss Alley",
    "password": "fdsa123"
}), new Customer({
    "firstName": "Armando",
    "userName" : "Armando",
    "lastName": "Sharkey",
    "email": "asharkeyc@cnbc.com",
    "gender": Gender.Male,
    "address": "3 Sloan Crossing",
    "password": "fdas"
}), new Customer({
    "userName" : "Fredericka",
    "firstName": "Fredericka",
    "lastName": "Crossgrove",
    "email": "fcrossgroved@shareasale.com",
    "gender": Gender.Female,
    "address": "45 Sloan Lane",
    "password": "456852"
}), new MyWorker({
    "userName" : "Paxton",

    "firstName": "Paxton",
    "lastName": "Eisak",
    "email": "peisake@reddit.com",
    "gender": Gender.Male,
    "address": "81305 Chive Park",
    "password": "1111"
})];