"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const url_1 = require("url");
exports.persons = [new types_1.Customer({
        "userName": "Shelba",
        "firstName": "Shelba",
        "lastName": "Tipper",
        "email": "stipper0@cafepress.com",
        "gender": types_1.Gender.Female,
        "address": "9 Continental Trail",
        "password": "asdff"
    }), new types_1.Customer({
        "userName": "Rolland",
        "firstName": "Rolland",
        "lastName": "Bright",
        "email": "rbright1@yelp.com",
        "gender": types_1.Gender.Male,
        "address": "97 Mandrake Center",
        "password": "asdf1234"
    }), new types_1.Customer({
        "userName": "Roderigo",
        "firstName": "Roderigo",
        "lastName": "Domegan",
        "email": "rdomegan2@about.com",
        "gender": types_1.Gender.Male,
        "address": "9 Anzinger Way",
        "password": "asdf"
    }), new types_1.Customer({
        "userName": "Dalston",
        "firstName": "Dalston",
        "lastName": "Bannester",
        "email": "dbannester3@nsw.gov.au",
        "gender": types_1.Gender.Male,
        "address": "84 Nobel Lane",
        "password": "fdsa"
    }), new types_1.Customer({
        "userName": "Wilie",
        "firstName": "Wilie",
        "lastName": "Nuss",
        "email": "wnuss4@java.com",
        "gender": types_1.Gender.Female,
        "address": "1 Lien Place",
        "password": "asdf1234"
    }), new types_1.MyWorker({
        "userName": "Aldo",
        "branchID": 5,
        "firstName": "Aldo",
        "lastName": "Blackett",
        "email": "ablackett5@vkontakte.ru",
        "gender": types_1.Gender.Male,
        "address": "14203 Thierer Crossing",
        "password": "asdf4"
    }), new types_1.MyWorker({
        "userName": "Raimund",
        "branchID": 3,
        "firstName": "Raimund",
        "lastName": "Vink",
        "email": "rvink6@baidu.com",
        "gender": types_1.Gender.Male,
        "address": "30239 Gale Place",
        "password": "fff"
    }), new types_1.MyWorker({
        "userName": "Niki",
        "branchID": 2,
        "firstName": "Niki",
        "lastName": "Wedgwood",
        "email": "nwedgwood7@merriam-webster.com",
        "gender": types_1.Gender.Male,
        "address": "5 Tony Pass",
        "password": "assss"
    }), new types_1.Manager({
        "branchID": 1,
        "userName": "Karine",
        "firstName": "Karine",
        "lastName": "Bolsteridge",
        "email": "kbolsteridge8@exblog.jp",
        "gender": types_1.Gender.Female,
        "address": "3654 Hanover Street",
        "password": "sdfsdf"
    }), new types_1.Manager({
        "branchID": 5,
        "userName": "Norman",
        "firstName": "Norman",
        "lastName": "Bradnam",
        "email": "nbradnam9@cornell.edu",
        "gender": types_1.Gender.Male,
        "address": "3179 Cascade Court",
        "password": "aaa123"
    }), new types_1.MyWorker({
        "branchID": 4,
        "userName": "Erich",
        "firstName": "Erich",
        "lastName": "Lippitt",
        "email": "elippitta@altervista.org",
        "gender": types_1.Gender.Male,
        "address": "147 Fieldstone Hill",
        "password": "fff564"
    }), new types_1.Customer({
        "firstName": "Crawford",
        "userName": "Crawford",
        "lastName": "Cooksley",
        "email": "ccooksleyb@slashdot.org",
        "gender": types_1.Gender.Male,
        "address": "84336 Beilfuss Alley",
        "password": "fdsa123"
    }), new types_1.Customer({
        "firstName": "Armando",
        "userName": "Armando",
        "lastName": "Sharkey",
        "email": "asharkeyc@cnbc.com",
        "gender": types_1.Gender.Male,
        "address": "3 Sloan Crossing",
        "password": "fdas"
    }), new types_1.Customer({
        "userName": "Fredericka",
        "firstName": "Fredericka",
        "lastName": "Crossgrove",
        "email": "fcrossgroved@shareasale.com",
        "gender": types_1.Gender.Female,
        "address": "45 Sloan Lane",
        "password": "456852"
    }), new types_1.MyWorker({
        "userName": "Paxton",
        "firstName": "Paxton",
        "lastName": "Eisak",
        "email": "peisake@reddit.com",
        "gender": types_1.Gender.Male,
        "address": "81305 Chive Park",
        "password": "1111"
    })];
var flowers = [
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Aconitum_degenii.jpg/128px-Aconitum_degenii.jpg"), "name": "Aconitum ", "family": "Ranunculus Family", "price": 5 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/WhiteGazania.JPG/128px-WhiteGazania.JPG"), "name": "African Daisy ", "family": "Gazania", "price": 5 }), new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Agapanthus_Postbloom.jpg/256px-Agapanthus_Postbloom.jpg"), "name": "Agapanthus ", "family": "Star of Bethlehem", "price": 8 }),
    new types_1.Flower({
        "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ageratum_houstonianum_%27Blue_Mink%27_%28Compositae%29_flowers.JPG/128px-Ageratum_houstonianum_%27Blue_Mink%27_%28Compositae%29_flowers.JPG"), "name": "Ageratum houstonianum ", "family": "Floss Flower", "price": 5
    }),
    new types_1.Flower({
        "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/d/de/Alchemilla_alpina0.jpg"), "name": "Alchemilla ", "family": "Lady's Mantle", "price": 2
    }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Allium_roseum%2C_Pisa.JPG/128px-Allium_roseum%2C_Pisa.JPG"), "name": "Allium roseum ", "family": "Onion, Garlic", "price": 4 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Alstroemeria_aurea_%27Saturne%27.jpg/128px-Alstroemeria_aurea_%27Saturne%27.jpg"), "name": "Alstroemeria ", "family": "Peruvian LIly", "price": 1 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Iceland_Plants_4911.JPG/128px-Iceland_Plants_4911.JPG"), "name": "Alyssum ", "family": "Sweet Alyssum", "price": 6 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/b/b3/Amaranthus_tricolor2.jpg"), "name": "Amaranthus ", "family": "Prince's Feather", "price": 10 }),
    new types_1.Flower({ "img": new url_1.URL("http://www.all-my-favourite-flower-names.com/images/800px-Amaryllis_hippeastrum_-_Candy_floss.jpg"), "name": "Amaryllis ", "family": "Hippeastrum", "price": 2 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Wood_anemone_flowers.jpg/128px-Wood_anemone_flowers.jpg"), "name": "Anemone ", "family": "Windflower", "price": 2 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Angelonia_salicariifolia_06.jpg/128px-Angelonia_salicariifolia_06.jpg"), "name": "Angelonia ", "family": "Summer Snapdragon", "price": 9 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Anthurium1.JPG/128px-Anthurium1.JPG"), "name": "Anthurium ", "family": "Flamingo Flower", "price": 1 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/File-Snapdragons.JPG/128px-File-Snapdragons.JPG"), "name": "Antirrhinum majus ", "family": "Snapdragon Flower", "price": 9 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Aquilegia_pyrenaica1JUSA.jpg/128px-Aquilegia_pyrenaica1JUSA.jpg"), "name": "Aquilegia ", "family": "Columbine, Granny's Bonnet", "price": 8 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Purple_Milkweed_Asclepias_purpurascens_Ant.jpg/128px-Purple_Milkweed_Asclepias_purpurascens_Ant.jpg"), "name": "Asclepias syriaca ", "family": "Purple Milkweed", "price": 3 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Aster_amellus_sl_1.jpg/128px-Aster_amellus_sl_1.jpg"), "name": "Aster ", "family": "Daisy Family. Asteraceae", "price": 9 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Astilbes_in_the_Botanical_Garden_01.JPG/128px-Astilbes_in_the_Botanical_Garden_01.JPG"), "name": "Astilbe ", "family": "False Goat's Beard, False Spirea", "price": 5 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/2/2d/Astrantia_%28Masterwort_Plant%29.jpg"), "name": "Astrantia ", "family": "Masterwort", "price": 4 }),
    new types_1.Flower({ "img": new url_1.URL("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mauve_Flowers_%284541324498%29.jpg/256px-Mauve_Flowers_%284541324498%29.jpg"), "name": "Aubreita deltoidea  Violet, pink and white flowers", "family": "Also known as Aubretia", "price": 1 })
];
//# sourceMappingURL=data.js.map