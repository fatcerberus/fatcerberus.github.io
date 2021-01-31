//Creating Statuses class

import { from, Query, Random } from '/lib/sphere-runtime.js';
import { sortOut, waitItOut } from './functions.js';

export class Status
{
	constructor(clause) {
		this.name = clause.name;
		this.potency = clause.potency; //chances of being afflicted
		this.statusType = clause.statusType; //0 is negative, 1 is positive
		this.turnCount = clause.turnCount; //how long it impacts the battler
	};
	
	enact(vic, num, stage) { //Add a check for vic == Aggressor to handle statuses that should only count down on active turns
		switch(this.name) {

			case "Ablaze":
				if (stage == 1) {
					for (let j = 0; j < vic.armor.length; j++) {
						vic.armor[j] -= vic.armorDefault[j] / 2;
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Asphyxiation":
				if (stage == 1) {
					vic.alteredState[num][1] -= 1;;
					if (vic.alteredState[num][1] == 0) {
						vic.harm(null, vic, vic.health - 1);
					};
				};
			break;
			case "Baffled":
				if (stage == 1) {
					if (vic.alteredState.length > 1) {
						for (let i = 0; i < vic.alteredState.length; i++) {
							if (vic.alteredState[i][0] != Baffled) {
								vic.alteredState[i][1] = Math.ceil(Math.random() * 5)
							};
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Bedeviled":
				if (stage == 1) {
					if (!vic.HUD.includes("ailment")) {
						vic.HUD.push("ailment");
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Bestial":
				if (stage == 2) {
					if (vic == Aggressor) {
						let chomp = Math.ceil(damage * .01);
						for (let nom = 0; nom < vic.berserkSuit.length; nom++) {
							if (vic.berserkSuit[nom] != null) {
								vic.berserkSuit[nom].vim += chomp;
							};
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Bottle":
				if (stage == 1) {
					vic.healDelay = 1 / vic.alteredState[num][1];
					vic.heal(0);
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Chaos":
				if (stage == 2) {
					if ((vic == Aggressor) && (!vic.moveChoice.selfAim)) {
						vic.setVictim(Random.discrete(0, battlerList.length - 1));
						vic.dmgMath(true);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Comatose":
				if (stage == 1) {
					if (vic == Aggressor) {
						//vic.pendingAction.push(sortOut(false, Aggressor, Dummy, battlerList));
					};
					//vic.alteredState[num][1] -= 1;
				};
			break;
			case "Crystalize":
				 if (stage == 1) {
					if (vic.weaponCurrent.isLocked == false) {
						vic.weaponCurrent.isLocked = true;
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Death":
				if (stage == 1 || stage == 2) {
					memo = "You broke it"
					vic.vigor -= 1;
				};
			break;
			case "Deftness":
				if (stage == 1) {
					if (vic.weaponCurrent.name == "Fists" && vic.weapon.length > 0) {
						vic.swapWeapon(0);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Demon":
				if (stage == 1) {
					/*let z = vic.movePool.includes(Occultist.moves[0]) ? true : false;
					if (!z) {
						vic.movePool.push(...Occultist.moves);
					};*/
					vic.movePower *= 1.02;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Distorted":
				if (stage == 2) {
					if (vic == Aggressor) {
						let gen = isNaN(damage) ? 1 : Math.max(1, Math.round(damage / 5));
						damage = gen;
						healOrHarm = 1; //Heals instead of harming
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Enslaved":
				if (stage == 2) {
					if (vic.slaveOf == null) {
						let whip = from(battlerList)
							.where(it => it.name = vic.lastAttacker)
							.toArray();
						if (whip.length > 0) {
							vic.slaveOf = whip[0];
						}
						else {
							let fetter = from(battlerList)
								.where(it => it.isProtag != vic.isProtag)
								.toArray();
							vic.slaveOf = fetter[0];
						};
					};
					if (vic == Aggressor) {
						vic.target = vic.slaveOf.deathFlag != true && vic.slaveOf.target != null ? vic.slaveOf.target : vic.slaveOf;
						vic.dmgMath(true);
					}
					else if (vic.slaveOf.deathFlag) {
						//vic.slaveOf = null;
						//vic.alteredState[num].redact(vic);
						//vic.alteredState.splice(num, 1);
						vic.alteredState[num][1] = 1;
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Excel":
				if (stage == 1) {
					vic.modifyRank = -.1;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Faltering":
				if (stage == 1) {
					vic.movePool = from(vic.movePool)
						.where(it => it.rank > 2)
						.toArray();
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Fearless":
				if (stage == 2) {
					if ((vic == Aggressor) && (vic.moveChoice.comboOutput == 2)) {
						damage = Math.ceil(damage * 1.2);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Float":
				if (stage == 1) {
					vic.alteredState[num][1] -= 1;
				}
				else if (stage == 2) {
					if (vic == Aggressor) {
						damage = Math.ceil(damage * 1.1);
						attackName += " Critical!";
					};
				};
			break;
			case "Gambit":
				if (stage == 1) {
					let a = Math.round(vic.vigor * .02);
					let b = a * 7;
					vic.vigor -= a;
					vic.heal(b);
					vic.alteredState[num][1] -= 1;
				};
			break
			case "Glide":
				if (stage == 2) {
					vic.countdown -= 77 + vic.level;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Honed":
				if (stage == 2) {
					vic.boostWeapon *= 1.02;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Humiliation":
				if (stage == 1) {
					vic.boostWeapon *= .99;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Immune":
				if (stage == 1) { //Clean the slate
					for (let j = 0; j < vic.alteredState.length - 1; j++) {
						if (!vic.alteredState[j][0] === Immune) {
							vic.alteredState[j][0].redact(vic);
							vic.alteredState.splice(j, 1);
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Insidious": 
				if (stage == 1) {
					vic.movePower = 1;
					damage = vic.healthMax * .005;
					vic.harm(null, vic, damage)
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Jolt":
				if (stage == 2) {
					if (vic == Aggressor.target && vic != Aggressor) {
						if (Aggressor.moveChoice.comboOutput !== 1 && !isNaN(damage)) {
							//Aggressor.harm(vic, Aggressor, Math.ceil(damage * .01));
							//vic.wound();
							let q = function check(p) {
								let t = p == 1 ? true : false;
								if (t) {
									attackName += "\nJolt recoil";
								};
								return t;
							}
							let store = Array.of(Aggressor.harm, [vic, Aggressor, Math.ceil(damage * .01)], q)
							if (!vic.pendingAction.includes(store)) {
								vic.pendingAction.push(store);
							};
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Kickback":
				if (stage == 1) {
					if (vic == Aggressor && vic != vic.target) {
						let gain = Math.ceil(0, (damage * .05));
						vic.heal(gain);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Leech":
				if (stage == 1) {
					let gain = vic.healthMax * .005
					//let pain = gain * (battlerList.length - 1);
					for (let i = 0; i < battlerList.length - 1; i++) {
						if (battlerList[i] != vic) {
							vic.harm(battlerList[i], vic, gain);
							//battlerList[i].wound();
							battlerList[i].heal(gain);
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Maimed":
				if (stage == 1) {
					if (vic.health > vic.healthMax * .11) {
						vic.alteredState[num][1] = 0;
					}
					else {
						vic.movePower = vic.defaultMovePower * .9;
					};
				};
			break;
			case "Morphine":
				if (stage == 1) {
					let n = vic.healthMax * .0183;
					vic.heal(n);
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Necromancy":
				if (stage == 1) {
					let tomb = from(bodyList)
						.where(it => it.deathFlag == true)
						.where(it => it.isProtag == vic.isProtag)
						.where(it => it.vigor > 0)
						.toArray();
					if (tomb.length > 0) {
						let gh = Random.sample(tomb);
						//gh.autoBattler(false);
						let q = function proceed() {
							let t = gh.deathFlag == true ? true : false;
							if (t) {
								attackName += "\nNecromancy summon";
							};
							return t;
						};
						let nz;
						if (vic.target == null) {
							nz = from(battlerList)
							.where(it => it.isProtag != vic.isProtag)
							.toArray()
							vic.target = nz.length > 0 ? nz[0] : vic;
						};
						vic.target.shellAssess(gh.defaultMove.targetRegion);
						gh.moveChoice = gh.defaultMove;
						gh.setVictim(battlerList.indexOf(vic.target));
						gh.dmgMath(true);
						let grave = damage;
						let store = Array.of(gh.harm, [gh, vic.target, grave], q);
						if (!gh.pendingAction.includes(store)) {
							gh.pendingAction.push(store);
						};
					};
				vic.alteredState[num][1] -= 1;
				};
			break;
			case "Nullified":
				if (stage == 2) {
					if (vic == Aggressor.target) {
						if (Aggressor.moveChoice.techType == 1) {
							effectChance = 1;
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Manic":
				if (vic == Aggressor) {
					if (stage == 2) {
						if (isNaN(damage)) {
							damage = Math.ceil(damage * .75);
						};
						vic.alteredState[num][1] -= 1;
					}
					else if (stage == 1) {
						if (isNaN(damage)) {
							let wham = Math.ceil(damage / .75);
							vic.harm(null, vic, wham);
						};
						//vic.wound();
					};
				};
			break;
			case "Paranoid":
				if (stage == 2) {
					if (vic.friendlyFire) {
						damage = Math.ceil(damage * 1.1);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Patience":
				if (stage == 1) {
					let x = function slow() {
						timeBump += 411; //Add ~7 seconds to timer
					};
					let q = function check() {
						let t = vic == Aggressor ? true : false;
						return t;
					};
					let store = Array.of(x, [ ], q);
					if (vic == Aggressor && !vic.pendingAction.includes(store)) {
						vic.pendingAction.push(store);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Prescience":
				if (stage == 1) {
					if (!vic.HUD.includes("predict")) {
						vic.HUD.push("predict");
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Resilient":
				if (stage == 1) {
					vic.alteredState[num][1] -= 1;
				}
				else if (stage == 3) {
					let z = vic.health;
					vic.health = Math.max(z, 1); //Do a Math.max in case deathFlag went because of something unrelated to HP loss
					vic.deathFlag = false;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Respawn":
				if (stage == 1) {
					vic.vigor += 1;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Rust":
				if (stage == 2) {
					if (vic.weaponCurrent.brakeJob === undefined) {
						vic.weaponCurrent.brakeJob = .01;
					}
					else {
					vic.weaponCurrent.brakeJob += .01
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Shrapnel":
				if (stage == 1) {
					damage = vic.healthMax * .01;
					vic.harm(null, vic, damage);
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Snakebit":
				if (stage == 2) {
					if (vic == Aggressor && vic.moveChoice.techType == 0) {
						vic.setVictim();
						vic.dmgMath(true);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Soul Link":
				if (stage == 1) {
					if (vic.health <= 0) {
						if (Math.round(vic.vigor / 10) >= 1) {
							vic.vigor -= 10;
							vic.deathFlag = false;
						};
					}
					else {
						vic.deathFlag = false;
						vic.alteredState.splice(num, 1);
					};
				};
			break;
			case "Tagged":
				if (stage == 2) {
					if (vic != Aggressor) {
						Aggressor.setVictim(battlerList.indexOf(vic));
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Triggered":
				if (stage == 1) {
					vic.movePower *= 1.07;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Unaware":
				if (stage == 1) {
					if (!vic.HUD.includes("status")) {
						vic.HUD.push("status");
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Unyielding":
				if (stage == 2) {
					if (vic == Aggressor.target) {
						resistance = resistance * (1 + (vic.alteredState[num][1] / 100));
					};
				vic.alteredState[num][1] -= 1;
				};
			break;
			case "Vanilla":
				if (stage == 1) {
					if (vic.persona.ability.name != "Manipulation") {
						vic.boostWeapon = 1;
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Vortex":
				if (stage == 1) {
					for (let cay = 0; cay < vic.berserkSuit.length; cay++) {
						if (vic.berserkSuit[cay] != null) {
							vic.berserkSuit[cay].vim -= 1;
						};
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Wary":
				if (stage ==2) {
					if (vic == Aggressor.target) {
						damage *= .94;
					};
				vic.alteredState[num][1] -= 1;
				};
			break;
			case "Worried":
				if (stage == 2) {
					vic.countdown += 100 - vic.level;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Wunderlust":
				if (stage = 2) {
					if (vic == Aggressor.target) {
						vic.unleashMeter += Math.max(0, Math.trunc(damage * .005));
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Zen":
				if (stage == 1) {
					vic.unleashMeter += 1;
					vic.alteredState[num][1] -= 1;
				};
			break;
			case "Aim lock":
				if (stage == 2) {
					if (vic == Aggressor.target) {
						let bulb = from (vic.armor)
							.where(it => isInteger(it))
							.ascending(it => it)
							.toArray();
						let bloom = vic.armor.indexOf(bulb[0]);
						Aggressor.target.shellAssess(bloom);
						Aggressor.dmgMath(lettuce);
					};
					vic.alteredState[num][1] -= 1;
				};
			break;
		};
	};
	
	redact(vic) {

		let x;
		switch(this.name) {
		
		case "Ablaze":
			for (let j = 0; j < vic.armor.length; j++) {
				vic.armor[j] += vic.armorDefault[j] * 2;
			};
		break;
		case "Asphyxiation":
		break;
		case "Baffled":
		break;
		case "Bedeviled":
			x = vic.HUD.indexOf("ailment");
			vic.HUD.splice(x, 1);
		break;
		case "Bottle":
			vic.heal(vic.healQueue);
		break;
		case "Chaos":
		break;
		case "Comatose":
			vic.countdown = ((2 * 100) / vic.persona.defDeterminant);
		break;
		case "Crystalize": //If cursed weapons become a thing, will have to edit this code
			vic.weaponCurrent.isLocked = false;
		break;
		case "Death":
		break;
		case "Demon":
			vic.capabilityCheck();
		break;
		case "Distorted":
		break;
		case "Enslaved":
			vic.slaveOf = null;
		break;
		case "Excel":
			vic.modifyRank += .5;
		break;
		case "Faltering":
			vic.capabilityCheck();
		break;
		case "Fearless":
		break;
		case "Float":
			vic.harm(null, vic, vic.healthMax * .025);
		break;
		case "Humiliation":
		break;
		case "Honed":
		break;
		case "Insidious": 
			vic.movePower = vic.defaultMovePower;
		break;
		case "Kickback":
		break;
		case "Leech":
		break;
		case "Maimed":
			vic.movePower = vic.defaultMovePower;
		break;
		case "Paranoid":
		break;
		case "Patience":
		break;
		case "Prescience":
			x = vic.HUD.indexOf("predict");
			vic.HUD.splice(x, 1);
		break
		case "Resilient":
			//deathCheck(battlerList);
		break;
		case "Rust":
			vic.weaponCurrent.brakeJob = 0;
		break;
		case "Shrapnel":
		break;
		case "Snakebit":
		break;
		case "Soul Link":
		break;
		case "Tagged":
		break;
		case "Triggered":
			vic.movePower = vic.defaultMovePower;
		break;
		case "Unaware":
			x = vic.HUD.indexOf("status");
			vic.HUD.splice(x, 1);
		break;
		case "Vanilla":
		break;
		case "Wary":
		break;
		case "Worried":
		break;
		case "Wunderlust":
		break;
		case "Zen":
		break;
		case "Aim lock":
		break;
		};
	};
		
};

// Negative Statuses

const Ablaze = new Status({ //Armor effectiveness halved
	name: "Ablaze",
	potency: .9,
	statusType: 0,
	turnCount: 2,
});

const Asphyxiation = new Status({ //7 turns to critical if not cured
	name: "Asphyxiation",
	potency: .5,
	statusType: 0,
	turnCount: 7,
});

const Baffled = new Status({ //Randomizes turnCount for statuses
	name: "Baffled",
	potency: .5,
	statusType: 0,
	turnCount: 3,
});

const Bedeviled = new Status({ //Cannot see Ailments menu
	name: "Bedeviled",
	potency: .8,
	statusType: 0,
	turnCount: 4,
});

const Bestial = new Status({ //1% (subject to increase) of damage (given) is converted to vim for comrade armor
	name: "Bestial",
	potency: .35,
	statusType: 1,
	turnCount: 6,
});

const Bottleneck = new Status({ //Causes healing items to take effect gradually instead of all at once
	name: "Bottle",
	potency: .65,
	statusType: 0,
	turnCount: 4,
})

const Chaos = new Status({ //Target is randomized
	name: "Chaos",
	potency: .6,
	statusType: 0,
	turnCount: 3,
})

const Comatose = new Status({ //Incapacitated until status is cured (via item or turn countdown)
	name: "Comatose",
	potency: .45,
	statusType: 0,
	turnCount: Infinity,
})

const Crystalize = new Status({ //Can't switch weapon
	name: "Crystalize",
	potency: .65,
	statusType: 0,
	turnCount: 2,
})

const Death = new Status({ //Battler is dead
	name: "Death",
	potency: 1,
	statusType: 0,
	turnCount: Infinity,
})

const Deftness = new Status({ //Automatically switches to next weapon if weapon breaks or is stolen. May prevent theft
	name: "Deftness",
	potency: .85,
	statusType: 1,
	turnCount: 4,
})

const Demon = new Status({ //Releases inner demon, gaining alchemy powers and upping dmg output
	name: "Demon",
	potency: .6,
	statusType: 1,
	turnCount: 5,
})

const Distorted = new Status({ //Attacks return health to target (1/5 of normal output?)
	name: "Distorted",
	potency: .75,
	statusType: 0,
	turnCount: 2,
});

const Enslaved = new Status({ //Inflicter picks target -- attacks lastTarget of Master
	name: "Enslaved",
	potency: .7,
	statusType: 0,
	turnCount: 3,
});

const Excel = new Status({ //Reduces move rank by .5
	name: "Excel",
	potency: .65,
	statusType: 1,
	turnCount: 5,
});

const Faltering = new Status({ //No moves below rank 2 (2.5?) can be used
	name: "Faltering",
	potency: .45,
	statusType: 0,
	turnCount: 4,
});

const Fearless = new Status({ //Melee damage increased by 15%
	name: "Fearless",
	potency: .7,
	statusType: 1,
	turnCount: 5,
});

const Float = new Status({ //Headshot bonus adds 20% to damage, but then battler loses HP upon falling back to the ground
	name: "Float",
	potency: .6,
	statusType: 1,
	turnCount: 3,
});

const Gambit = new Status({ //Converts 2% of vigor into HP each turn (at a ratio of 1VP = 7HP)
	name: "Gambit",
	potency: .4,
	statusType: 1,
	turnCount: 3,
});

const Glide = new Status({ //Reduce countdown timer by 50 each turn
	name: "Glide",
	potency: .95,
	statusType: 1,
	turnCount: 6,
});

const Humiliation = new Status({ //Missing causes weapon power drop for 3 turns
	name: "Humiliation",
	potency: 1,
	statusType: 0,
	turnCount: 3,
});

const Honed = new Status({ //Grants a 2% weapon boost
	name: "Honed",
	potency: .85,
	statusType: 1,
	turnCount: 6,
});

const Immune = new Status({ //The immunity berry!
	name: "Immune",
	potency: .75,
	statusType: 1,
	turnCount: 2,
});

const Insidious = new Status({ //Weakens attacks and saps minimal HP -- item only
	name: "Insidious",
	potency: .9,
	statusType: 0,
	turnCount: 6,
});

const Jolt = new Status({ //If melee attacked, attacker takes static charge damage
	name: "Jolt",
	potency: .8,
	statusType: 1,
	turnCount: 3,
});

const Kickback = new Status({ //Gains 5%(?) of damage done back as HP
	name: "Kickback",
	potency: .85,
	statusType: 1,
	turnCount: 4,
});

const Leech = new Status({ //.5% of maxHP is given to each other battler -- item only
	name: "Leech",
	potency: .65,
	statusType: 0,
	turnCount: 4,
});

const Maimed = new Status({ //Damage output reduced considerably owing to low health (Endurance offsets this status)
	name: "Maimed",
	potency: .01,
	statusType: 0,
	turnCount: Infinity,
});

const Manic = new Status ({ //If Stress meter is higher than 75%, 1/4 damage to user, 3/4 to target
	name: "Manic",
	potency: 1,
	statusType: 0,
	turnCount: Infinity,
});

const Morphine = new Status({ //A ReGen mimic -- item or magic only
	name: "Moprhine",
	potency: .85,
	statusType: 1,
	turnCount: 5,
});

const Necromancy = new Status({ //Summon a dead ally to wreak vengeance
	name: "Necromancy",
	potency: .5,
	statusType: 1,
	turnCount: 3,
});

const Nullified = new Status({ //* Battle item effects are nullified
	name: "Nullified",
	potency: .55,
	statusType: 1,
	turnCount: 3,
});

const Paranoid = new Status ({ //Takes 1.1x friendly fire damage
	name: "Paranoid",
	potency: .55,
	statusType: 0,
	turnCount: 4,
});

const Patience = new Status({ //Increase the turn timer by ~20 seconds -- item only
	name: "Patience",
	potency: .8,
	statusType: 1,
	turnCount: 5,
});

const Prescience = new Status ({ //Nixes target's next retal move
	name: "Prescience",
	potency: .4,
	statusType: 1,
	turnCount: 1,
});

const Resilient = new Status ({ //Can't fall below 1HP -- item only
	name: "Resilient",
	potency: .35,
	statusType: 1,
	turnCount: 2,
});

const Respawn = new Status ({ //Recover 1 vigor every turn
	name: "Respawn",
	potency: .6,
	statusType: 1,
	turnCount: 4,
});

const Rust = new Status({ //Weapons become more fragile -- item only
	name: "Rust",
	potency: .7,
	statusType: 0,
	turnCount: 5,
});

const Shrapnel = new Status({ //Classic per-turn damage, curable with magic -- usually caused by weapon break
	name: "Shrapnel",
	potency: .7,
	statusType: 0,
	turnCount: 3,
});

const Snakebit = new Status({ //Weapon self-harms until switched -- item only
	name: "Snakebit",
	potency: .8,
	statusType: 0,
	turnCount: 4,
});

const soulLink = new Status({ //Can keep fighting as long as vigor isn't expended
	name: "Soul Link",
	potency: .2,
	statusType: 1,
	turnCount: Infinity,
});

const Tagged = new Status({ // All (enemy?) moves hit this battler. Supersedes Snakebit? //I thought this was supposed to be a Sadist thing?
	name: "Tagged",
	potency:  .25,
	statusType: 0,
	turnCount: 3,
});

const Triggered = new Status({ // Comrade-endowed boost
	name: "Triggered",
	potency:  1,
	statusType: 1,
	turnCount: 4,
});

const Unaware = new Status({ //Can't see Status menu
	name: "Unaware",
	potency: .5,
	statusType: 0,
	turnCount: 2,
});

const Unyielding = new Status({ //8% defense boost that shrinks 1% each turn
	name: "Unyielding",
	potency: .95,
	statusType: 1,
	turnCount: 7,
});

const Vortex = new Status({ //Reduces armor vim by 1 each turn
	name: "Vortex",
	potency: .3,
	statusType: 0,
	turnCount: 4,
});

const Vanilla = new Status ({ //No weapons boosts //Abilities take preference over statuses
	name: "Vanilla",
	potency: .8,
	statusType: 0,
	turnCount: 2,
});

const Wary = new Status ({ //reduces damage take by 11% for 4 turns
	name: "Wary",
	potency: .85,
	statusType: 1,
	turnCount: 4,
});

const Worried = new Status ({ //Adds .5 to rank?? OR instantly add to countdown timer
	name: "Worried",
	potency: .7,
	statusType: 0,
	turnCount: 3,
});

const Wunderlust = new Status ({ //Increases unleash meter if damaged
	name: "Wunderlust",
	potency: .6,
	statusType: 1,
	turnCount: 6,
});

const Zen = new Status ({ //Accelerates unleash creep by 1% each turn
	name: "Zen",
	potency: .75,
	statusType: 1,
	turnCount: 4,
});

const Zonelock = new Status ({ //All incoming attacks hit the most protected region of the body
	name: "Aim lock",
	potency: .90,
	statusType: 1,
	turnCount: 3,
});


export const statusList = [
	Ablaze, //0 - Persona/Unleash only?
	Asphyxiation, //1 - I/U only
	Baffled, //2
	Bedeviled, //3
	Bestial, //4
	Bottleneck, //5
	Chaos, //6
	Comatose, //7
	Crystalize, //8 - I/U only
	Death, //9
	Deftness, //10
	Demon, //11 - I/U only
	Distorted, //12
	Enslaved, //13 - I/U only
	Excel, //14
	Faltering, //15
	Fearless, //16
	Float, //17
	Gambit, //18
	Glide, //19
	Humiliation, //20
	Honed, //21 - I/U only
	Immune, //22 - I/U only
	Insidious, //23
	Jolt, //24
	Kickback, //25 - I/U only
	Leech, //26 - I/U only
	Maimed, //27
	Manic, //28
	Morphine, //29 - I/U only
	Necromancy, //30 - I/U only
	Nullified, //31
	Paranoid, //32
	Patience, //33 - I/U only
	Prescience, //34 - I/U only
	Resilient, //35 - I/U only
	Respawn, //36
	Rust, //37
	Shrapnel, //38
	Snakebit, //39
	soulLink, //40 - Berserker only
	Tagged, //41
	Triggered, //42 - Comrade only
	Unaware, //43 - I/U only
	Unyielding, //44 - I/U only
	Vanilla, //45
	Vortex, //46
	Wary, //47 - I/U only
	Worried, //48
	Wunderlust, //49
	Zen, //50 - I/U only
	Zonelock, //51
];

/* Loss: Cannot use magic or alchemy
* Seal: Can't unleash/unleashes have no secondary effects
* Amplify: Bide-type status that returns damage two-fold
* Scope: Increase accuracy
* Shatter: Increase OHKO odds?
* Bleeding?
* Damage share?
*/