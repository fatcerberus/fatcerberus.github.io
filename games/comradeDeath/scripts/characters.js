//The character database, for field-based operations

import { Easing, from, Random, Tween } from '/lib/sphere-runtime.js';
import { Agent } from './agents.js';
import { appearify, deadWood, faceTheMusic, intransigenceMeter, levelAdjust, mapMove, nameBot, orientMe, reAlign, selfSituate, switchMap } from './functions.js';
import { emptyShell, personaList } from './personas.js';


export class Character
{
	constructor(performer) {

		this.name = performer.name;
		this.level = performer.level; //Plays into HP and unleash
		this.levelSeries = performer.levelSeries; //Amount of EXP needed for each level, up to a max of 23
		this.persona = performer.persona; //The battle class
		this.agent = performer.agent; //Need to allow for more than one agent given multiple personas
		this.aura = performer.aura; //Aids in recruiting and maintaining allies. Also provides some effects in battle.
		this.activeSprite = performer.activeSprite; //The agent's on-screen image
		this.sprite = performer.sprite; //The array of possible sprites
		this.tileLock = performer.tileLock; //Determine which map tile the sprite is on
		this.lastTile = performer.lastTile; //For sending them back from whence they came
		this.isFacing = performer.isFacing; //Tell the engine which direction the character is looking
		this.isInternationalist = performer.isInternationalist; //Indicates whether they'll join the party peacefully
		this.isRevisionist = performer.isRevisionist; //Determine if they'll attack upon crossing paths
		this.justWait = performer.justWait; //Timer for field actions
		this.currentStage = performer.currentStage; //Mindkill measure?
		this.provisions = performer.provisions; //actual inventory
		this.reputation = performer.reputation; //Impacts ability to acquire certain items
		this.credit = performer.credit; //Purchasing power
		this.potentialRecruit = performer.potentialRecruit;
		//this.otherClasses = performer.otherClasses; //Available to switch to
	};
	
	agentize() {

		let fish = agentList;
		for (let n = 0; n < charList.length - 1; n++) {
			let no = Random.discrete(0, personaList.length - 1);
			charList[n].morph(no);
			agentList.push(charList[n].agent);
			charList.splice(n, 1);
		};
	};
	
	backTrack() {

		if (this.lastTile.length > 0 && !bluePrints[styleMap][currentMap].fieldLayout[this.lastTile[this.lastTile.length - 1]].isOccupied) {
			let diff = this.lastTile[this.lastTile.length -1] - this.tileLock
			let khl = reAlign(diff, this, true);
			if (khl) {
				this.lastTile.pop();
				diff = this.lastTile[this.lastTile.length -1] - this.tileLock
				let meas = diff == 1 ? 1 : diff == -1 ? 3 : diff == widthness ? 0 : 2;
				this.sprite = diff;
			};
		};
	};
	
	bandit() {
		
		charList.length = 0;
		NPC.createNew();
		deadWood(NPClist, charList);
		let y = from(NPClist).shuffle().toArray();
		NPClist.length = 0;
		NPClist.push(...y);
		appearify(NPClist[0]);
	};
	
	createNew(custom) {
		
		if (custom != null) {
			charOptions.push(custom);
		}
		else {
			while (charOptions.length < 11) {
				let kingFisher = false;
				let quail;
				while (kingFisher === false) {
					quail = nameBot(Math.min((Random.normal(6, 1), 7)));
					let ptarmigan = from(masterList)
						.where(it => it.name == quail)
						.toArray();
					if (ptarmigan.length === 0) {
						kingFisher = true;
					};
				};
				charOptions.push(quail)
			};
			let pheasant = from(charOptions).shuffle().toArray();
			charOptions.length = 0;
			charOptions.push(...pheasant);
		};
		
		let seagull = custom != null ? charOptions.indexOf(custom) : Random.discrete(0, charOptions.length - 1);
		charList.push(new Character({
		name: charOptions[seagull],
		level: 1,
		levelSeries: [ ],
		persona: [ ],
		agent: null,
		activeSprite: charSprites[Random.discrete(0, charSprites.length - 1)],
		sprite: 2,
		lastTile: [ ],
		isInternationalist: gambler.next().value,
		isRevisionist: Math.round(gambler.next().value),
		justWait: Date.now() - 300000,
		provisions: [ Array.of(), Array.of() ],
		reputation: 5.5,
		credit: 13525,
		potentialRecruit: null,
		}));
		charOptions.splice(seagull, 1);
		let benchWarmer = charList[charList.length - 1];
		deadWood(charList, 0);
		if (!masterList.includes(benchWarmer)) {
			masterList.push(benchWarmer);
		};
	};
	
	engage(frenemy) {
		
		let a;
		let x = NPClist.indexOf(frenemy);
		mainChar.potentialRecruit = NPClist[x];
		frenemy.isInternationalist = intransigenceMeter(frenemy.isInternationalist, 0);
		
		if (frenemy.isInternationalist === true) {
			a = frenemy.joinParty();
		}
		else {
			let ginga = Random.discrete(0, personaList.length - 1);
			passAlong = frenemy.isRevisionist;
			frenemy.morph(ginga);
			a = false;
		};
		NPClist.splice(x, 1);
		NPC.bandit();
		return a;
	};
	
	getGrabby(num) {
		
		let act = partyList.length > 1 ? partyList[num] : mainChar;
		
		let terezi;
		let vriska;
		let djinni = from(bluePrints[styleMap][currentMap].contents)
			.where(it => it.tileLock == mainChar.isFacing)
			.toArray();
		if (djinni.length > 0 && djinni[0].techType != null) {
			let karkat = djinni[0].techType == 3 ? makeShift[4] : djinni[0].techType == 1 ? makeShift[3] : makeShift[2];
			vriska = karkat[0].indexOf(djinni[0]);
			if (karkat != makeShift[4]) {
				let satchel = karkat == makeShift[3] ? act.agent.stash : act.agent.stock;
				let bucky = satchel[0].includes(karkat[0][vriska]) ? satchel[0].indexOf(karkat[0][vriska]) : false;
				if (bucky === false) {
					satchel[0].push(karkat[0][vriska]);
					satchel[1].push(1);
				}
				else {
					satchel[1][bucky] += 1;
				};
				terezi = true;
			}
			else {
				terezi = act.agent.buddyUp(karkat[0][vriska]) ? true : false;
			};
			if (terezi) {
				let english = from(karkat[1]).where(it => it == karkat[0][vriska].tileLock).toArray();
				karkat[1].splice(english[0], 1);
			};
		}
		else if (djinni.length > 0 && djinni[0].rarity !== undefined) {
			let pyrope = act.provisions[0].indexOf(djinni[0]);
			if (!act.provisions[0].includes(djinni[0])) {
				act.provisions[0].push(djinni[0]);
				act.provisions[1].push(1);
			}
			else {
				act.provisions[1][pyrope] += 1;
			};
			terezi = true;
		}
		else if (djinni.length > 0 && djinni[0].grade != null) {
			if (djinni[0].defense1 != null) {
				act.agent.gear = djinni[0];
				act.agent.armoryRun("initial");
			}
			else {
				let slot = act.agent.weapon.length < 2 ? act.agent.weapon.length : act.agent.weapon.length == 3 ? 2 : act.agent.weapon.length == 2 && act.agent.weaponCurrent != null && act.agent.weaponCurrent.name !== "Fists" ? 1 : 2;
				act.agent.seizeWeapon(slot, djinni[0]);
			};
			terezi = true;
		};
		
		if (terezi) {
			let strider = bluePrints[styleMap][currentMap].contents.indexOf(djinni[0]);
			bluePrints[styleMap][currentMap].contents.splice(strider, 1)
			bluePrints[styleMap][currentMap].fieldLayout[mainChar.isFacing].isOccupied = false;
		};
	};
	
	joinParty(num) {
		
		if (partyList.length < 2) {
			partyList.push(this);
			this.morph(num);
			battlerList.push(this.agent);
			bodyList.push(this.agent);
			this.agent.assignRole(1);
			return true;
		}
		else {
			recruitList.push(this);
			return "null";
		};
	};
	
	morph(num, reboot) {
		
		num = num == null ? Random.discrete(0, personaList.length - 1) : num;
		
		let iris = this.level !== universalDynamicLevel;
		this.level = universalDynamicLevel; //Change this for testing damage scaling
		let undeflowered = this.agent == null ? true : false;
		let daisy = battlerList.indexOf(this.agent);
		let orchid = bodyList.indexOf(this.agent);
		let petunia = allyList.indexOf(this.agent);
		let tulip = this.agent != null ? this.agent.hasAlly : false;
		let rose = Number.isInteger(num) ? personaList[num] : emptyShell;
		let hydrangea;
		if (this.persona[0] != rose) {
			if (this.persona.includes(rose)) {
				let violet = this.persona[0];
				let lily = this.persona.indexOf(rose)
				this.persona[0] = rose;
				this.persona[lily] = violet;
			}
			else {
				if (this.persona[0] == emptyShell) {
					this.persona.length = 0;
					this.persona.push(rose);
					if (this.agent.weapon.length == 0) {
						let smorgasbord = from(allWeaponsList[0])
							.where(it => it.weaponType == this.persona[0].prefWeapon[0])
							.toArray();
						this.agent.seizeWeapon(0, smorgasbord[0]);
					};
				}
				else {
					this.persona.unshift(rose);
					hydrangea = rose.name != "Absolved" && this.level < 23 ? true : false;
				};
				this.persona[0].stratPref = [ ];
				for (let lana = 0; lana < 22; lana++) {
					this.levelSeries[lana] = Math.trunc(Random.normal((Math.pow(lana, 3) * 1000), (lana * 100)))
				};
				if (undeflowered) {
					let stem = [ ];
					if (this.agent != null) {
						if (this.agent.movePoolBase.length > 0) {
							for (let j = 0; j < this.agent.movePoolBase.length; j++) {
								stem.push(this.movePoolBase[j]);
							};
						};
					};
					this.agent = new Agent({name: this.name, level: this.level, movePoolBase: [ ], persona: this.persona[0], battlerType: 0, defaultMovePower: 1.02, defaultArmorPower: 1.03, isVirgin: true });
					this.agent.movePoolBase = stem;
				}
				else {
					levelAdjust(false, iris, partyList.indexOf(this));
				};
			};
			if (reboot != null) {
				battlerList[daisy] = this.agent;
				bodyList[orchid] = this.agent;
				allyList[petunia] = this.agent;
				this.agent.hasAlly = tulip;
				this.agent.assignRole(1);
				if (hydrangea) {
					let sunflower = Math.round(this.agent.healthMax * .87); //penalty for switching before reaching mastery
					this.agent.healthMax = sunflower;
					this.agent.health = this.agent.health <= this.agent.healthMax ? this.agent.health : this.agent.healthMax;
				};
			};
		};
	};
	
	moveMent(direc) {
		
		let moveDir = direc == 0 ? ["top", widthness * -1] : direc == 1 ? ["left", -1] : direc == 2 ? ["bottom", widthness] : ["right", 1];
		
		let x = this.tileLock;
		this.sprite = direc;
		if (!bluePrints[styleMap][currentMap].fieldLayout[this.tileLock].isEdge.includes(moveDir[0])) {
			reAlign(moveDir[1], this);
			this.isFacing = faceTheMusic(this.tileLock, moveDir[1]);
		}
		else {
			if (this == mainChar) {
				let terps = widthness * 48 == Surface.Screen.width ? true : false;
				let whence = switchMap(direc);
				if (whence) {
					Nomad.visible = false;
					Nomad.tileLock = null;
					Nomad.fatigue = false;
					orientMe(true);
					this.lastTile.length = 0;
					let scarface = selfSituate(direc);
					this.tileLock = scarface[0][direc];
					mapMove(0, scarface[1][direc].number);
					appearify(NPClist[0]);
					if (gambler.next().value >= 0.61) {
						appearify(Nomad);
						Nomad.visible = true;
					};
				}
				else if (whence == "alt") {
					x = null;
				};
				this.isFacing = faceTheMusic(this.tileLock, moveDir[1]);
			};
		};
		if (x != this.tileLock) {
			this.credit = sourceFeed == 4 ? this.credit : this.credit + (.05 * this.level);
			chance += .0001; //Up this to .00001 in final version
			return true;
		}
		else {
			return false;
		};
	};
	
	rejuvenate(ditz) {
		
		this.agent.health = this.agent.healthMax;
		this.agent.vigor += 100;
		this.agent.deathFlag = false;
		if (!battlerList.includes(this.agent) && ditz == null) {
			//battlerList[partyList.indexOf(this)] = this.agent;
			battlerList.push(this.agent);
		};
		deadWood(this.agent.comrades, this.agent.comradesPast);
		for (let j = 0; j < this.agent.berserkSuit.length; j++) {
			this.agent.disRobe(j);
		};
	}
	
	removePartyMember() {
		
		partyList.splice(partyList.indexOf(this), 1);
		if (this == mainChar && partyList.length > 0) { //Can continue as long as party isn't empty. Just leave the dead behind.
			mainChar = partyList[0];
			if (battlerList.includes(this.agent)) {
				battlerList.splice(battlerList.indexOf(this.agent), 1);
			};
			if (bodyList.includes(this.agent)) {
				bodyList.splice(bodyList.indexOf(this.agent), 1);
				mainChar.agent.hasAlly = false;
			};
		}
		else {
			firstLaunch = true;
		};
		//appearify belongings on the field
	};
	
	struggleOn() {
		
		let stillAlive = this.agent.health > 0 ? true : this.agent.vigor > 0 ? true : false;
		if (!stillAlive && !practiceFight) {
			this.removePartyMember();
		}
		else {
			let s = this.level == 23 ? 1 : this.levelSeries[this.level] - this.agent.expPoints;
			while (s <= 0) {
				this.level++;
				if (this == mainChar) {
					universalDynamicLevel = mainChar.level;
				};
				s = this.levelSeries[this.level] - this.agent.expPoints;
			};
			this.agent.expPoints = 0;
			this.updateAgent();
		};
	};
	
	updateAgent() {
		
		this.agent.level = this.level;
		this.agent.persona = this.persona[0];
	};		
};