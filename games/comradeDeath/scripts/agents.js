// The in-battle characters

import { from, Random, Scene } from '/lib/sphere-runtime.js';
import { bonusReset, deadWood, deathCheck, emissionCheck, goTimer, killAim, playerLose, playerWin, powerSurge, reSolve, statusCheck } from './functions.js';
import { Fists } from './mainWeapons.js';
import { allMoves, extraTechs, generalMoves, gradientMoves } from './movepools.js';
import { statusList } from './statuses.js';


export class Agent
{
	constructor(actor) {
		this.name = actor.name;
		this.abilityUsed = actor.abilityUsed; //Has a one-off ability activated?
		this.allCapabilities = actor.allCapabilities; //An array of all possible techniques
		this.alteredState = actor.alteredState; //Array of current status afflictions
		this.armor = actor.armor; //Array of armor, 0 = helmet, 1 = chestplate, 2 = gauntlets, 3 = legs, 4 = boots
		this.armorDefault = actor.armorDefault; //For resetting to base outfit
		this.armorPower = actor.armorPower; //For tracking changes
		this.aura = actor.aura; //Mostly a defense boost? Varying effects. TBD
		this.battlerType = actor.battlerType; //For calling the proper AI
		this.berserkSuit = actor.berserkSuit; //Checks progress toward berserker suit
		this.boostCombo = actor.boostCombo; //Damage bonus for successfully using a move combo
		this.boostStyle = actor.boostStyle; //Damage bonus for using persona's preferred style of attack
		this.boostWeapon = actor.boostWeapon; //Damage bonus for using persona's preferred weapon class
		this.comboLog = actor.comboLog; //Indicates what move style will activate a combo next turn
		this.comrades = actor.comrades; //Useful battle buddies akin to Djinni from Golden Sun
		this.comradesPast = actor.comradesPast; //An array of used Comrades. Comrades are single-use in-battle, and possibly in-game
		this.countdown = actor.countdown; //turn timer
		this.deathFlag = actor.deathFlag; //True/false variable to see if a battler meets a death condition
		this.defaultArmorPower = actor.defaultArmorPower; //The battler's own multiplier for armor, from 0-5%
		this.defaultMove = actor.defaultMove; //A fallback move for if the queue is empty
		this.defaultMovePower = actor.defaultMovePower; //scale of 0-10% in half-percent increments.  Will serve as a multiplier.
		this.expPoints = actor.expPoints; //Experience points
		this.friendlyFire = actor.friendlyFire; //If true, was attacked by a teammate
		this.gear = actor.gear; //What are they outfitted in?
		this.hasAlly = actor.hasAlly; //Fighting solo or no?
		this.healDelay = actor.healDelay; //See if there is a block on healing
		this.healQueue = actor.healQueue; //How much pending healing the battler has
		this.health = actor.health; //current HP level
		this.healthApprox = actor.healthApprox; //For displaying to the opposing side
		this.healthMax = actor.healthMax; //total HP level
		this.HUD = actor.HUD; //An array for statuses based around showing or blocking strategic information
			//"status" = no Status menu; "predict" = see target's queue; "ailment" = no Ailments menu
		this.isProtag = actor.isProtag; //Checks if the battler is a protag or antag
		this.isVirgin = actor.isVirgin; //See if they've battled before
		this.lastAction = actor.lastAction; //logs most recent action
		this.lastAttacker = actor.lastAttacker; //log who attacked the battler most recently
		this.level = actor.level; //Plays into HP and unleash
		this.moveChoice = actor.moveChoice; //Determines which move was selected
		this.movePool = actor.movePool; //Available attacks
		this.movePoolBase = actor.movePoolBase; //Learned techniques
		this.movePower = actor.movePower; //The current level of the multiplier, after any effects were applied
		this.moveQueue = actor.moveQueue; //Primarily for setting pending move, but will be array to potentially hold more
		this.pendingAction = actor.pendingAction; //for actions outside the turn system
		this.persona = actor.persona; //The battler's class
		this.queuedTarget = actor.queuedTarget //set the target for a queued move
		this.specialMoves = actor.specialMoves; //Unleashes and such
		this.stash = actor.stash; //battle item cache
		this.stock = actor.stock; //heal item cache
		this.stressMeter = actor.stressMeter; //stress goes up .25 every time an attack hits; .5 if HP is below half // Max stress = 10 (HP loss above 8)
		this.target = actor.target; //set the target as a characteristic, not an independent Object
		this.toRandomize = actor.toRandomize; //Indicates whether the AI has a specific move or will allow a sampling
		this.turnNo = actor.turnNo; //How many turns this battle?
		this.unleashMeter = actor.unleashMeter; //Active meter
		this.unleashMeters = actor.unleashMeters; //Array of meters
		this.vigor = actor.vigor; //Will to fight; basically a stamina meter
		this.weapon = actor.weapon; //Array of weapons -- Up to 3 man-made and then Fists in reserve
		this.weaponCurrent = actor.weaponCurrent; //The weapon being wielded at present
		this.wentBerserk = actor.wentBerserk;
	};

	addStatus(ill) {
			
		let covid = influence == "creation" ? 1.1387 : 1;
		let flu = Math.ceil(statusList[ill].turnCount * covid);
		if (this.statusSearch(ill) === false) {
			let contaminate = ill != 13 ? 1 : Aggressor != Aggressor.target ? 2 : 3
			if (contaminate <= 2) {
				this.alteredState.push([statusList[ill], flu]);
			};
			if (contaminate == 2) {
				this.slaveOf = Aggressor;
			};
			return true;
		}
		else {
			return false;
		};
	};
	
	armoryRun(a, b) {
		if (a === "initial") {
			this.armorDefault = [ this.gear.defense1, this.gear.defense2, this.gear.defense3, this.gear.defense4 ];
			this.armor[0] = this.gear.defense1;
			this.armor[1] = this.gear.defense2;
			this.armor[2] = this.gear.defense3;
			this.armor[3] = this.gear.defense4;
		}
		else if (a === "default") {
			this.armor[b] = this.armorDefault[b];
		}
		else {
			this.armor[a] = b;
		};
	};

	assignRole(k) { //Slot the battlers into their positions as protags or antags
		
		this.isProtag = k;
		let who = this.isProtag ? allyList : foeList;
		if (!who.includes(this)) {
			if (who.length > 0) {
				this.hasAlly = bodyList.indexOf(who[0]);
				who[0].hasAlly = bodyList.indexOf(this);
			}
			else {
				this.hasAlly = false;
			};
			who.push(this);
		};
		if (this.isVirgin != false) {
			this.psychUp();
			this.newFantasy();
			this.isVirgin = false;
		};
	};
	
	autoBattler(play) {
		
		if (play) {
			if (this.queuedTarget.length > 0) {
				this.setVictim(battlerList.indexOf(this.queuedTarget[0]));
				this.queuedTarget.splice(0, 1);
			}
			else {
				let ji = Random.sample(foeList);
				let jy = battlerList.indexOf(ji);
				this.setVictim(jy);
			};
			if (this.moveQueue.length > 0) {
				this.moveChoice = this.moveQueue[0];
				this.moveQueue.splice(0, 1);
			}
			else {
				this.moveChoice = this.allCapabilities[1]
			};
		}
		else {
			let jo = this.persona.scheme(this, statusList);
			if (this.toRandomize == null) {
				let ja = Random.sample(jo);
				this.moveChoice = ja;
			}
			else if (this.toRandomize > jo.length) {
				this.moveChoice = jo[0];
			}
			else {
				this.moveChoice = jo[this.toRandomize];
			};
			if (this.moveChoice == null) {
				memo = "wtf"
			};
		};
		this.moveSifter(this.toRandomize);
		
		if (!play) {
			if (!Dummy.endBattleCheck()) {
				this.endCycle();
				Dummy.countDown();
			};
		};
	};
	
	battlePrep() { //Initiate the battler
		
		this.initializeStuff(); //Make sure key variables aren't undefined
		Fists.prepWeapon();
		let gleam = this.weapon.length > 0 ? 0 : -1; //Promote the first weapon to active
		this.swapWeapon(gleam);
		if (this.gear !== null) {
			this.armoryRun("initial");
		};
	};

	berserkerCheck() {

		let hawk = from(this.berserkSuit)
			.where(it => it == null)
			.toArray();
		if (hawk.length == 0) { //see if the berserker suit is completed
			this.wentBerserk = true;
		};
	};
	
	bonusMath(go) { //Determine if there are any additional damage multipliers in play
		
		let j = this.persona.prefWeapon.indexOf(this.weaponCurrent.weaponType);
		if (this.statusSearch(44) === false) { //Vanilla nixes weapon boost
			if (j == 1) { //This is checking the hierarchy of preferred weapon classes
				this.boostWeapon = 1.05 }
			else if (j >= 2 && j <= 4) {
				this.boostWeapon = 1.025 }
			else if (j >= 5 && j <= 7) {
				this.boostWeapon = 1.01 };
		};
		
		if (go) {
			if (this.persona.prefStyle == this.weaponCurrent.style) { //Checking melee or finesse
				this.boostStyle = 1.05
			};
			if (this.comboLog != null && this.moveChoice.comboKey == this.comboLog) { //Determines if a combo has been used
				this.boostCombo = 1.02
			}
			else if (this.comboLog == 3 && this.moveChoice.comboKey != null) { //A comboLog of 3 is an automatic combo bonus for whatever move comes next
				this.boostCombo = 1.02
			};
		};
	};
	
	buddyUp(sol) {
		
		if ((this.comrades.length + this.comradesPast.length) < this.persona.permittedComrades) {
			if ((!this.comrades.includes(sol)) && (!this.comradesPast.includes(sol)) && (sol != null)) {
				this.comrades.push(sol);
				return true;
			}
			else {
				return false;
			};
		}
		else {
			return false;
		};
	};
	
	capabilityCheck() { //Assign movepools

		while (this.movePool.length > 0) { this.movePool.shift() };
		while (this.specialMoves.length > 0) { this.specialMoves.shift() };
		
		if (sourceFeed == 2) {
			this.movePool.push(...generalMoves, ...this.weaponCurrent.moves, ...this.persona.moves);
		}
		else {
			this.movePool.push(...this.movePoolBase, ...this.weaponCurrent.moves);
		};
		if (this.persona.name != "Iconoclast" && this.weaponCurrent != Fists && !allWeaponsList[6].includes(this.weaponCurrent)) {
			this.movePool.push(gradientMoves[this.weaponCurrent.grade - 1]);
		};
		this.specialMoves.push(...this.weaponCurrent.unleashMoves, this.persona.unleashMoves);
		this.allCapabilities = [ ];
		this.allCapabilities.push(...extraTechs, ...this.movePool, ...this.specialMoves, ...this.stock, ...this.stash, ...this.comrades)
		
		let ttu = from(this.movePool)
			.where(it => it.rank <= 2.5)
			.toArray()
		let ku;
		if (ttu.length > 0) {
			ku = Random.sample(ttu);
		}
		else {
			ku = extraTechs[0];
		};
		this.defaultMove = ku;
	};
	
	countDown() { //The turn system
		
		moveSeq = 0; //Reset the moveQueuer to first stage
		retalTrigger = false;
		healOrHarm = 0; //Default to doing damage
		bonusReset();
		powerSurge();
		statusCheck(1);
		emissionCheck();
		//deathCheck(battlerList);
		goTimer();
		cycleNo++; //Keep track of how many turns have been taken so far
		let next = Aggressor == null || battlerList.indexOf(Aggressor) == battlerList.length - 1 ? 0 : battlerList.indexOf(Aggressor) + 1;
		Aggressor = null;
		if (!Dummy.endBattleCheck()) {
			if (gameMode == "Standard") {
				let m = battlerList.length - 1;
				let r;
				
				while (Aggressor == null) {
					r = [];
					for (let i = 0; i <= m; i++) { //Create a dummy list of battler timers
						r.push(battlerList[i].countdown);
					};
					
					r.sort((a, b) => a -  b);
					
					for (let u = 0; u <= m; u++) {
						if (battlerList[u].countdown == r[0]) { //Zero someone's timer out
							let obstagoon = battlerList[u].statusSearch(7);
							if (obstagoon === false) { //lost a turn for comatose
								Aggressor = battlerList[u];
							}
							else {
								battlerList[u].alteredState[obstagoon][0].redact(battlerList[u]);
								battlerList[u].alteredState.splice(obstagoon, 1);
								//let up = battlerList[u].modifyRank === undefined ? 0 : battlerList[u].modifyRank;
								//battlerList[u].countdown += (((battlerList[u].defaultMove.rank + up) * 100) / battlerList[u].persona.atkDeterminant);
							}
						};
					};
				};
					
				while (m >= 0) { //Reduce everyone else's timers
					battlerList[m].countdown -= r[0];
					m--;
				};
			}
			else {
				Aggressor = battlerList[next];
			};
			
			reSolve(1);
			if (!Dummy.endBattleCheck()) {
				if (!allyList.includes(Aggressor)) {
					if (Aggressor.battlerType == 0) {
						Aggressor.autoBattler(false);
					}
					else {
						Aggressor.strategize();
					};
				};
			};
		};
	};
		
	die(t) { //Eliminate a fallen battler
		
		this.addStatus(9);	
		this.unleashMeter = 0;
		this.pendingAction.length = 0;
		killAim(this);
		let shoujo = this.isProtag ? allyList : foeList;
		let shonen = shoujo.indexOf(this);
		shoujo[shonen] = null;
		battlerList.splice(t, 1);
		/*if (this.vigor <= 0) {
			bodyList.splice(bodyList.indexOf(this), 1);
			if (shoujo[1 - shonen] != null) {
				shoujo[1 - shonen].hasAlly = false;
			};
		};*/
	};
	
	disRobe(slot) {
		
		this.berserkSuit[slot] = null;
	};
	
	dmgMath(nor) { //Easier to edit the damage formula as its own function like this
		
		if (nor) {
			damage = Math.ceil((((((((this.moveChoice.power * this.boostWeapon)
			+ ((this.weaponCurrent.power) * this.boostStyle)) * this.movePower)
			* this.persona.atkDeterminant) * this.boostCombo * 2.05) - resistance)) * this.level / 23);
		}
		else { //Unleash
			damage = Math.ceil((((this.weaponCurrent.power * 5) * this.boostStyle) * this.persona.atkDeterminant) - resistance);
		};
		
		if (isNaN(damage)) {
			damage = 1;
		};
	};
	
	endBattleCheck() {
	
		let brainThink = allyList[0] != null ? true : allyList[1] != null ? true : false;
		let thinkBrain = foeList[0] != null ? true : foeList[1] != null ? true : false;
		if (!brainThink || !thinkBrain || duckOut || conditionCleared) {
			if (battleActive) {
				let electee = !brainThink ? "incumbent" : "challenger";
				thinkBrain = true;
				brainThink = true;
				if (electee == "incumbent") {
					//Dispatch.now(() => playerLose());
					playerLose();
				}
				else {
					//Dispatch.now(() =>
					playerWin(conditionCleared);
				};
			};
			return true;
		}
		else {
			return false;
		};
	};
	
	endCycle(g) { //Wrap up a turn
		
		if (g == null) {
			this.comboLog = this.moveChoice.comboOutput; //Note the combo key for next turn
			this.unleashCreep(); //Increase Unleash meter
			let up = this.modifyRank === undefined ? 0 : this.modifyRank;
			this.countdown += (((this.moveChoice.rank + up) * 100) / this.persona.atkDeterminant); //Adding to timer; needs overhaul for balancing
			this.turnNo++;
			menu = "";
		};
	};
	
	escapism() {
		
		let quarry = foeList[0] == null ? true : foeList[0].battlerType == 0 ? true : false;
		if ((this.hasAlly === false || bodyList[this.hasAlly].deathFlag == true) && quarry && sourceFeed != 2) {
			let policy = from(partyList)
				.where(it => it.agent == this)
				.toArray();
			let horde = this.weaponCurrent !== Fists || this.weapon.length > 0 ? true : false;
			let leverage = horde ? 2.5 : 1;
			let pockets = foeList[0] != null ? foeList[0] : foeList[1];
			let bribe = (Math.round((pockets.healthApprox * pockets.level) / 100) * 100);
			if (policy[0].credit >= bribe * leverage && passAlong !== null) {
				policy[0].credit -= bribe;
				duckOut = true;
			}
			else if (policy[0].credit >= bribe * 1 && horde && passAlong !== null) {
				if (this.weaponCurrent !== Fists) {
					this.removeWeapon();
				}
				else {
					this.weapon.splice(0, 1);
					this.unleashMeters.splice(0, 1);
				};
				duckOut = true;
			}
			else {
				duckOut = false;
			};
			for (let cash = 0; cash < foeList.length; cash++) {
				let senKrupt = battlerList.includes(foeList[cash]) ? battlerList.indexOf(foeList[cash]) : "pleased";
				let greasedWheels = senKrupt === "pleased" ? null : battlerList.splice(senKrupt, 1);
			};
		};
	};
	
	friendHit(a, b) {
		if (a.isProtag == b.isProtag) { //Check if it was friendly fire
			b.stressMeter += .0075; //stress mounts if freindly-fired
			return true;
		}
		else {
			return false;
		};
	};
	
	giveStatus(who) {
		
		if (this.moveChoice.giveStatus !== false) { //Check if a secondary effect was applied
			let posit = who !== undefined && who ? this : who !== undefined && !who ? this.target : statusList[this.moveChoice.giveStatus].statusType == 1 ? this : this.target;
			if (posit.statusSearch(22) === false) {
				if ((this.moveChoice.techType) || (statusList[this.moveChoice.giveStatus].potency >= effectChance)) {
					let inflict = posit.addStatus(this.moveChoice.giveStatus);
					if (!inflict) {
						let w = posit.statusSearch(this.moveChoice.giveStatus);
						let v = Math.floor(statusList[this.moveChoice.giveStatus].turnCount / 2);
						posit.alteredState[w][1] += v;
					};
				attackName += ": " + statusList[this.moveChoice.giveStatus].name;
				};
			};
		};
	};
	
	harm(a, b, c) { //For damage taken
		
		let arch = influence == "destruction" ? 1.1387 : 1;
		let d = Math.trunc(c * arch);
		if (a === null) {
			attackName += " (" + d + ")";
		};
		b.health -= Math.max(1, d); //Minimum damage is a guaranteed 1HP, no matter what
		
		b.vigor -= 1;
		b.totalHarm = Number.isInteger(damage) ? b.totalHarm += damage : b.totalHarm;
		for (let i = 0; i < b.berserkSuit.length - 1; i++) { //Chipping away at Comrades' durability
			if (b.berserkSuit[i] != null) {
				b.berserkSuit[i].creak(b);
			};
		};
		b.lastAttacker = a !== null ? a.name : a;
		if (Number.isNaN(b.health)) {
			Sphere.sleep(10)
		};
		let paradigm = b.health / b.healthMax * 100;
		let idealism = Math.trunc(Random.normal(paradigm, 2.5))
		let constructivism = idealism < paradigm ? Math.round(paradigm - 5) : Math.round(paradigm + 5);
		let realism = constructivism < paradigm ? Math.max(constructivism, idealism) : Math.min(constructivism, idealism);
		b.stressMeter += .005;
		b.healthApprox = realism > 0 ? Math.min(100, realism) : Math.max(0, realism);
		deathCheck(battlerList); //Shouldn't this just be the harmed battler??
		if (b.moveQueue.length > 0 && b !== a) {
			retalTrigger = true;
			attackName += " (" + d + ")";
			let weavile = b.moveQueue[0] == b.allCapabilities[0] ? "seize" : null;
			b.target = a;
			b.moveChoice = b.moveQueue[0];
			b.moveQueue.length = 0;
			b.moveSifter(weavile);
		};
	};
	
	heal(p) { //For restoring health, obviously
		
		
		this.healQueue += p;
		let u = Math.round(this.healQueue * this.healDelay);
		this.healQueue -= u;
		let hoosier = influence == "renewal" ? 1.1387 : 1;
		u = Math.ceil(u * hoosier);
		if (this.health < this.healthMax) { //Make sure there's room to heal
			let i = this.healthMax - this.health;
			this.health += Math.min(i, u); //Will need to add clause if a status or item allows more than maxHP
		};
		this.healthApprox = Math.min(100, Math.trunc(Random.normal((this.health / this.healthMax * 100), 0.75)));
		if (Number.isNaN(this.health)) {
			Sphere.sleep(10)
		};
	};
	
	initializeStuff() {
		
		this.abilityUsed = false;
		this.alteredState.length = 0;
		this.armorPower = this.defaultArmorPower;
		this.boostCombo = 1;
		this.boostStyle = 1;
		this.boostWeapon = 1;
		this.comboLog = null;
		this.countdown = (Math.pow(this.persona.atkDeterminant, 2) / this.level);
		this.healDelay = 1; //Set heal multiplier to normal
		this.healQueue = 0;
		this.healthApprox = Math.min(100, Math.trunc(Random.normal((this.health / this.healthMax * 100), 2.5)));
		this.movePower = this.defaultMovePower; //Set the current movePower to the default at the start
		this.pendingAction.length = 0;
		this.stressMeter = 3; //set a default stress level upon entering the fray
		this.totalDamage = 0; //damage given
		this.totalHarm = 0; // damage taken
		this.turnNo = 0;
		this.overLoad = 0;
		this.unleashMeter = 0;
		this.vigor = Math.ceil(((this.persona.atkDeterminant + this.persona.defDeterminant) * 100) * (this.level / 23));
		this.wentBerserk = false;
	};
	
	itemizeDeductions(q) {
		
		let c = q[0].indexOf(this.moveChoice);
		
		if (q[1][c] > 0) {
			q[1][c] -= 1;
			if (q[1][c] == 0) {
				q[0].splice(c, 1);
				q[1].splice(c, 1);
			};
			return true;
		}
		else {
			return false;
			attackName = "It seems you've become delusional in your eagerness to meet Comrade Death";
		};
	};
	
	kelpTape() {
		
		let beets = from(this.alteredState)
			.where(it => it[0].statusType == 0)
			.where(it => it[1] != Infinity)
			.toArray();
		if (beets.length > 0) {
			let cream = beets[beets.length - 1];
			let carrot = this.alteredState.indexOf(cream);
			this.alteredState[carrot][0].redact(this);
			this.alteredState.splice(carrot, 1);
		};
	};
	
	launchAttack(viceroy) { //Initiating an attack
		
		if (this.target.healthApprox <= 13.25 && this.moveChoice.ohkoodds > (chance + gambler.next().value)) { //Determine if a OHKO took place
			this.target.harm(this, this.target, this.target.health);
			this.wound();
			attackName += ": Insta-kill!";
		}
		else if (this.moveChoice.accuracy >= chance) { //Make sure the attack didn't miss
				this.giveStatus(viceroy);
				this.weaponStatus(); //Make sure the weapon didn't break
				if (healOrHarm) { //Determine whether to do damage or restore health
					this.target.heal(damage);
				}
				else {
					this.target.harm(this, this.target, damage);
					this.wound();
				};
		}
		else {
			attackName += ": Miss";
			damage = "Empty"
			this.addStatus(20) //Punish the battler for careless effort -- add Humiliation
		};
	};
	
	lifeForce(juju) { //Assign health levels
		
		juju = juju == null ? 1 : juju;
		let i = Math.pow(this.level, 2);
		let u = ((Random.discrete(625, 750) / 100) * (juju + 0.5));
		this.healthMax = Math.ceil(i * u);
	};
	
	mindKill() { }; //If I decide to implement MindKills for this version

	async moveSifter(etc) {
		
		if ((this.moveChoice.selfAim != null) || (!battlerList.includes(this.target)) || (this.target === null) || (this.target === undefined)) { //Make sure selfAim isn't set
			let tomato = battlerList.indexOf(this)
			this.setVictim(tomato);
		};
		chance = gambler.next().value; //RNG for insta-kill
		effectChance = gambler.next().value; //RNG for status outcome
		let lettuce = this.moveChoice.techType == 2 ? false : true;
		let ranch = !isNaN(this.moveChoice.targetRegion) ? this.moveChoice.targetRegion : 4
		this.target.shellAssess(ranch); //Determine defense
		this.bonusMath(true); //Check for multipliers
		this.dmgMath(lettuce);
		statusCheck(2);
		reSolve(2);
		for (let bun = 0; bun < bodyList.length; bun++) { //Perform second-stage status check
			/*if (battlerList[bun].battlerType == 0) {
				battlerList[bun].persona.activate(battlerList[bun], this); //Ability overrides statuses
			};*/
			let mustard = bodyList[bun].battlerType == 0 ? bodyList[bun].persona.activate(bodyList[bun], this) : null;
			bodyList[bun].vigor -= 1;
		};
		let mayo = this.moveChoice.techType == 1 ? this.stash : this.stock;
		let onion = this.itemizeDeductions(mayo);
		attackName = !retalTrigger ? this.moveChoice.name + " (" + this.target.name + ")" : attackName + "\n Retal: " + this.moveChoice.name + " (" + this.target.name + ")";
		
		if (this.moveChoice.techType == 0) { //0 is a normal Move
			this.launchAttack();
		}
		else if (this.moveChoice.techType == 1) { //1 is an Attack Item
			if (onion) {
				this.launchAttack(false);
			};
		}
		else if (this.moveChoice.techType == 2) { //2 is Unleash
			this.moveChoice.ravage();
		/*	if (this.overLoad > 0 && this.unleashMeter < 100) {
				this.overLoad = 0;
			};*/
		}
		else if (this.moveChoice.techType == 3) { //3 is Comrade
			this.moveChoice.fiendery();
			this.berserkerCheck();
		}
		else if (this.moveChoice.techType == 4) { //4 is a Healing Item
			if (onion) {
				await this.moveChoice.gnaw(this);
			};
		}
		else if (this.moveChoice.techType == 5) { //5 is a restorative berry
			if (onion) {
				this.moveChoice.nibble(this);
			};
		}
		else if (this.moveChoice.techType == 6) { //6 is a weapon swap
			this.swapWeapon(etc);
			//attackName = "Weapon Swap -> " + this.weaponCurrent.name;
		}
		else if (this.moveChoice.techType == 7) { //7 is a do nothing cue
			this.psyDuck();
		}
		else if (this.moveChoice.techType == 8) { //8 is negotiating out
			this.escapism();
		};
		let bacon = this.moveChoice.techType <= 5 ? this.moveChoice : null;
		this.lastAction.push(bacon);
	};
			
	newFantasy() {
		
		let cheryl = from(mythicalArmorList).sample(1).toArray();
		this.gear = sourceFeed !== 2 ? allArmorList[0] : cheryl[0];
		let cyril = [ this.comrades, this.weapon, ];
		let figgus = [ makeShift[4][0], allWeaponsList[Math.trunc(this.level / 4.5)], ];
		let len = [ this.stock, this.stash, ];
		let trexler = [ makeShift[2][0], makeShift[3][0], ];
		let sterling;
		let barry;
		let katya = 1;
				
		for (let i = 0; i < cyril.length; i++) {
			if (cyril[i].length == 0) {
				while (cyril[i].length < katya) {
					sterling = Random.discrete(0, figgus[i].length - 1);
					if (!cyril[i].includes(figgus[i][sterling])) {
						if (i == 1) {
							this.seizeWeapon(cyril[i].length, figgus[i][sterling]);
							katya = sourceFeed == 2 ? 3 : 1;
						}
						else {
							this.buddyUp(figgus[i][sterling]);
							katya = sourceFeed == 2 || this.persona.permittedComrades == 0 ? this.persona.permittedComrades : 1;
						};
					};
				};
			};
		};
		
		for (let i = 0; i < len.length; i++) {
			if (len[i][0].length == 0) {
				while (len[i][0].length < 3) {
					sterling = Random.discrete(0, trexler[i].length - 1);
					barry = len[i][0].includes(trexler[i][sterling]);
					if (!barry) {
						len[i][0].push(trexler[i][sterling]);
						len[i][1].push(1);
					};
				};
			};
		};
	};
	
	psychUp() {
		
		this.lifeForce(); //Determine total health
		this.health = this.healthMax;
		this.alteredState = [ ];
		this.armor = [ ];
		this.armorDefault = [ ];
		this.berserkSuit = [ null, null, null, null ];
		this.comrades = [ ];
		this.comradesPast = [ ];
		this.expPoints = 0;
		this.HUD = [ ];
		this.lastAction = [ ];
		this.movePool = [ ];
		if (!this.movePoolBase.includes(generalMoves[0])) {
			this.movePoolBase.push(...generalMoves);
		};
		this.moveQueue = [ ];
		this.pendingAction = [ ];
		this.queuedTarget = [ ];
		this.specialMoves = [ ];
		this.stock = [ [ ], [ ] ];
		this.stash = [ [ ], [ ] ];
		this.unleashMeters = [ ];
		this.weapon = [ ];
	};
	
	psyDuck() { //A "do nothing" command
		
		damage = "Headache";
		attackName = "My name is sigh.. sigh... PSYDUCK!";
		menu = "";
		this.setVictim();
	};
	
	removeWeapon(n) { //For broken or stolen weapons
		
		this.weaponCurrent = Fists; //If active weapon is lost, it defaults to bare hands, since those are always available
		this.unleashCreep(-1);
		this.capabilityCheck();
	};
	
	seizeWeapon(olive, arrow) { //Try to steal or acquire a weapon when empty-handed
		
		if (olive != null) {
			this.weapon[olive] = arrow;
			this.weapon[olive].setValues();
			this.unleashCreep(olive);
		}
		else {
			chance = gambler.next().value;
			if (this !== this.target && this.target.battlerType !== 1) { //Can't steal from yourself or a QingXu
				if (this.weapon.length < 3) { //Max carrying capacity is 3 weapons plus Fists
					if (this.persona.atkDeterminant * 0.25 >= chance && this.weaponCurrent == Fists) { //Primary determinant's efficacy is the deciding factor
						if (this.target.weaponCurrent != Fists && this.target.weaponCurrent.range !== "Projectile") { //Can't steal fists or a ranged weapon
							return true;
						}
						else {
							return false;
						};			
					};
				}
				else {
					return false;
				};
			}
			else {
				return false;
			};
		};
	};
		
	setVictim(f) {
		
		this.target = f != undefined && f >= 0 && f < battlerList.length ? battlerList[f] : this;
		this.friendlyFire = this.friendHit(this, this.target);
	};
		
	shellAssess(abacus) { //Determine resistance to damage
		
		if (abacus <= 3) {
			let num1 = Math.pow(this.armor[abacus] * this.armorPower, 2) + (this.armor[abacus] * 1.5);
			//let num2 = Math.pow(this.armor[1] * this.armorPower, 2);
			//let num3 = Math.pow(this.armor[2] * this.armorPower, 2);
			//let num4 = Math.pow(mthis.armor[3] * this.armorPower, 2);
			//let num5 = Math.sqrt((num1 + num2 + num3 + num4) * this.persona.defDeterminant * (this.level / 23));
			let num2 = Math.sqrt(num1 * this.persona.defDeterminant * (this.level / 23));
			let num3 = Math.min(100, this.unleashMeter / 1000) * num2;
			let num4 = influence == "preservation" ? 1.1387 : 1;
			let num5 = Math.ceil(num3 * num4);
			let num6 = Math.ceil(num2 - (num2 * (this.stressMeter / 10)) + num5);
			resistance = Math.max(0, num6);
		}
		else {
			resistance = Math.sqrt(Math.pow((this.armor[0] + this.armor[1] + this.armor[2] + this.armor[3]) * this.armorPower, 2) * this.persona.defDeterminant * (this.level / 23));;
		};
	};
	
	statusSearch(num) {
		
		let seek = from(this.alteredState)
			.where(it => it[0] == statusList[num])
			.toArray();
		if (seek.length != 0) {
			return this.alteredState.indexOf(seek[0]);
		}
		else {
			return false;
		};
	};
	
	swapWeapon(swap) { //Change on the fly
		
		if (swap == "seize") {
			let haul = this.seizeWeapon();
			if (haul) {
				this.weapon.unshift(this.target.weaponCurrent); //Add it to Aggressor's inventory
				this.unleashMeters.unshift(this.target.unleashMeter);
				attackName = "New Weapon: " + this.target.weaponCurrent.name;
				this.target.removeWeapon(); //Take it away from the target
				swap = 0; //swap should already be 0, but this is in here as a precautionary measure
			}
			else {
				attackName += "\nComrade Death approves of your self-destructive ways";
				this.harm(null, this, this.healthMax * .01); //They suffer additional damage from the blow
			};
		};
		
		if ((this.weaponCurrent == null || this.weaponCurrent.isLocked == false) && Number.isInteger(swap)) {
			let hold = this.weaponCurrent;
			let held = this.unleashMeter;
			let snek;
			
			if (swap !== -1) {
				snek = this.statusSearch(37)
				if (snek !== false) { //Transfer Rust's deleterious effects to new weapon
					if (this.weapon[swap].robustness < 1) {
						this.weapon[swap].brakeJob = this.weaponCurrent.brakejob;
						this.weaponCurrent.brakeJob = 0;
					};
				};
			}
			snek = this.statusSearch(39)
			if (snek !== false) { //Remove Snakebit when weapon swap occurs
				this.alteredState[snek][0].redact(this);
				this.alteredState.splice(snek, 1);
			};
			if (swap == -1 || swap > this.weapon.length - 1) {
				swap = -1;
				this.weaponCurrent = Fists;
				this.unleashCreep(swap);
			}
			else {
				this.weaponCurrent = this.weapon[swap]; //Set active weapon
				this.unleashMeter = this.unleashMeters[swap]; //Restore the proper unleash meter
				this.weapon.splice(swap, 1); //Take the new weapon out of the reserve weapons pile
				this.unleashMeters.splice(swap, 1); //And the remove unleash meter as well
			};
			this.capabilityCheck(); //Reassign movepool
			attackName = "Weapon Swap -> " + this.weaponCurrent.name;
			if (hold != null && hold.name != "Fists") {
				this.weapon.unshift(hold); //Put the old weapon into storage
				this.unleashMeters.unshift(held); //Store the unleash meter as well -- Fist unleash meter resets every time (no goddess spirit)
			};
		};
	};
	
	unleashCreep(stage) { //Build up power for an Unleash
		
		let drivel = this.unleashMeter < 100 ? true : false;
		if (stage != null) {
			let m;
			if (stage >= 0) {
				m = Math.pow(this.weapon[stage].grade, 2);
				this.unleashMeters[stage] = Math.max(0, Math.ceil(m));
			}
			else {
				m = Math.pow(this.weaponCurrent.grade, 2);
				this.unleashMeter = Math.max(0, Math.ceil(m));
			};
		}
		else {
			//var z = Math.sqrt(damage);
			if (Number.isInteger(this.moveChoice.power) && !attackName.includes("Miss")) {
				let zen = Math.ceil((this.moveChoice.power / 83) * this.level / 2.5);
				this.unleashMeter += Math.max(1, zen);
			}
			else {
				this.unleashMeter += 1;
			};
		};
		if (this.unleashMeter >= 100 && !drivel) {
			this.overLoad = this.turnNo;
		}
		else if (this.unleashMeter >= 100 && drivel) {
			this.overLoad = this.turnNo + 1;
		};
	};
	
	weaponStatus() {
		
		let t = this.weapon.indexOf(this.weaponCurrent);
		if (!generalMoves.includes(this.moveChoice) && this.moveChoice.techType != 1) {
			this.weaponCurrent.breakCheck();
			if (this.weaponCurrent.isBroken) {
				let check = this.persona.name !== "Nostalgic" ? false : this.abilityUsed === false ? true : false;
				if (check) {
					this.abilityUsed = true;
					this.weaponCurrent.isBroken = false;
				}
				else {
					damage = Math.ceil(damage * 0.5);
					attackName += " -- Weapon failure!"
					this.removeWeapon(t);
					this.addStatus(38);
				};
			};
		};
	};
	
	wound() { //doesn't activate on status effects?
		
		this.totalDamage = Number.isInteger(damage) ? this.totalDamage += damage : this.totalDamage;
		this.vigor -= 1; //Basically a stamina drain
	};
};	
