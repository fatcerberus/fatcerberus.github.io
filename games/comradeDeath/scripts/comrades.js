//Define the Comrades class -- They are floating ghost-like entities that carry the spirit of the goddess. You can use
	//them once, and then they become armor. They can be revitalized at shrines. The more powerful the comrade, the more
	//health you regain, but it may harm you first, since the concentration of spirit mana is much higher. Range is 30-55%

import { Random } from '/lib/sphere-runtime.js';


export class Comrade
{
	constructor(helper) {

		this.name = helper.name;
		this.power = helper.power;
		this.techType = helper.techType;
		this.comboOutput = helper.comboOutput;
		this.healFactor = helper.healFactor; //Restorative effect, from 30-55%
		this.armorSlot = helper.armorSlot; //What armor slot it goes in, 0-3 index number for array
		this.maxDefense = helper.maxDefense; //How much damage it blocks
		this.defense = helper.defense; //Might be able to save some space by assigning this elsewhere, but can't have it overwrite changes
		this.targetRegion = helper.targetRegion; //which armor section defends
		this.rank = helper.rank;
		this.selfHarm = helper.selfHarm; //Recoil factor
		this.vim = helper.vim; // How long it lasts as armor
		this.tileLock = helper.tileLock;
		this.sprite = helper.sprite;
	};

	apocalypse() {

		for (let c = 0; c < foeList.length; c++) {
			let muchly = Math.max(Math.round(battlerList[c].health / 3), 1);
			foeList[c].vigor -= 10;
			foeList[c].harm(null, foeList[c], muchly);
			//foeList[c].health = 1;
			//mainChar.agent.vigor -= 30;
			//partyList[1].agent.health += 25;
			//battlerList[c].deathCheck();
		};
	};
	
	creak(vic) {
		
		vic.berserkSuit[this.armorSlot].vim -=1;
		
		if (vic.berserkSuit[this.armorSlot].vim <= 0) {
			vic.disRobe(this.armorSlot);
			vic.armoryRun("default", this.armorSlot);
		};
	};
	
	fiendery() {

		Aggressor.harm(null, Aggressor, Aggressor.healthMax * this.selfHarm);
		if (battlerList.includes(Aggressor)) {
			let e = Math.trunc(Random.normal((this.healFactor * Aggressor.healthMax), Aggressor.healthMax * .0135));
			Aggressor.heal(e);
			Aggressor.target.harm(Aggressor, Aggressor.target, damage);
			Aggressor.kelpTape();
			Aggressor.addStatus(42);
			attackName += ": Triggered";
			Aggressor.armoryRun(this.armorSlot, this.defense);
			Aggressor.berserkSuit[this.armorSlot] = this;
		};
		Aggressor.comradesPast.push(Aggressor.moveChoice);
		let g = Aggressor.comrades.indexOf(Aggressor.moveChoice);
		Aggressor.comrades.splice(g, 1);
	};
};

//The little spirits that help you

const Aviapochta = new Comrade ({
	name: "Aviapoctha",
	power: 5,
	techType: 3,
	healFactor: .48,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3,
	selfHarm: .013,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Bezyskhodnost = new Comrade ({
	name: "Bezyzkhodnost'",
	power: 13,
	techType: 3,
	healFactor: .55,
	armorSlot: 1,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3.5,
	selfHarm: .02,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Chereschur = new Comrade ({
	name: "Chereschur",
	power: 14,
	techType: 3,
	healFactor: .50,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3.5,
	selfHarm: .015,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Derzhavnost = new Comrade ({
	name: "Derzhavnost'",
	power: 13,
	techType: 3,
	healFactor: .43,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3.5,
	selfHarm: .0175,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Druzhba = new Comrade ({
	name: "Druzhba",
	power: 12,
	techType: 3,
	healFactor: .36,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .016,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Izkupleniye = new Comrade ({
	name: "Izkupleniye",
	power: 10,
	techType: 3,
	healFactor: .41,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3.5,
	selfHarm: .0115,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Izkusheniye = new Comrade ({
	name: "Izkusheniye",
	power: 3,
	techType: 3,
	healFactor: .49,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3,
	selfHarm: .0105,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Kamen = new Comrade ({
	name: "Kamen'",
	power: 13,
	techType: 3,
	healFactor: .47,
	armorSlot: 1,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3.5,
	selfHarm: .0165,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Krasota = new Comrade ({
	name: "Krasota",
	power: 5,
	techType: 3,
	healFactor: .50,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .0025,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Lozh = new Comrade ({
	name: "Lozh'",
	power: 8,
	techType: 3,
	healFactor: .31,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3,
	selfHarm: .0035,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Moshchnost = new Comrade ({
	name: "Moshchnost'",
	power: 14,
	techType: 3,
	healFactor: .45,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3.5,
	selfHarm: .018,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Navodneniye = new Comrade ({
	name: "Navodneniye",
	power: 14,
	techType: 3,
	healFactor: .53,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3.5,
	selfHarm: .0195,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Nezavisimost = new Comrade ({
	name: "Nezavisimost'",
	power: 10,
	techType: 3,
	healFactor: .46,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3.5,
	selfHarm: .017,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Podushka = new Comrade ({
	name: "Podushka",
	power: 9,
	techType: 3,
	healFactor: .43,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .0125,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Povtoreniye = new Comrade ({
	name: "Povtoreniye",
	power: 11,
	techType: 3,
	healFactor: .33,
	armorSlot: 1,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3,
	selfHarm: .006,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Proschyot = new Comrade ({
	name: "Proschyot",
	power: 8,
	techType: 3,
	healFactor: .39,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3,
	selfHarm: .0055,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Pustynya = new Comrade ({
	name: "Pustynya",
	power: 12,
	techType: 3,
	healFactor: .35,
	armorSlot: 1,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .009,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Raduga = new Comrade ({
	name: "Raduga",
	power: 10,
	techType: 3,
	healFactor: .44,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3.5,
	selfHarm: .0145,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Razrusheniye = new Comrade ({
	name: "Razhrusheniye",
	power: 15,
	techType: 3,
	healFactor: .34,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3,
	selfHarm: .014,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Snegopad = new Comrade ({
	name: "Snegopad",
	power: 12,
	techType: 3,
	healFactor: .51,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3.5,
	selfHarm: .019,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Sozdaniye = new Comrade ({
	name: "Sozdaniye",
	power: 6,
	techType: 3,
	healFactor: .36,
	armorSlot: 1,
	maxDefense: 30,
	defense: 30,
	targetRegion: 0,
	rank: 3,
	selfHarm: .007,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Terpimost = new Comrade ({
	name: "Terpimost'",
	power: 6,
	techType: 3,
	healFactor: .52,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 3,
	rank: 3,
	selfHarm: .013,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Vozmezdiye = new Comrade ({
	name: "Vozmezdiye",
	power: 15,
	techType: 3,
	healFactor: .31,
	armorSlot: 2,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .0065,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Vzyatka = new Comrade ({
	name: "Vzyatka",
	power: 11,
	techType: 3,
	healFactor: .46,
	armorSlot: 0,
	maxDefense: 30,
	defense: 30,
	targetRegion: 1,
	rank: 3.5,
	selfHarm: .017,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});

const Zabor = new Comrade ({
	name: "Zabor",
	power: 6,
	techType: 3,
	healFactor: .49,
	armorSlot: 3,
	maxDefense: 30,
	defense: 30,
	targetRegion: 2,
	rank: 3,
	selfHarm: .0105,
	vim: 65,
	sprite: Texture.fromFile('@/images/ducks1.png'),
});


export let comradePosse = [
Array.of(
Aviapochta, //0
Bezyskhodnost, //1
Chereschur, //2
Derzhavnost, //3
Druzhba, //4
Izkupleniye, //5
Izkusheniye, //6
Kamen, //7
Krasota, //8
Lozh, //9
Moshchnost, //10
Navodneniye, //11
Nezavisimost, //12
Podushka, //13
Povtoreniye, //14
Proschyot, //15
Pustynya, //16
Raduga, //17
Razrusheniye, //18
Snegopad, //19
Sozdaniye, //20
Terpimost, //21
Vozmezdiye, //22
Vzyatka, //23
Zabor, //24
),
[ ],
];