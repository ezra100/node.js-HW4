import { read } from "fs";

export enum Gender { Male = 1, Female = 2 }

export abstract class User {
    save(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    static readonly className: string = User.name;
    // used to remember the class type when the client sends back
    // the object for update/deletion/client type etc.
    className: string = User.name;
    firstName: string;
    lastName: string;
    userName: string; // key/id field
    password: string;
    email: string;
    gender: Gender;
    address: string;
    image : string;
    public constructor(init?: Partial<User>) {
        // console.assert(!User.findByUserName(init.userName));
        Object.assign(this, init);
    }
    compare(other: User): boolean {
        return this.userName.toLowerCase() === other.userName.toLowerCase();
    }
    compareByUserName(userName: string): boolean {
        return this.userName.toLowerCase() === userName.toLowerCase();
    }
}

export class Customer extends User {
    static readonly className: string = Customer.name;

    public constructor(init?: Partial<Customer>) {
        super(init);
        this.className = Customer.name;
    }
}

export class Provider extends User {

    branchID: number;
    public constructor(init?: Partial<Provider>) {
        super(init);
        Object.assign(this, init);
        this.className = Provider.name;
    }
}

export class Employee extends User {
    static readonly className: string = Employee.name;

    branchID: number;
    public constructor(init?: Partial<Employee>) {
        super(init);
        Object.assign(this, init);
        this.className = Employee.name;
    }
}

export class Manager extends Employee {
    static readonly className: string = Manager.name;

    public constructor(init?: Partial<Manager>) {
        super(init);
        Object.assign(this, init);
        this.className = Manager.name;
    }
}

export class Branch {
    id: number;
    address: string;
    // ture by default
    active: boolean = true;
    name: string;
    static id: number = 0;
    public constructor(init?: any) {
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

export class Flower {
    name: string;
    family: string;
    price: number;
    img: URL;
    colorDesc: string;
    color: string;
    public constructor(init?: Partial<Flower>) {
        Object.assign(this, init);
        this.color = colorMap[this.colorDesc];
    }
}


export enum Color {
    black = "black",
    silver = "silver",
    gray = "gray",
    white = "white",
    maroon = "maroon",
    red = "red",
    purple = "purple",
    fuchsia = "fuchsia",
    green = "green",
    lime = "lime",
    olive = "olive",
    yellow = "yellow",
    navy = "navy",
    blue = "blue",
    teal = "teal",
    aqua = "aqua",
    orange = "orange",
    aliceblue = "aliceblue",
    antiquewhite = "antiquewhite",
    aquamarine = "aquamarine",
    azure = "azure",
    beige = "beige",
    bisque = "bisque",
    blanchedalmond = "blanchedalmond",
    blueviolet = "blueviolet",
    brown = "brown",
    burlywood = "burlywood",
    cadetblue = "cadetblue",
    chartreuse = "chartreuse",
    chocolate = "chocolate",
    coral = "coral",
    cornflowerblue = "cornflowerblue",
    cornsilk = "cornsilk",
    crimson = "crimson",
    cyan = "cyan",
    darkblue = "darkblue",
    darkcyan = "darkcyan",
    darkgoldenrod = "darkgoldenrod",
    darkgray = "darkgray",
    darkgreen = "darkgreen",
    darkgrey = "darkgrey",
    darkkhaki = "darkkhaki",
    darkmagenta = "darkmagenta",
    darkolivegreen = "darkolivegreen",
    darkorange = "darkorange",
    darkorchid = "darkorchid",
    darkred = "darkred",
    darksalmon = "darksalmon",
    darkseagreen = "darkseagreen",
    darkslateblue = "darkslateblue",
    darkslategray = "darkslategray",
    darkslategrey = "darkslategrey",
    darkturquoise = "darkturquoise",
    darkviolet = "darkviolet",
    deeppink = "deeppink",
    deepskyblue = "deepskyblue",
    dimgray = "dimgray",
    dimgrey = "dimgrey",
    dodgerblue = "dodgerblue",
    firebrick = "firebrick",
    floralwhite = "floralwhite",
    forestgreen = "forestgreen",
    gainsboro = "gainsboro",
    ghostwhite = "ghostwhite",
    gold = "gold",
    goldenrod = "goldenrod",
    greenyellow = "greenyellow",
    grey = "grey",
    honeydew = "honeydew",
    hotpink = "hotpink",
    indianred = "indianred",
    indigo = "indigo",
    ivory = "ivory",
    khaki = "khaki",
    lavender = "lavender",
    lavenderblush = "lavenderblush",
    lawngreen = "lawngreen",
    lemonchiffon = "lemonchiffon",
    lightblue = "lightblue",
    lightcoral = "lightcoral",
    lightcyan = "lightcyan",
    lightgoldenrodyellow = "lightgoldenrodyellow",
    lightgray = "lightgray",
    lightgreen = "lightgreen",
    lightgrey = "lightgrey",
    lightpink = "lightpink",
    lightsalmon = "lightsalmon",
    lightseagreen = "lightseagreen",
    lightskyblue = "lightskyblue",
    lightslategray = "lightslategray",
    lightslategrey = "lightslategrey",
    lightsteelblue = "lightsteelblue",
    lightyellow = "lightyellow",
    limegreen = "limegreen",
    linen = "linen",
    magenta = "magenta",
    mediumaquamarine = "mediumaquamarine",
    mediumblue = "mediumblue",
    mediumorchid = "mediumorchid",
    mediumpurple = "mediumpurple",
    mediumseagreen = "mediumseagreen",
    mediumslateblue = "mediumslateblue",
    mediumspringgreen = "mediumspringgreen",
    mediumturquoise = "mediumturquoise",
    mediumvioletred = "mediumvioletred",
    midnightblue = "midnightblue",
    mintcream = "mintcream",
    mistyrose = "mistyrose",
    moccasin = "moccasin",
    navajowhite = "navajowhite",
    oldlace = "oldlace",
    olivedrab = "olivedrab",
    orangered = "orangered",
    orchid = "orchid",
    palegoldenrod = "palegoldenrod",
    palegreen = "palegreen",
    paleturquoise = "paleturquoise",
    palevioletred = "palevioletred",
    papayawhip = "papayawhip",
    peachpuff = "peachpuff",
    peru = "peru",
    pink = "pink",
    plum = "plum",
    powderblue = "powderblue",
    rosybrown = "rosybrown",
    royalblue = "royalblue",
    saddlebrown = "saddlebrown",
    salmon = "salmon",
    sandybrown = "sandybrown",
    seagreen = "seagreen",
    seashell = "seashell",
    sienna = "sienna",
    skyblue = "skyblue",
    slateblue = "slateblue",
    slategray = "slategray",
    slategrey = "slategrey",
    snow = "snow",
    springgreen = "springgreen",
    steelblue = "steelblue",
    tan = "tan",
    thistle = "thistle",
    tomato = "tomato",
    turquoise = "turquoise",
    violet = "violet",
    wheat = "wheat",
    whitesmoke = "whitesmoke",
    yellowgreen = "yellowgreen",
    rebeccapurple = "rebeccapurple",
}


const colorMap: { [color: string]: string } = {
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
