export var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (Gender = {}));
export class User {
    constructor(init) {
        // used to remember the class type when the client sends back
        // the object for update/deletion/client type etc.
        this.className = User.name;
        // console.assert(!User.findByUserName(init.username));
        Object.assign(this, init);
    }
    save(arg0) {
        throw new Error("Method not implemented.");
    }
    compare(other) {
        return this.username.toLowerCase() === other.username.toLowerCase();
    }
    compareByUserName(username) {
        return this.username.toLowerCase() === username.toLowerCase();
    }
}
export class Customer extends User {
    constructor(init) {
        super(init);
        this.className = Customer.name;
    }
}
export class Provider extends User {
    constructor(init) {
        super(init);
        Object.assign(this, init);
        this.className = Provider.name;
    }
}
export class Employee extends User {
    constructor(init) {
        super(init);
        Object.assign(this, init);
        this.className = Employee.name;
    }
}
export class Manager extends Employee {
    constructor(init) {
        super(init);
        Object.assign(this, init);
        this.className = Manager.name;
    }
}
export class Branch {
    constructor(init) {
        // ture by default
        this.active = true;
        if (typeof init.active === "string" || init.active instanceof String) {
            init.active = init.active === "true";
        }
        if (typeof init.id === "string" || init.id instanceof String) {
            init.id = parseInt(init.id, 10);
        }
        Object.assign(this, init);
        // if there's no id, assign a new id
        if (this.id === undefined) {
            this.id = Branch.id++;
        }
    }
}
Branch.id = 0;
export class Flower {
    constructor(init) {
        Object.assign(this, init);
        this.color = colorMap[this.colorDesc];
    }
}
export var Color;
(function (Color) {
    Color["black"] = "black";
    Color["silver"] = "silver";
    Color["gray"] = "gray";
    Color["white"] = "white";
    Color["maroon"] = "maroon";
    Color["red"] = "red";
    Color["purple"] = "purple";
    Color["fuchsia"] = "fuchsia";
    Color["green"] = "green";
    Color["lime"] = "lime";
    Color["olive"] = "olive";
    Color["yellow"] = "yellow";
    Color["navy"] = "navy";
    Color["blue"] = "blue";
    Color["teal"] = "teal";
    Color["aqua"] = "aqua";
    Color["orange"] = "orange";
    Color["aliceblue"] = "aliceblue";
    Color["antiquewhite"] = "antiquewhite";
    Color["aquamarine"] = "aquamarine";
    Color["azure"] = "azure";
    Color["beige"] = "beige";
    Color["bisque"] = "bisque";
    Color["blanchedalmond"] = "blanchedalmond";
    Color["blueviolet"] = "blueviolet";
    Color["brown"] = "brown";
    Color["burlywood"] = "burlywood";
    Color["cadetblue"] = "cadetblue";
    Color["chartreuse"] = "chartreuse";
    Color["chocolate"] = "chocolate";
    Color["coral"] = "coral";
    Color["cornflowerblue"] = "cornflowerblue";
    Color["cornsilk"] = "cornsilk";
    Color["crimson"] = "crimson";
    Color["cyan"] = "cyan";
    Color["darkblue"] = "darkblue";
    Color["darkcyan"] = "darkcyan";
    Color["darkgoldenrod"] = "darkgoldenrod";
    Color["darkgray"] = "darkgray";
    Color["darkgreen"] = "darkgreen";
    Color["darkgrey"] = "darkgrey";
    Color["darkkhaki"] = "darkkhaki";
    Color["darkmagenta"] = "darkmagenta";
    Color["darkolivegreen"] = "darkolivegreen";
    Color["darkorange"] = "darkorange";
    Color["darkorchid"] = "darkorchid";
    Color["darkred"] = "darkred";
    Color["darksalmon"] = "darksalmon";
    Color["darkseagreen"] = "darkseagreen";
    Color["darkslateblue"] = "darkslateblue";
    Color["darkslategray"] = "darkslategray";
    Color["darkslategrey"] = "darkslategrey";
    Color["darkturquoise"] = "darkturquoise";
    Color["darkviolet"] = "darkviolet";
    Color["deeppink"] = "deeppink";
    Color["deepskyblue"] = "deepskyblue";
    Color["dimgray"] = "dimgray";
    Color["dimgrey"] = "dimgrey";
    Color["dodgerblue"] = "dodgerblue";
    Color["firebrick"] = "firebrick";
    Color["floralwhite"] = "floralwhite";
    Color["forestgreen"] = "forestgreen";
    Color["gainsboro"] = "gainsboro";
    Color["ghostwhite"] = "ghostwhite";
    Color["gold"] = "gold";
    Color["goldenrod"] = "goldenrod";
    Color["greenyellow"] = "greenyellow";
    Color["grey"] = "grey";
    Color["honeydew"] = "honeydew";
    Color["hotpink"] = "hotpink";
    Color["indianred"] = "indianred";
    Color["indigo"] = "indigo";
    Color["ivory"] = "ivory";
    Color["khaki"] = "khaki";
    Color["lavender"] = "lavender";
    Color["lavenderblush"] = "lavenderblush";
    Color["lawngreen"] = "lawngreen";
    Color["lemonchiffon"] = "lemonchiffon";
    Color["lightblue"] = "lightblue";
    Color["lightcoral"] = "lightcoral";
    Color["lightcyan"] = "lightcyan";
    Color["lightgoldenrodyellow"] = "lightgoldenrodyellow";
    Color["lightgray"] = "lightgray";
    Color["lightgreen"] = "lightgreen";
    Color["lightgrey"] = "lightgrey";
    Color["lightpink"] = "lightpink";
    Color["lightsalmon"] = "lightsalmon";
    Color["lightseagreen"] = "lightseagreen";
    Color["lightskyblue"] = "lightskyblue";
    Color["lightslategray"] = "lightslategray";
    Color["lightslategrey"] = "lightslategrey";
    Color["lightsteelblue"] = "lightsteelblue";
    Color["lightyellow"] = "lightyellow";
    Color["limegreen"] = "limegreen";
    Color["linen"] = "linen";
    Color["magenta"] = "magenta";
    Color["mediumaquamarine"] = "mediumaquamarine";
    Color["mediumblue"] = "mediumblue";
    Color["mediumorchid"] = "mediumorchid";
    Color["mediumpurple"] = "mediumpurple";
    Color["mediumseagreen"] = "mediumseagreen";
    Color["mediumslateblue"] = "mediumslateblue";
    Color["mediumspringgreen"] = "mediumspringgreen";
    Color["mediumturquoise"] = "mediumturquoise";
    Color["mediumvioletred"] = "mediumvioletred";
    Color["midnightblue"] = "midnightblue";
    Color["mintcream"] = "mintcream";
    Color["mistyrose"] = "mistyrose";
    Color["moccasin"] = "moccasin";
    Color["navajowhite"] = "navajowhite";
    Color["oldlace"] = "oldlace";
    Color["olivedrab"] = "olivedrab";
    Color["orangered"] = "orangered";
    Color["orchid"] = "orchid";
    Color["palegoldenrod"] = "palegoldenrod";
    Color["palegreen"] = "palegreen";
    Color["paleturquoise"] = "paleturquoise";
    Color["palevioletred"] = "palevioletred";
    Color["papayawhip"] = "papayawhip";
    Color["peachpuff"] = "peachpuff";
    Color["peru"] = "peru";
    Color["pink"] = "pink";
    Color["plum"] = "plum";
    Color["powderblue"] = "powderblue";
    Color["rosybrown"] = "rosybrown";
    Color["royalblue"] = "royalblue";
    Color["saddlebrown"] = "saddlebrown";
    Color["salmon"] = "salmon";
    Color["sandybrown"] = "sandybrown";
    Color["seagreen"] = "seagreen";
    Color["seashell"] = "seashell";
    Color["sienna"] = "sienna";
    Color["skyblue"] = "skyblue";
    Color["slateblue"] = "slateblue";
    Color["slategray"] = "slategray";
    Color["slategrey"] = "slategrey";
    Color["snow"] = "snow";
    Color["springgreen"] = "springgreen";
    Color["steelblue"] = "steelblue";
    Color["tan"] = "tan";
    Color["thistle"] = "thistle";
    Color["tomato"] = "tomato";
    Color["turquoise"] = "turquoise";
    Color["violet"] = "violet";
    Color["wheat"] = "wheat";
    Color["whitesmoke"] = "whitesmoke";
    Color["yellowgreen"] = "yellowgreen";
    Color["rebeccapurple"] = "rebeccapurple";
})(Color || (Color = {}));
const colorMap = {
    black: "#000000",
    silver: "#c0c0c0",
    gray: "#808080",
    white: "#ffffff",
    maroon: "#800000",
    red: "#ff0000",
    purple: "#800080",
    fuchsia: "#ff00ff",
    green: "#008000",
    lime: "#00ff00",
    olive: "#808000",
    yellow: "#ffff00",
    navy: "#000080",
    blue: "#0000ff",
    teal: "#008080",
    aqua: "#00ffff",
    orange: "#ffa500",
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    blanchedalmond: "#ffebcd",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    oldlace: "#fdf5e6",
    olivedrab: "#6b8e23",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    whitesmoke: "#f5f5f5",
    yellowgreen: "#9acd32",
    rebeccapurple: "#663399"
};
//# sourceMappingURL=types.js.map