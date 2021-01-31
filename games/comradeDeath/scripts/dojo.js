//Test class for battle initiation


export class Dojo {
	
	constructor(kiwi) {
		this.name = kiwi.name;
		this.tileLock = kiwi.tileLock;
		this.doorWay = kiwi.doorWay;
		this.memberList = kiwi.memberList;
		this.kingPin = kiwi.kingPin;
		//this.oracle = kiwi.oracle;
		this.sprite = kiwi.sprite;
	};
	
	dustFlap() {
		
		let axIt = this.doorWay - this.tileLock;
		let nixIt;
		if (axIt > 0) {
			if (axIt > 1) {
				nixIt = 0;
			}
			else {
				nixIt = 1
			};
		}
		else {
			if (axIt < -1) {
				nixIt = 2;
			}
			else {
				nixIt = 3;
			};
		};
		return nixIt;
	};
};

const Asce = new Dojo({
	name: "Ascetic",
	tileLock: 183,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/bermudaTri1.png'),
});

const Cowa = new Dojo({
	name: "Coward",
	tileLock: 73,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/tian1.png'),
});

const Dece = new Dojo({
	name: "Deceiver",
	tileLock: 5,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/merek1.png'),
});

const Divi = new Dojo({
	name: "Diviner",
	tileLock: 245,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/molod1.png'),
});

const Empa = new Dojo({
	name: "Empathist",
	tileLock: 92,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/bermudaTri1.png'),
});

const Gren = new Dojo({
	name: "Absolved",
	tileLock: 113,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/spartak1.png'),
});

const Hunt = new Dojo({
	name: "Hunter",
	tileLock: 127,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/tian1.png'),
});

const Jest = new Dojo({
	name: "Jester",
	tileLock: 204,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/bermudaTri1.png'),
});

const Maso = new Dojo({
	name: "Masochist",
	tileLock: 231,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/molod1.png'),
});

const Nihi = new Dojo({
	name: "Nihilist",
	tileLock: 116,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/tian1.png'),
});

const Nost = new Dojo({
	name: "Nostalgic",
	tileLock: 62,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/merek1.png'),
});

const Occu = new Dojo({
	name: "Occultist",
	tileLock: 79,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/tian1.png'),
});

const Rene = new Dojo({
	name: "Renegade",
	tileLock: 104,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/merek1.png'),
});

const Sadi = new Dojo({
	name: "Sadist",
	tileLock: 27,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/merek1.png'),
});

const Sche = new Dojo({
	name: "Schemer",
	tileLock: 41,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/bermudaTri1.png'),
});

const Usur = new Dojo({
	name: "Usurper",
	tileLock: 218,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/molod1.png'),
});

const Veng = new Dojo({
	name: "Vengeancer",
	tileLock: 149,
	memberList: [ ],
	sprite: Texture.fromFile('@/images/tian1.png'),
});

export let dojoList = [
Array.of(
Asce, //0
Cowa, //1
Dece, //2
Divi, //3
Empa, //4
Hunt, //5
Jest, //6
Maso, //7
Nihi, //8
Nost, //9
Occu, //10
Rene, //11
Sadi, //12
Sche, //13
Usur, //14
Veng, //15
),
[ ],
Gren,
Dojo,
[ ],
];