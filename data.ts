import { Manager, MyWorker, Customer, Gender } from "./types";


var Customers: Customer[] = [new Customer({
    "firstName": "Shelba",
    "lastName": "Tipper",
    "email": "stipper0@cafepress.com",
    "gender": Gender.Female,
    "address": "9 Continental Trail"
}), new Customer({
    "firstName": "Rolland",
    "lastName": "Bright",
    "email": "rbright1@yelp.com",
    "gender": Gender.Male,
    "address": "97 Mandrake Center"
}), new Customer({
    "firstName": "Roderigo",
    "lastName": "Domegan",
    "email": "rdomegan2@about.com",
    "gender": Gender.Male,
    "address": "9 Anzinger Way"
}), new Customer({
    "firstName": "Dalston",
    "lastName": "Bannester",
    "email": "dbannester3@nsw.gov.au",
    "gender": Gender.Male,
    "address": "84 Nobel Lane"
}), new Customer({
    "firstName": "Wilie",
    "lastName": "Nuss",
    "email": "wnuss4@java.com",
    "gender": Gender.Female,
    "address": "1 Lien Place"
}), new MyWorker({
    "branchID": 5,
    "firstName": "Aldo",
    "lastName": "Blackett",
    "email": "ablackett5@vkontakte.ru",
    "gender": Gender.Male,
    "address": "14203 Thierer Crossing"
}), new MyWorker({
    "branchID": 3,
    "firstName": "Raimund",
    "lastName": "Vink",
    "email": "rvink6@baidu.com",
    "gender": Gender.Male,
    "address": "30239 Gale Place"
}), new MyWorker({
    "branchID": 2,
    "firstName": "Niki",
    "lastName": "Wedgwood",
    "email": "nwedgwood7@merriam-webster.com",
    "gender": Gender.Male,
    "address": "5 Tony Pass"
}), new Manager({
    "branchID": 1,
    "firstName": "Karine",
    "lastName": "Bolsteridge",
    "email": "kbolsteridge8@exblog.jp",
    "gender": Gender.Female,
    "address": "3654 Hanover Street"
}), new Manager({
    "branchID": 5,
    "firstName": "Norman",
    "lastName": "Bradnam",
    "email": "nbradnam9@cornell.edu",
    "gender": Gender.Male,
    "address": "3179 Cascade Court"
}), new MyWorker({
    "branchID": 4,
    "firstName": "Erich",
    "lastName": "Lippitt",
    "email": "elippitta@altervista.org",
    "gender": Gender.Male,
    "address": "147 Fieldstone Hill"
}), new Customer({
    "firstName": "Crawford",
    "lastName": "Cooksley",
    "email": "ccooksleyb@slashdot.org",
    "gender": Gender.Male,
    "address": "84336 Beilfuss Alley"
}), new Customer({
    "firstName": "Armando",
    "lastName": "Sharkey",
    "email": "asharkeyc@cnbc.com",
    "gender": Gender.Male,
    "address": "3 Sloan Crossing"
}), new Customer({
    "firstName": "Fredericka",
    "lastName": "Crossgrove",
    "email": "fcrossgroved@shareasale.com",
    "gender": Gender.Female,
    "address": "45 Sloan Lane"
}), new MyWorker({
    "firstName": "Paxton",
    "lastName": "Eisak",
    "email": "peisake@reddit.com",
    "gender": Gender.Male,
    "address": "81305 Chive Park"
})];