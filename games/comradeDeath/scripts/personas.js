//Creating the Personas class

import { from, Random } from '/lib/sphere-runtime.js';
import { classMoves, generalMoves } from './movepools.js';
import { Devoid, innerSanctum } from './unleashes.js';


export class Persona
{
	constructor(mindset) {
		this.name = mindset.name;
		this.moves = mindset.moves; //The custom movepool for that battle class
		this.unleashMoves = mindset.unleashMoves; //The moves unlocked at Lv. 45
		this.atkDeterminant = mindset.atkDeterminant; //Basically a stat booster
		this.defDeterminant = mindset.defDeterminant; //Secondary stat
		this.ability = mindset.ability; //Unique class ability that impacts battle
		this.prefStyle = mindset.prefStyle; //Preferred style of fighting, melee or finesse
		this.prefWeapon = mindset.prefWeapon; //Preferred class of weapon
		this.permittedComrades = mindset.permittedComrades; //How many battle assistants they can horde
		this.painThreshold = mindset.painThreshold; //When they are inclined to heal
		this.stratPref = mindset.stratPref; //AI tendencies //[ attack, battleItem, healItem, comrade, unleash ]
		this.statusOpt = mindset.statusOpt; //Array with one positive and one negative status
		this.battleSprite = mindset.battleSprite;
	};
	
	activate(atk, doer) {
		
		switch(this.ability) {
			
			case "Aura": //All battlers take less damage
				resistance *= 1.1;
			break;
			case "Cannibalism": //Gains health if attacks an ally
				if (atk == doer) {
					if (atk.target.friendlyFire) {
						atk.heal(atk.healthMax * .01)
					};
				};
			break;
			case "Conceal": //Hides the damage display when critically low on health
				output = doer != atk && /*doer !== atk.hasAlly &&*/ atk.health <= atk.persona.painThreshold ? 0 : 1;
			break;
			case "Downfall": //Reduces ally's max HP
				if (atk.abilityUsed == false && atk.hasAlly !== false) {
					bodyList[atk.hasAlly].healthMax *= .99;
					atk.abilityUsed = true;
				};
			break;
			case "Duplicate": //Clone an attacker's comrade -- Or recycle a comrade?
				if (atk == doer.target && atk.abilityUsed === false && atk != doer) {
					let fei = Random.sample(doer.comrades);
					if (atk.buddyUp(fei)) {
						atk.abilityUsed = true;
					};
				};
			break;
			case "Emptyness": //Convert secondary effects to power
				if (atk == doer && atk.moveChoice.giveStatus != null) {
					damage *= 1.15;
					effectChance = 1;
				};
			break;
			case "Ethereal": //Reduces projectile damage
				if (doer.target == atk && atk != doer) {
					if (doer.moveChoice.comboOutput == 1) {
						damage *= .95;
					};
				};
			break;
			case "Grudge": //Endows an ally with Necromancy
				if (atk.deathFlag && !atk.abilityUsed && atk.hasAlly !== false) {
					bodyList[atk.hasAlly].addStatus(30);
					atk.abilityUsed = true;
				};
			break;
			case "Harass": //Does more damage to a statused foe
				if (atk == doer && atk.target.alteredState.length > 0) {
					damage *= 1.035;
				};
			break;
			case "Inevitability": //Can't stress out
				atk.stressMeter = 0;
			break;
			case "Manipulation": //Always gets a weapon boost
				if (atk == doer) {
					atk.boostWeapon = Math.max(atk.boostWeapon, 1.35);
					atk.dmgMath(true);
				};
			break;
			case "Mercy": //Takes a share of ally's damage
				let z = atk.friendHit(atk, doer.target)
				if (z && atk != doer && atk.hasAlly !== false && !isNaN(damage)) {
					let a = Math.trunc(damage * .05);
					damage -= a;
					atk.harm(doer, atk, a);
				};
			break;
			case "Precision": //Increases likelihood of secondary effects
				if (atk == doer && atk.moveChoice.giveStatus != null) {
					effectChance -= .2;
				};
			break;
			case "Revelry": //Healing is never partial
				atk.healDelay = 1;
			break;
			case "Reversion": //Can use moves of an alternate persona
				let gate = from(masterList)
					.where(it => it.agent == atk)
					.toArray();
				if (gate.length > 0 && gate[0].persona.length > 1) {
					atk.movePool.push(...gate[0].persona[1].moves);
					atk.capabilityCheck();
				};
			break;
			case "Shadow": //Hide in the shadows to reduce damage taken
				if (doer.target == atk && atk != doer && doer.moveChoice.comboOutput == 2) {
					damage *= .95;
				};
			break;
			case "Victimize": //Pick a target and get a follow-up shot on them every time they're targeted
				if (atk.turnNo == 0 && atk == doer) {
					atk.abilityUsed = atk.target;
				}
				else if (atk.abilityUsed == doer.target && atk != doer && !isNaN(damage)) {
					doer.target.harm(atk, doer, damage * .0033);
				};
			break;
		};
	};
	
	classify() {
		
		for (let j = 0; j < personaList.length; j++) {
			personaList[j].moves = classMoves[j];
			personaList[j].unleashMoves = innerSanctum;
		};
	};

	scheme(ussr, list1) { //list1 is statusList
		
		ussr.bonusMath(false);
		let stalin = null; //return
		let lenin = ussr.boostWeapon > 1.025 ? 1 : ussr.boostWeapon == 1.025 ? 2 : 3;
		let soviet = ussr.health / ussr.healthMax;
		let red = [ ];
		let moscow = soviet <= this.painThreshold ? true : false;
		let trotsky = ussr.alteredState.length > 0 ? from(ussr.alteredState).where(it => it[0].statusType == 0).toArray() : false;
		let marx = [ false, false, false, false, false ]; //action options
		let cccp;
		let kulak = [ ];
		let ribbentrop = [ ussr.movePool, ussr.stash[0], ussr.stock[0], ussr.comrades, ussr.specialMoves ];
		let molotov = [ ];
		let sickle = [ ];
		let seige;
		let yuri;
		let andropov = false;
		let krushchyov = 0;
		let glasnost;
		let gorbachyov;
		
		
		if (((ussr.weaponCurrent.name == "Fists") || (ussr.statusSearch(39) !== false)) && ussr.weapon.length > 0) {
			molotov = from(ussr.weapon).groupBy(it => it.style == this.prefStyle)
			cccp = molotov.true != null ? ussr.weapon.indexOf(molotov.true[0]) : 0;
			molotov = [ ];
			molotov.push(...ussr.allCapabilities);
		};
		
		sickle[0] = ussr.movePool.length == 0 ? null : lenin === 1 ? true : false;
		if (ribbentrop[1].length > 0) {
			if (ussr.lastAction.length > 0) {
				yuri = ussr.lastAction.length > 3 ? 3 : ussr.lastAction.length;
				for (let rib = 0; rib < yuri; rib++) {
					if (ussr.lastAction[rib] != null) {
						if (ussr.lastAction[rib].giveStatus == true) {
							andropov = true;
						};
					};
				};
				if (!andropov) {
					kulak.length = 0;
					kulak = from(ussr.stash[0])
						.where(it => list1[it.giveStatus].statusType == 0)
						.toArray();
					kulak = kulak.length > 0 ? kulak: null;
				}
				sickle[1] = andropov;
			};
		}
		else {
			sickle[1] = null;
		};
		sickle[2] = ussr.stock.length == 0 || ussr.health / ussr.healthMax > .9 ? null : moscow ? true : false;
		sickle[3] = ussr.comrades.length == 0 || ussr.health / ussr.healthMax > .7 ? null : moscow ? true : false;
		if (ussr.unleashMeter >= 40) {
			red = from(ribbentrop[4])
				.where(it => it.drain <= ussr.unleashMeter)
				.toArray();
			if (red.length > 0) {
				ribbentrop[4] = red;
			};
			sickle[4] = red.length == 0 ? false : ussr.unleashMeter > 60 ? true : false;
		}
		else {
			sickle[4] = null;
		};
		sickle[5] = molotov.length > 0 ? true : null;
				
		
		switch(ussr.persona.name) {
							
			case "Absolved":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .68 : .37;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .57 : .29;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .31 : .08;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .24 : .20;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .89 : .54;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.battlerType != 1)
					//.descending(it => it.persona.name)
					.sample(1)
					.toArray();
			break;
			case "Ascetic":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .23 : .03;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .24 : .01;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .25 : .02;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .26 : .09;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .27 : .07;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it != ussr)
					.sample(1)
					.toArray();
			break;
			case "Coward":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .55 : .11;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .80 : .65;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .39 : .22;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .95 : .57;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .90 : .67;
				this.stratPref[5] = sickle[5] == null ? 0 : this.unleashMeter > 35 ? .05 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.battlerType != 1)
					//.descending(it => it.weaponCurrent.name)
					.sample(1)
					.toArray();
			break;
			case "Deceiver":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .35 : .22;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .51 : .30;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .70 : .33;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .67 : .55;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .95 : .40;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.lastAction.length > 0)
					.where(it => it.lastAction[0] != null)
					.where(it => it.lastAction[0].techType < 3)
					.ascending(it => it.name)
					.toArray();
			break;
			case "Diviner":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .83 : .35;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .75 : .60;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .50 : .45;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .62 : .40;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .87 : .19;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.ascending(it => it.countdown)
					.toArray();
			break;
			case "Empathist":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .45 : .21;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .18 : .05;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .95 : .61;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .99 : .75;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .51 : .21;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.descending(it => it.healthApprox)
					.toArray();
			break;
			case "Hunter":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .99 : .80;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .56 : .11;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .16 : .03;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .48 : .09;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .83 : .45;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.ascending(it => it.healthApprox)
					.toArray();
			break;
			case "Iconoclast":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .50 : .10;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .50 : .10;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .50 : .10;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .50 : .10;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .50 : .10;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.sample(1)
					.toArray();
			break;
			case "Jester":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .45 : .20;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .96 : .80;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .71 : .60;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .92 : .80;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .37 : .14;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.battlerType != 1)
					.where(it => it.weaponCurrent.power >= ussr.weaponCurrent.power)
					//.descending(it => it.name)
					.sample(1)
					.toArray();
			break;
			case "Masochist":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .65 : .30;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .28 : .07;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .18 : .01;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .43 : .06;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .65 : .31;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.target != null)
					.where(it => it.target != ussr)
					.ascending(it => it.name)
					.toArray();
			break;
			case "Nihilist":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .95 : .40;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .89 : .71;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .27 : .03;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .39 : .04;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .99 : .90;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.healthApprox <= ussr.healthApprox)
					//.ascending(it => it.name)
					.sample(1)
					.toArray();
			break;
			case "Nostalgic":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .99 : .70;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .22 : .11;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .73 : .22;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .71 : .37;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .35 : .40;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.descending(it => it.name)
					.sample(1)
					.toArray();
			break;
			case "Occultist":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .35 : .30;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .94 : .43;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .19 : .12;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .54 : .37;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .99 : .29;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.healthApprox <= ussr.healthApprox)
					//.ascending(it => it.name)
					.sample(1)
					.toArray();
			break;
			case "Renegade":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .87 : .45;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .31 : .14;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .23 : .07;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .62 : .12;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .59 : .31;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
			
				seige = from(battlerList)
					.where(it => it != ussr)
					.where(it => it.target != null)
					.where(it => it.target == ussr)
					//.ascending(it => it.name) //it.movePower
					.sample(1)
					.toArray();
			break;
			case "Sadist":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .97 : .63;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .41 : .09;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .12 : .03;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .54 : .28;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .81 : .43;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it != ussr)
					.ascending(it => it.healthApprox)
					.toArray();
			break;
			case "Schemer":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .91 : .22;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .83 : .17;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .87 : .25;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .95 : .22;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .93 : .11;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.descending(it => it.healthApprox)
					.toArray();
			break;
			case "Usurper":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .82 : .51;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .65 : .35;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .27 : .11;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .55 : .19;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .97 : .60;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.battlerType != 1)
					.ascending(it => it.comradesPast.length)
					.toArray();
			break;
			case "Vengeancer":
				this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .92 : .61;
				this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .17 : .02;
				this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .24 : .03;
				this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .67 : .18;
				this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .81 : .36;
				this.stratPref[5] = sickle[5] == null ? 0 : 1;
				
				seige = from(battlerList)
					.where(it => it.isProtag != ussr.isProtag)
					.where(it => it.target != null)
					.where(it => it.target.isProtag == ussr.isProtag)
					//.ascending(it => it.name)
					.sample(1)
					.toArray();
			break;
		};
		if (this.stratPref[5] != 0) {
			ribbentrop.push(...molotov);
		}
		else {
			this.stratPref.splice(5, 1);
		};
		while (stalin == null) {
			let purge = Math.random()
			stalin = this.stratPref[krushchyov] < purge ? null : ribbentrop[krushchyov].length > 0 ? ribbentrop[krushchyov] : null;
			krushchyov = krushchyov < this.stratPref.length - 1 ? krushchyov + 1 : 0;
		};
		glasnost = from(battlerList)
			.where(it => it.isProtag != ussr.isProtag)
			.ascending(it => it.name)
			.toArray();
		gorbachyov = seige.length == 0 || stalin[0].techType == 4 || stalin[0].techType == 5 ? glasnost[0] : seige[0];
		ussr.setVictim(battlerList.indexOf(gorbachyov));
		this.stratPref.length = 0;
		ussr.toRandomize = stalin == molotov ? cccp : null;
		if (stalin.length == 0) {
			stalin = allCapabilities;
			ussr.toRandomize = 1;
		};
		return stalin;
	};
};

//Designate the various Personas

export const Absolved = new Persona ({
	name: "Absolved",
	atkDeterminant: 1.07,
	defDeterminant: 1.04,
	ability: "Emptyness",
	prefStyle: 2,
	prefWeapon: [ "Spear", "Axe", "Trident", "Blade", "Dagger", "Shield", "Bow", "Mace", "Scythe", "Shuriken" ],
	permittedComrades: 6,
	painThreshold: .23,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/demonTemp.png'),
});

const Ascetic = new Persona ({
	name: "Ascetic",
	atkDeterminant: 1.01,
	defDeterminant: 1.07,
	ability: "Aura",
	preferredStyle: 2,
	prefWeapon: [ "Blade", "Shield", "Spear", "Bow", "Axe", "Dagger", "Trident", "Mace", "Shuriken", "Scythe", ],
	permittedComrades: 4,
	painThreshold: .29,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Coward = new Persona({
	name: "Coward",
	atkDeterminant: 1.02,
	defDeterminant: 1.05,
	ability: "Shadow",
	prefStyle: 2,
	prefWeapon: [ "Axe", "Mace", "Blade", "Scythe", "Dagger", "Shield", "Shuriken", "Spear", "Trident", "Bow" ],
	permittedComrades: 5,
	painThreshold: .31,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

const Deceiver = new Persona ({
	name: "Deceiver",
	atkDeterminant: 1.04,
	defDeterminant: 1.03,
	ability: "Conceal",
	prefStyle: 2,
	prefWeapon: [ "Shuriken", "Dagger", "Axe", "Shield", "Blade", "Bow", "Mace", "Scythe", "Spear", "Trident" ],
	permittedComrades: 7,
	painThreshold: .11,
	statusOpt: [36, 2], //Respawn/Baffled
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

const Diviner = new Persona ({
	name: "Diviner",
	atkDeterminant: 1.01,
	defDeterminant: 1.06,
	ability: "Precision",
	prefStyle: 2,
	prefWeapon: [ "Scythe", "Trident", "Bow", "Shield", "Blade", "Axe", "Dagger", "Mace", "Shuriken", "Spear" ],
	permittedComrades: 6,
	painThreshold: .25,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

const Empathist = new Persona ({
	name: "Empathist",
	atkDeterminant: 1.02,
	defDeterminant: 1.06,
	ability: "Mercy",
	prefStyle: 1,
	prefWeapon: [ "Shield", "Spear", "Scythe", "Shuriken", "Dagger", "Bow", "Trident", "Axe", "Blade", "Mace" ],
	permittedComrades: 7,
	painThreshold: .11,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

export const emptyShell = new Persona ({
	name: "Iconoclast",
	moves: generalMoves,
	unleashMoves: Devoid,
	atkDeterminant: 1,
	defDeterminant: 1,
	ability: "Emptyness",
	prefStyle: null,
	prefWeapon: [ ],
	permittedComrades: 0,
	painThreshold: .01,
	statusOpt: [44, 6],
	stratPref: [ ],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});
	
const Hunter = new Persona ({
	name: "Hunter",
	atkDeterminant: 1.07,
	defDeterminant: 1.02,
	ability: "Cannibalism",
	prefStyle: 1,
	prefWeapon: [ "Spear", "Axe", "Bow", "Mace", "Scythe", "Blade", "Dagger", "Shield", "Shuriken", "Trident" ],
	permittedComrades: 4,
	painThreshold: .17,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

const Jester = new Persona ({
	name: "Jester",
	atkDeterminant: 1.05,
	defDeterminant: 1.03,
	ability: "Duplicate",
	prefStyle: 1,
	prefWeapon: [ "Mace", "Blade", "Spear", "Axe", "Bow", "Trident", "Dagger", "Scythe", "Shield", "Shuriken" ],
	permittedComrades: 7,
	painThreshold: .09,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/justSaiyan.png'),
});

const Masochist = new Persona ({
	name: "Masochist",
	atkDeterminant: 1.03,
	defDeterminant: 1.07,
	ability: "Revelry",
	prefStyle: 1,
	prefWeapon: [ "Bow", "Dagger", "Trident", "Mace", "Blade", "Axe", "Scythe", "Spear", "Shuriken", "Shield" ],
	permittedComrades: 5,
	painThreshold: .03,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Nihilist = new Persona ({
	name: "Nihilist",
	atkDeterminant: 1.04,
	defDeterminant: 1.04,
	ability: "Inevitability",
	prefStyle: 1,
	prefWeapon: [ "Trident", "Axe", "Scythe", "Shuriken", "Blade", "Dagger", "Bow", "Mace", "Shield", "Spear" ],
	permittedComrades: 4,
	painThreshold: .07,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Nostalgic = new Persona ({
	name: "Nostalgic",
	atkDeterminant: 1.04,
	defDeterminant: 1.05,
	ability: "Reversion",
	prefStyle: 2,
	prefWeapon: [ "Blade", "Mace", "Axe", "Spear", "Shield", "Bow", "Dagger", "Scythe", "Trident", "Shuriken" ],
	permittedComrades: 5,
	painThreshold: .23,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Occultist = new Persona ({
	name: "Occultist",
	atkDeterminant: 1.07,
	defDeterminant: 1.03,
	ability: "Ethereal",
	prefStyle: 2,
	prefWeapon: [ "Mace", "Shuriken", "Sycthe", "Trident", "Dagger", "Spear", "Axe", "Blade", "Bow", "Shield" ],
	permittedComrades: 6,
	painThreshold: .15,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Renegade = new Persona ({
	name: "Renegade",
	atkDeterminant: 1.04,
	defDeterminant: 1.05,
	ability: "Harass",
	prefStyle: 1,
	prefWeapon: [ "Mace", "Axe", "Blade", "Trident", "Scythe", "Bow", "Dagger", "Shield", "Shuriken", "Spear" ],
	permittedComrades: 4,
	painThreshold: .21,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Sadist = new Persona ({
	name: "Sadist",
	atkDeterminant: 1.06,
	defDeterminant: 1.04,
	ability: "Victimize",
	prefStyle: 2,
	prefWeapon: [ "Dagger", "Shuriken", "Mace", "Blade", "Spear", "Bow", "Axe", "Scythe", "Shield", "Trident" ],
	permittedComrades: 7,
	painThreshold: .13,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Schemer = new Persona ({
	name: "Schemer",
	atkDeterminant: 1.05,
	defDeterminant: 1.05,
	ability: "Manipulation",
	prefStyle: 2,
	prefWeapon: [ "Bow", "Scythe", "Dagger", "Trident", "Axe", "Blade", "Shuriken", "Mace", "Spear", "Shield" ],
	permittedComrades: 5,
	painThreshold: .19,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Usurper = new Persona ({
	name: "Usurper",
	atkDeterminant: 1.04,
	defDeterminant: 1.06,
	ability: "Downfall",
	prefStyle: 1,
	prefWeapon: [ "Axe", "Trident", "Blade", "Dagger", "Shield", "Bow", "Mace", "Scythe", "Shuriken", "Spear" ],
	permittedComrades: 4,
	painThreshold: .27,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

const Vengeancer = new Persona ({
	name: "Vengeancer",
	atkDeterminant: 1.06,
	defDeterminant: 1.03,
	ability: "Grudge",
	prefStyle: 1,
	prefWeapon: [ "Axe", "Mace", "Spear", "Scythe", "Blade", "Bow", "Dagger", "Shield", "Shuriken", "Trident" ],
	permittedComrades: 5,
	painThreshold: .05,
	statusOpt: [44, 6],
	battleSprite: Texture.fromFile('@/images/lenin.png'),
});

export let personaList = [
Ascetic, //0
Coward, //1
Deceiver, //2
Diviner, //3
Empathist, //4
Hunter, //5
Jester, //6
Masochist, //7
Nihilist, //8
Nostalgic, //9
Occultist, //10
Renegade, //11
Sadist, //12
Schemer, //13
Usurper, //14
Vengeancer, //15
];