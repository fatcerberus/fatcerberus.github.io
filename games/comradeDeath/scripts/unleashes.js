//Defining weapon unleashes and their effects -- can personas influence unleashes too, maybe the secondary effect?

import { from } from '/lib/sphere-runtime.js';


export class Unleash
{
	constructor(wild) {
		this.name = wild.name;
		this.power = wild.power;
		this.techType = wild.techType;
		this.drain = wild.drain; //How much of the unleash meter it requires
		this.comboOutput = wild.comboOutput; //1 = strategy, 2 = punishment, 3 = universal
		this.comboKey = wild.comboKey;
		this.targetRegion = wild.targetRegion; //Which armor point it hits
		this.rank = wild.rank; //1-5 scale, in half-point increments
		this.statusOpt = wild.statusOpt;
		this.giveStatus = wild.giveStatus; //indicates if the item inflicts a status and which one
	};
	
	personalize(agg) { //Persona unleash secondary effects
		
		let m;
		let x;
		let q;
		let store;
		
		switch(Aggressor.persona) {
			
			case "Ascetic":
				Aggressor.stress -= 1.25;
				attackName += " - Composure"; //Composure - Stress meter drops by 1.25;
			break;
			case "Coward": 
				x = function xr() {
					chance += .25;
				};
				q = function check() {
					m = agg == Aggressor.target ? true : false;
					return m;
				};
				store = Array.of(x, [ ], q);
				Aggressor.pendingAction.push(store);
				attackName += " - Elusive"; //Elusive - Increases chances of next received attack missing
			break;
			case "Deceiver": 
				Aggressor.modifyRank -= .25;
				attackName += " - Awareness"; //Awareness - Reduces move rank for remainder of battle
			break;
			case "Diviner": 
				Aggressor.unleashMeter += 4;
				attackName += " - Stealth"; //Stealth - Unleash meter refills faster
			break;
			case "Empathist": 
				Aggressor.heal(Aggressor.healthMax * .03);
				attackName += " - Resilience"; //Resilience - Recovers 3% of HP after attacked
			break;
			case "Hunter": 
				Aggressor.harm(null, Aggressor, Aggressor.health * .015);
				Aggressor.movePower *= 1.05;
				attackName += " - Bloodlust"; //Bloodlust - Convert HP to power
			break;
			case "Iconoclast":
				let honk = from(Aggressor.alteredState)
					.where(it => it[0].statusType == 0)
					.where(it => it[1] != Infinity)
					.toArray();
				for (let j = 0; j < honk.length; j++) {
					honk[j][1]--;
				};
				let z = from(Aggressor.alteredState)
					.where(it => it[1] == 0)
					.where(it => it.name != "Asphyxiation")
					.toArray();
				for (let j = 0; j < z.length; j++) {
					let o = Aggressor.alteredState.indexOf(z[j]);
					Aggressor.alteredState[o][0].redact(Aggressor);
					Aggressor.alteredState.splice(o, 1);
				};
				attackName += " - Uniquality"; //Negative statuses last one turn less
			break;
			case "Jester":
				Aggressor.addStatus(35);
				attackName += " - Determination"; //Determination - Can't die this turn (add Resilient)
			break;
			case "Masochist": 
				let vial = from(makeShift[2][0]).sample(1).toArray();
				if (!Aggressor.stock[0].includes(vial[0])) {
					Aggressor.stock[0].push(...vial);
					Aggressor.stock[1].push(1);
				}
				else {
					let vile = Aggressor.stock[0].indexOf(vial[0]);
					Aggressor.stock[1][vile] += 1;
				};
				attackName += " - Fortitude"; //Endurance: gets a free heal item
			break;
			case "Nihilist": 
				Aggressor.target.comboLog = null;
				attackName += " - Impervious"; //Impervious - nixes any upcoming combo possibility
			break;
			case "Nostalgic": 
				Aggressor.armorPower *= 1.035;
				attackName += " - Bravery"; //Bravery - raises armor power
			break;
			case "Occultist": 
				x = function xr() {
					chance -= .25;
				};
				q = function check() {
					m = agg == Aggressor ? true : false;
					return m;
				};
				store = Array.of(x, [ ], q);
				Aggressor.pendingAction.push(store);
				attackName += " - Confidence"; //Confidence - move accuracy increases
			break;
			case "Renegade": 
				if (Aggressor.hasAlly === false) {
					damage *= 1.11;
				}
				else {
					damage *= 1.03;
				};
				attackName += " - Solitary"; //Solitary - damage done increases if solo battling
			break;
			case "Sadist": 
				Aggressor.target.swapWeapon(0);
				attackName += " - Brazen"; //Brazen - Forces a weapon swap
			break;
			case "Schemer": 
				if (!Aggressor.stash[0].includes(vial[0])) {
					Aggressor.stash[0].push(...vial);
					Aggressor.stash[1].push(1);
				}
				else {
					let vile = Aggressor.stash[0].indexOf(vial[0]);
					Aggressor.stash[1][vile] += 1;
				};
				attackName += " - Preparation"; //Preparation - gains a free battle item
			break;
			case "Usurper": 
				x = function xr() {
					Aggressor.moveChoice = Aggressor.defaultMove;
				};
				q = function check(stage) {
					m = agg.target == Aggressor && stage == 2 ? true : false;
					return m;
				};
				store = Array.of(x, [ ], check);
				Aggressor.pendingAction.push(store);
				attackName += " - Charisma"; //Charisma - Target uses default move next turn
			break;
			case "Vengeancer": 
				let a = from(bodyList)
					.where(it => it.isProtag == Aggressor.isProtag)
					.where(it => it.deathFlag)
					.toArray();
				if (a.length > 0) {
					damage *= 1.11;
				}
				else {
					damage *= 1.03;
				};
				attackName += " - Fury"; //Fury - Damage boost if an ally has fallen
			break;
		};
	};
	
	ravage() { //Unleash probability increases if weapon style matches prefStyle. Some classes have higher rates
		
		Aggressor.giveStatus(Aggressor.moveChoice.yumi(Aggressor));
		Aggressor.target.harm(Aggressor, Aggressor.target, damage); //No Math.max here. Unleash is an uncapped attack
		Aggressor.wound();
		Aggressor.unleashMeter -= Aggressor.moveChoice.drain; //Reduce Unleash reserve
		attackName += " (Unleash)"
	};
	
	yumi() {
		
		let nemu = (this == Devoid && Aggressor.level > 13) || this == innerSanctum ? true : false;
		let kuro;
		let tsuchi;
		
		if (nemu == true) {
			kuro = Aggressor.persona;
			this.personalize(Aggressor);
			tsuchi = Math.round(Math.random());
		}
		else {
			kuro = Aggressor.weaponCurrent;
			tsuchi = kuro.grade == 1 ? 0 : kuro.grade == 3 ? 1 : Math.round(Math.random());
		};
		this.statusOpt = kuro.statusOpt;
		let mayuri = tsuchi > 0 ? "insane" : "normal";
		if (mayuri == "insane") {
 			this.giveStatus = this.statusOpt[1];
 			return false;
		}
		else {
			this.giveStatus = this.statusOpt[0];
			attackName += " Self-boost";
			return true;
		};
	};
};

//Listing unleashes

const afterImage = new Unleash ({
	name: "Afterimage",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

const bejeweledSky = new Unleash ({
	name: "Bejeweled Sky",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 3.5,
	giveStatus: false,
});

const blindingBarrage = new Unleash ({
	name: "Blinding Barrage",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 1.5,
	giveStatus: false,
});

const cascadingPain = new Unleash ({
	name: "Cascading Pain",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 3.5,
	giveStatus: false,
});

const brutality = new Unleash ({
	name: "Brutality",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

const calmingFury = new Unleash ({
	name: "Calming Fury",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 3.5,
	giveStatus: false,
});

const chaosCyclone = new Unleash ({
	name: "Chaos Cyclone",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 3,
	rank: 4.5,
	giveStatus: false,
});

const combatTheater = new Unleash ({
	name: "Combat Theater",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

const crushingWall = new Unleash ({
	name: "Crushing Wall",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 3.5,
	giveStatus: false,
});

const deathAngel = new Unleash ({
	name: "Death Angel",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 0,
	rank: 4.5,
	giveStatus: false,
});

export const Devoid = new Unleash ({
	name: "Devoid",
	power: 25,
	techType: 2,
	drain: 65,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 3,
	giveStatus: false,
});

const divineSymphony = new Unleash ({
	name: "Divine Symphony",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 3.5,
	giveStatus: false,
});

const finalGambit = new Unleash ({
	name: "Final Gambit",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

const focusPower = new Unleash ({
	name: "Focus Power",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 3.5,
	giveStatus: false,
});

const frenziedHunt = new Unleash ({
	name: "Frenzied Hunt",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 3.5,
	giveStatus: false,
});

const greatWall = new Unleash ({
	name: "The Great Wall",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 1.5,
	giveStatus: false,
});

const harvestMoon = new Unleash ({
	name: "Harvest Moon",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 1.5,
	giveStatus: false,
});

const heavenPiercer = new Unleash ({
	name: "Heaven-piercer",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

const hellParade = new Unleash ({
	name: "Hell Parade",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 3,
	rank: 4.5,
	giveStatus: false,
});

const hydrasLegend = new Unleash ({
	name: "Hydra's Legend",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 1,
	rank: 4.5,
	giveStatus: false,
});

export const innerSanctum = new Unleash ({
	name: "Inner Sanctum",
	power: 25,
	techType: 2,
	drain: 65,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 3,
	giveStatus: false,
});

const ironDemise = new Unleash ({
	name: "Iron Demise",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

const knuckleHead = new Unleash ({
	name: "Knuckle Head",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 1.5,
	giveStatus: false,
});

const mesmerize = new Unleash ({
	name: "Mesmerize",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 3.5,
	giveStatus: false,
});

const mistyDelusion = new Unleash ({
	name: "Misty Delusion",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 1.5,
	giveStatus: false,
});

const piercingBlow = new Unleash ({
	name: "Piercing Blow",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 1.5,
	giveStatus: false,
});

const precisionStrike = new Unleash ({
	name: "Precision Strike",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 3.5,
	giveStatus: false,
});

const primalViolence = new Unleash ({
	name: "Primal Violence",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

const reapersGlare = new Unleash ({
	name: "Reaper's Glare",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 3.5,
	giveStatus: false,
});

const rustedGlory = new Unleash ({
	name: "Rusted Glory",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

const somberCemetary = new Unleash ({
	name: "Somber Cemetary",
	power: 87,
	techType: 2,
	drain: 120,
	comboOutput: 3, 
	comboKey: null,
	targetRegion: 3,
	rank: 4.5,
	giveStatus: false,
});

const stealthStrike = new Unleash ({
	name: "Stealth Strike",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

const suppression = new Unleash ({
	name: "Suppression",
	power: 31,
	techType: 2,
	drain: 40,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

const surgicalStrike = new Unleash ({
	name: "Surgical Strike",
	power: 63,
	techType: 2,
	drain: 80,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 3.5,
	giveStatus: false,
});

const warpedChasm = new Unleash ({
	name: "Warped Chasm",
	power: 63,
	techType: 2,
	drain: 120,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 3.5,
	giveStatus: false,
});


let axeUnleashMoves = Array.of( brutality, surgicalStrike, ironDemise);
let bladeUnleashMoves = Array.of( rustedGlory, divineSymphony, heavenPiercer );
let bowUnleashMoves = Array.of( stealthStrike, mesmerize, deathAngel );
let daggerUnleashMoves = Array.of( piercingBlow, precisionStrike, afterImage );
let fistUnleashMoves = Array.of( knuckleHead, focusPower, finalGambit ); //Will this be a thing?
let maceUnleashMoves = Array.of( suppression, calmingFury, primalViolence );
let scytheUnleashMoves = Array.of( harvestMoon, somberCemetary, reapersGlare );
let shieldUnleashMoves = Array.of( greatWall, crushingWall, warpedChasm );
let shurikenUnleashMoves = Array.of( blindingBarrage, bejeweledSky, hellParade );
let spearUnleashMoves = Array.of( combatTheater, frenziedHunt, chaosCyclone );
let tridentUnleashMoves = Array.of( mistyDelusion, cascadingPain, hydrasLegend );

export let weaponUnleashMoves = [
	axeUnleashMoves, //0
	bladeUnleashMoves, //1
	bowUnleashMoves, //2
	daggerUnleashMoves, //3
	fistUnleashMoves, //4
	maceUnleashMoves, //5
	scytheUnleashMoves, //6
	shieldUnleashMoves, //7
	shurikenUnleashMoves, //8
	spearUnleashMoves, //9
	tridentUnleashMoves, //10
];