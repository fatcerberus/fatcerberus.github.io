//Battle items for inflicting statuses


export class itemMove {
	
	constructor(toy) {
		
		this.name = toy.name;
		this.power = toy.power; //Mostly for healing items, determines damage/healing output
		this.techType = toy.techType;
		this.accuracy = toy.accuracy;
		this.rarity = toy.rarity; //how likely to randomly appear on field
		this.comboOutput = toy.comboOutput; //1 = strategy, 2 = punishment, 3 = universal
		this.comboKey = toy.comboKey;
		this.rank = toy.rank; //1-5 scale, in half-point increments
		this.giveStatus = toy.giveStatus; //indicates which status the item inflicts
		this.sprite = toy.sprite;
		};
		
};

const acidJar = new itemMove ({ //Inflicts Unaware
	name: "Jar o' Acid",
	power: 3,
	techType: 1,
	accuracy: 1,
	rarity: 0.06,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 43,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const blankSheet = new itemMove ({ //Inflicts Vanilla
	name: "Blank Sheet",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.22,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 45,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const brokenOrb = new itemMove ({ //inflicts Chaos
	name: "Broken Orb",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.64,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 6,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const camoPylon = new itemMove ({ //Inflicts Faltering
	name: "Camo Pylon",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.57,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 15,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const cloudFlare = new itemMove ({ //Inflicts Float
	name: "Cloud Flare",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.17,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 17,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const cuneiForm = new itemMove ({ //Inflicts Vortex
	name: "Cube o' Cuneiform",
	power: 3,
	techType: 1,
	accuracy: 1,
	rarity: 0.2,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 46,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const cursedBone = new itemMove ({ //Inflicts Insidious
	name: "Cursed Bone",
	power: 3,
	techType: 1,
	accuracy: 1,
	rarity: 0.16,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 23,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const dankDew = new itemMove ({ //Inflicts Immune
	name: "Dank Dew",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.88,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 22,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const Eraser = new itemMove ({ //imparts Nullified
	name: "Eraser",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.71,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 31,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const freshTarget = new itemMove ({ //Inflicts Tagged
	name: "Fresh Target",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.19,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 41,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const fireCracker = new itemMove ({ //Inflicts Ablaze
	name: "Fire Cracker",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.08,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 0,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const funFume = new itemMove ({ //Inflicts Asphyxiation
	name: "Fun Fume",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.91,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 1,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const gamZee = new itemMove ({ //Imparts Gambit
	name: "Gamzee",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.24,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 18,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const goldenSun = new itemMove ({ //imparts Prescience
	name: "Golden Sun",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.15,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 34,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const hourGlass = new itemMove ({ //imparts Patience
	name: "Hourglass",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.01,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 33,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const hypnoTick = new itemMove ({ //inflicts Comatose
	name: "Hypno Tick",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.68,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 7,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const jadeBracelet = new itemMove ({ //imparts Deftness
	name: "Jade Bracelet",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.07,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 10,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const jokerCard = new itemMove ({ //Inflicts Baffled
	name: "Ace of Jokers",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.85,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 2,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const Leash = new itemMove ({ //Inflicts Enslaved
	name: "Leash",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.49,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 13,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const leechJar = new itemMove ({ //Inflicts Leech
	name: "Jar o' Leeches",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.11,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 26,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const luckyHoof = new itemMove ({ //Inflicts Kickback
	name: "Lucky Hoof",
	power: 3,
	techType: 1,
	accuracy: 1,
	rarity: 0.13,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 25,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const onionPowder = new itemMove ({ //imparts Respawn
	name: "Onion Powder",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.27,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 36,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const penguinCharm = new itemMove ({ //imparts Glide
	name: "Penguin Charm",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.33,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 19,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const pentaGram = new itemMove ({ //Inflicts Demon
	name: "Pentagram",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.46,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 11,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const porcuPine = new itemMove ({ //Inflicts Shrapnel
	name: "Perky Pine",
	power: 3,
	techType: 1,
	accuracy: 1,
	rarity: 0.23,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 38,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const redFang = new itemMove ({ //imparts Bestial
	name: "Red Fang",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.05,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 4,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const roseGlasses = new itemMove ({ //Inflicts Bedeviled
	name: "Rose Glasses",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.36,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 3,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const rubberBand = new itemMove ({ //Inflicts Resilient
	name: "Rubber Band",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.51,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 35,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const shroomHat = new itemMove ({ //Inflicts Distorted
	name: "Shroom Hat",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.17,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 12,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const snowFlake = new itemMove ({ //inflicts Crystalize
	name: "Snowflake",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.09,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 8,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const spiritChain = new itemMove ({ //Inflicts Bottleneck
	name: "Spirit Chain",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.47,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 5,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const summonBook = new itemMove ({ //Imparts Necromancy
	name: "Summoning Book",
	power: 4,
	techType: 1,
	accuracy: 1,
	rarity: 0.35,
	comboOutput: 1,
	comboKey: null,
	rank: 2.5,
	giveStatus: 30,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const thirdEye = new itemMove ({ //inflicts Worried
	name: "Third Eye",
	power: 1,
	techType: 1,
	accuracy: 1,
	rarity: 0.29,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 48,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const viperFang = new itemMove ({ //Inflicts Snakebit
	name: "Viper Fang",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.42,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 39,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const voltMeter = new itemMove ({ //Imparts Jolt
	name: "Volt Meter",
	power: 2,
	techType: 1,
	accuracy: 1,
	rarity: 0.08,
	comboOutput: 1,
	comboKey: null,
	rank: 2,
	giveStatus: 24,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

const wispyYukata = new itemMove ({ //Imparts Wunderlust
	name: "Wispy Yukata",
	power: 5,
	techType: 1,
	accuracy: 1,
	rarity: 0.16,
	comboOutput: 1,
	comboKey: null,
	rank: 2.5,
	giveStatus: 49,
	sprite: Texture.fromFile('@/images/tscka1.png'),
});

//Peace accord -- Inflicts seal status

export const itemList = [
	Array.of(
	shroomHat, //0
	acidJar, //1
	blankSheet, //2
	brokenOrb, //3
	camoPylon, //4
	cloudFlare, //5
	cuneiForm, //6
	cursedBone, //7
	dankDew, //8
	Eraser, //9
	fireCracker, //10
	freshTarget, //11
	funFume, //12
	gamZee, //13
	goldenSun, //14
	hourGlass, //15
	hypnoTick, //16
	jadeBracelet, //17
	jokerCard, //18
	Leash, //19
	leechJar, //20
	luckyHoof, //21
	onionPowder, //22
	penguinCharm, //23
	pentaGram, //24
	porcuPine, //25
	redFang, //26
	roseGlasses, //27
	rubberBand, //28
	snowFlake, //29
	spiritChain, //30
	summonBook, //31
	thirdEye, //32
	viperFang, //33
	voltMeter, //34
	wispyYukata, //35
	),
	[ ],
];
