// A field enemy of sorts -- killing one may require sacrificing a teammate?

import { from, Random } from '/lib/sphere-runtime.js';
import { qingXuArmor } from './armor.js';
import { killAim } from './functions.js';
import { classMoves, demonMoves } from './movepools.js';
import { statusList } from './statuses.js';

export class Demon
{	
	constructor(hell) {
		
		this.name = hell.name; //Somewhere from 3-9 demons per character. Will specify later
		this.armor = hell.armor;
		this.battlerType = hell.battlerType; //For calling the proper AI
		this.alteredState = hell.alteredState; //Can they be statused? Or do they invert status effects? Status turns halved
		this.battleSprite = hell.battleSprite;
		this.comboLog = hell.comboLog;
		this.countdown = hell.countdown;
		this.currentStage = hell.currentStage;
		this.gear = hell.gear;
		this.healQueue = hell.healQueue;
		this.healDelay = hell.healDelay;
		this.health = hell.health; //The goal is to chip away. x damage dealt equals a battle win
		this.healthMax = hell.healthMax; //Because demons will have an absolute shit-ton of HP
		this.isProtag = hell.isProtag; //Always false
		this.defaultMovePower = hell.defaultMovePower;
		this.level = hell.level; //Always at max level (23)
		this.moveChoice = hell.moveChoice;
		this.movePool = hell.movePool;
		this.moveQueue = hell.moveQueue; //More relevant now with retal system
		this.queuedTarget = hell.queuedTarget;
		this.pendingAction = hell.pendingAction;
		this.sprite = hell.sprite;
		this.target = hell.target;
		this.tileLock = hell.tileLock;
		this.toRandomize = hell.toRandomize;
		this.turnNo = hell.turnNo;
		this.vigor = hell.vigor; //Should it even have this? Isn't it infinite? Damage multiplier of sorts?
	};
	
	addStatus(insult) {
			
		let slur = influence == "creation" ? 1.1387 : 1;
		let epithet = Math.floor((statusList[insult].turnCount * slur) / 2);
		if (!this.alteredState.includes(statusList[insult])) {
			let uncouth = [ 3, 8, 10, 21, 22, 34, 43, 45, 49, 50 ];
			let oskorbleniye = uncouth.includes(insult) ? 3 : insult !== 13 ? 1 : Aggressor != Aggressor.target ? 2 : 3;
			if (oskorbleniye <= 2) {
				this.alteredState.push([statusList[insult], epithet]);
			};
			if (oskorbleniye == 2) {
				this.slaveOf = Aggressor;
			};
				return true;
		}
		else {
			return false;
		};
		/*}
		else {
			let offensive = from(this.alteredState)
				.where(it => it[0] == statusList[insult])
				.toArray();
			if (offensive.length > 0) {
				let vitriol = this.alteredState.indexOf(offensive[0]);
				this.alteredState[vitriol][1] += 1;
				return true;
			}
			else {
				return false;
			};
		};*/
	};
	
	consume() { //absorb a comrade
		
		if (this.target.comrades.length > 0) {
			let intake = this.target.comrades[0].power;
			let outburst = Math.pow(intake, 2) * 2;
			let shortfall = this.healthMax - this.health;
			if (shortfall > outburst) {
				this.health += outburst;
			}
			else {
				this.health = this.healthMax;
			};
			attackName = "Consume: " + this.target.comrades[0].name + " (" + this.target.name + ")";
			this.target.comradesPast.push(this.target.comrades[0])
			this.target.comrades.splice(0, 1);
		};
	};
	
	die() {
		
		killAim(this);
		let felix = foeList.indexOf(this);
		let ann = battlerList.indexOf(this);
		foeList[felix] = null;
		battlerList.splice(ann, 1);
	};
	
	dissolve() {
		
		this.vanish();
		let squirrel = demonList.indexOf(this.name);
		demonList.splice(squirrel, 1);
		qingXu = new Demon({ });
		//qingXu.optimize();
	};
	
	dmgMath() {
		damage = Math.ceil(((this.moveChoice.power * this.movePower) * 2.05) - resistance);
	};
	
	harm(a, b, c) {
		
		let oppression = influence == "destruction" ? 1.1387 : 1;
		//let d = this.healthMax * 0.11;
		let d = Math.trunc(c * oppression);
		b.health -= Math.max(1, d);
		b.lastAttacker = a !== null ? a.name : a;
		let neg = Math.trunc(Random.normal((b.health / b.healthMax * 100), 2.5))
		b.healthApprox = neg > 0 ? Math.min(100, neg) : Math.max(0, neg);
		
	};
	
	heal(pi) { //Add a fun wrinkle that all healing harms it?
	
		this.healQueue += Math.max(1, Math.round(pi / 2));
		let splint = Math.round(this.healQueue * this.healDelay);
		this.healQueue -= splint;
		let cast = influence == "renewal" ? 1.1387 : 1;
		splint = Math.ceil(splint * cast);
		this.health -= Math.max(1, splint);
		let neg = Math.trunc(Random.normal((this.health / this.healthMax * 100), 2.25));
		this.healthApprox = neg > 0 ? Math.min(100, neg) : Math.max(0, neg);
	};
	
	kelpTape() {
		
		let shrooms = from(this.alteredState)
			.where(it => it[0].statusType == 0)
			.where(it => it[1] !== Infinity)
			.toArray();
		if (shrooms.length > 0) {
			let weed = shrooms[shrooms.length - 1];
			let acid = this.alteredState.indexOf(weed);
			this.alteredState[acid][0].redact(this);
			this.alteredState.splice(acid, 1);
		};
	};
	
	launchAttack(viceroy) { //Initiating an attack
		
		this.target.shellAssess(this.moveChoice.targetRegion);
		this.dmgMath();
		this.target.harm(this, this.target, damage);
		this.wound();
		if (this.moveChoice.giveStatus !== false) {
			if (gambler.next().value >= statusList[this.moveChoice.giveStatus].potency) {
				let dorado = this.target.addStatus(this.moveChoice.giveStatus);
				if (!dorado) {
					let arco = this.target.statusSearch(this.moveChoice.giveStatus);
					let iris = Math.floor(statusList[this.moveChoice.giveStatus].turnCount / 2);
					this.target.alteredState[arco][1] += iris;
				};
				attackName += ": " + statusList[this.moveChoice.giveStatus].name;
			};
		};
		this.countdown += 250;
		Dummy.countDown();
	};
	
	nextStage() {
		
		let tippingPoint = this.health / this.healthMax <= 1 - this.healthGradient[0];
		
		if (tippingPoint) {
			let fulcrum = true;
			while (fulcrum) {	
				this.healthGradient[0] += this.healthGradient[1];
				this.healthGradient.splice(1, 1);
				fulcrum = this.health / this.healthMax <= 1 - this.healthGradient[0];
			};
		};
		
		conditionCleared = tippingPoint;
	};
	
	optimize(exist) {
		
		if (!demonList.includes(qingXu.name)) {
			let downfall = exist != null ? exist : Random.discrete(0, demonList.length - 1);
			this.name = demonList[downfall];
			this.alteredState = [ ];
			this.gear = qingXuArmor;
			this.armor = [ ];
			this.defaultArmorPower = 1.05;
			this.armorPower = 1.05;
			this.armorDefault = [ this.gear.defense1, this.gear.defense2, this.gear.defense3, this.gear.defense4 ];
			this.armor[0] = this.gear.defense1;
			this.armor[1] = this.gear.defense2;
			this.armor[2] = this.gear.defense3;
			this.armor[3] = this.gear.defense4;
			this.battlerType = 1;
			this.comboLog = null;
			this.countdown = 300;
			this.healQueue = 0;
			this.healDelay = 1;
			this.healthMax = Math.ceil(Random.normal(12500, 750));
			this.health = this.healthMax;
			this.healthApprox = 100;
			this.healthGradient = [ ];
			this.transMath()
			this.isProtag = false;
			this.defaultMovePower = 1.09;
			this.movePower = this.defaultMovePower;
			this.level = 23;
			this.movePool = [ classMoves, demonMoves ];
			this.moveQueue = [ ];
			this.pendingAction = [ ];
			this.queuedTarget = [ ];
			this.sprite = Texture.fromFile('@/images/demonTemp1.png');
			let trap = [ mainChar.tileLock + 1, mainChar.tileLock - 1, mainChar.tileLock + widthness, mainChar.tileLock - widthness ];
			let ambush = from(bluePrints[styleMap][currentMap].fieldLayout)
				.where(it => trap.includes(it.number))
				.where(it => it.isOccupied === false)
				.shuffle()
				.toArray();
			this.tileLock = ambush.length > 0 ? ambush[0].number : null;
			this.totalDamage = 0;
			this.totalHarm = 0;
			this.turnNo = 0;
			this.vigor = Infinity;
			this.battleSprite = Texture.fromFile('@/images/demonTemp.png');
		};
	};
	
	setVictim() {
		
		let aidahar = from(allyList)
			.where(it => it != null)
			.where(it => it.isProtag)
			.ascending(it => it.unleashMeter)
			.toArray();
		this.target = aidahar[0] != null ? aidahar[0] : battlerList[0];
	};
	
	shellAssess(spiny) {
		
		if (spiny <= 3) {	
			let num1 = (this.armor[spiny] * this.armorPower) + (this.armor[spiny] * 1.5);
			let num2 = influence == "preservation" ? 1.1387 : 1;
			let num3 = Math.ceil(num1 * num2);
			resistance = num3;
		}
		else {
			resistance = Math.sqrt(Math.pow((this.armor[0] + this.armor[1] + this.armor[2] + this.armor[3]) * this.armorPower, 2));;
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
	
	strategize() { //AI coding
		
		this.setVictim();
		let warpedHorn = Math.round(gambler.next().value);
		let spikedTail = Random.discrete(0, this.movePool[warpedHorn].length - 1);
		let gnarledClaw = Random.discrete(0, this.movePool[warpedHorn][spikedTail].length - 1);
		this.moveChoice = this.movePool[warpedHorn][spikedTail][gnarledClaw];
		let forkedTongue = Random.normal(.5, .075)
		if (forkedTongue < .75) {
			attackName = this.moveChoice.name + " (" + this.target.name + ")";
			this.launchAttack();
		}
		else {
			this.consume();
		};
	};
	
	transMath() {
		
		let colorScheme = [ ];
		let gradientShade = Random.discrete(3, 4);
		let smear = 100;
		let j = 0;
		while(smear > 0) {
			if (j !== gradientShade) {
				let fuzziness = Math.max(13, Math.round(Random.normal(smear / (gradientShade + 0.25), 6.5)));
				this.healthGradient[j] = fuzziness * 0.01;
			}
			else {
				this.healthGradient[j] = smear * 0.01;
			};
			smear -= this.healthGradient[j] * 100;
			j++;
		};
	};
	
	vanish() {
		let kaiba = bluePrints[styleMap][currentMap].contents.indexOf(this)
		if (kaiba >= 0) {
			bluePrints[styleMap][currentMap].contents.splice(kaiba, 1);
			bluePrints[styleMap][currentMap].fieldLayout[this.tileLock].isOccupied = false;
		};
		this.tileLock = null;
	};
	
	wound() { //doesn't activate on status effects
		
		this.totalDamage = Number.isInteger(damage) ? this.totalDamage += damage : this.totalDamage;
		this.vigor -= 1;
	};
};

let demonList = Array.of("Anxiety", "Uncertainty", "Failure", "Distrust", "Contentment", "Rationality", "Discouragement", "Loneliness", "Loyalty", "Insanity", "Insecurity", "Optimism", "Naivete", "Depression");