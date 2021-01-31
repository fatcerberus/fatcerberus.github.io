//Map Engine Experimentation


export class Sketch {
	
	constructor(locale) {
		this.name = locale.name;
		this.contents = locale.contents;
		this.landscape = locale.landscape;
		this.imagery = locale.imagery;
		this.mining = locale.mining;
		this.fieldLayout = locale.fieldLayout;
		this.tileScroll = locale.tileScroll;
		this.isDecorated = locale.isDecorated;
		this.color = locale.color;
	};
};

let gardenRenewal = new Sketch ({
	name: "Garden of Renewal",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/baikal.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Green,
});

let awayField = new Sketch ({
	name: "Away Field",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/massiveMap2.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Blue,
});

let neutralField = new Sketch ({
	name: "Neutral Field",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/bermudaTri.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.White,
});

let hostileTerritory = new Sketch ({
	name: "Hostile Territory",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/twinPhoenix.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Turquoise,
});

let wildLands = new Sketch ({
	name: "Wildlands",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/desman.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Orange,
});

let forestDepths = new Sketch ({
	name: "Forest Depths",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/leishy.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Maroon,
});

let bambooJungle = new Sketch ({
	name: "Bamboo Jungle",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/blossomOverlay.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Lime,
});

let dystopia = new Sketch ({
	name: "Dystopia",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/dystopia.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.MidnightBlue,
});

let memorialSquare = new Sketch ({
	name: "memorialSquare",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/massiveMap.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Purple,
});

let blizzardia = new Sketch ({
	name: "Blizzardia",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/snowBlind.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Yellow,
});

let nurSultan = new Sketch ({
	name: "Barys",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/barys.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	isDecorated: false,
	color: Color.Red,
});


let ascDojo = new Sketch ({
	name: "Ascetic",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let cowDojo = new Sketch ({
	name: "Coward",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let decDojo = new Sketch ({
	name: "Deceiver",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let divDojo = new Sketch ({
	name: "Diviner",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let empDojo = new Sketch ({
	name: "Empathist",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let hunDojo = new Sketch ({
	name: "Hunter",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let jesDojo = new Sketch ({
	name: "Jester",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let masDojo = new Sketch ({
	name: "Masochist",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let nihDojo = new Sketch ({
	name: "Nihilist",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let nosDojo = new Sketch ({
	name: "Nostalgic",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let occDojo = new Sketch ({
	name: "Occultist",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let renDojo = new Sketch ({
	name: "Renegade",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let sadDojo = new Sketch ({
	name: "Sadist",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let schDojo = new Sketch ({
	name: "Schemer",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let usuDojo = new Sketch ({
	name: "Usurper",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let venDojo = new Sketch ({
	name: "Vengeancer",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/victory1.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let grenDojo = new Sketch ({
	name: "Absolved",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/gamzee.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let reiAd = new Sketch ({
	name: "Celestial",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/quantumEnigma.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
});

let creationTemple = new Sketch ({
	name: "Temple of Creation",
	contents: [ ],
	landscape: [ ],
	imagery: Texture.fromFile('@/images/templeCreation.png'),
	fieldLayout: [ ],
	tileScroll: [ ],
	color: Color.Pink,
});


export let mappy = [
Array.of(gardenRenewal, awayField, neutralField, hostileTerritory, wildLands, forestDepths, bambooJungle, dystopia, memorialSquare, nurSultan, blizzardia, creationTemple),
Array.of(ascDojo, cowDojo, decDojo, divDojo, empDojo, hunDojo, jesDojo, masDojo, nihDojo, nosDojo, occDojo, renDojo, sadDojo, schDojo, usuDojo, venDojo, grenDojo),
Array.of(reiAd),
];