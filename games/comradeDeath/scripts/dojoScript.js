//Inside the dojo

import { from, Prim, Random, Scene, Thread } from '/lib/sphere-runtime.js';
import { crossSwords } from './battleScript.js';
import { worldView } from './fieldScript.js';
import { appearify, deadWood, drawCharFieldSprite, drawFieldStatus, fatesAlign, funTimes, loseSteam, mapMove, occupyThis, orientMe, selfSituate, underBurrow } from './functions.js';
import { personaList } from './personas.js';


export default
class fightMilk extends Thread 
{
	constructor() {
		super();
		
		this.image = [ ];
		this.peepList = [ ];
		this.fallBack = [ ];
		this.isArmy = [ ];
		this.num = null;
		this.outRoute = null;
		this.tracker = null;
		this.quasi = null;
		this.semi = null;
		this.charts = [ ];
		this.exhaustList = [ ];
	}
	
	async on_startUp() {
		
		dojoSchool = this;
		this.takeFocus();
		this.bumper = false;
		this.mapStore = currentMap;
		weatherRadar = Sphere.now();
		currentMap = this.num;
		styleMap = 1;
		let protestor = from(makeShift[0][0])
			.where(it => it.name == personaList[this.num].name)
			.toArray()
		occupyThis(makeShift[0][0].indexOf(protestor[0]));
		this.feedBack = sourceFeed;
		sourceFeed = 3;
		funTimes();
		orientMe(false);
		if (this.feedBack !== 4) {
			this.fallBack = from(mainChar.lastTile)
				.where(it => Number.isInteger(it))
				.toArray();
		}
		this.quasi = selfSituate();
		this.pseudo = this.feedBack !== 4 ? worldView.logger : makeShift[0][0][this.num].dustFlap();
		mainChar.tileLock = this.quasi[0][this.pseudo];
		mapMove(0, this.quasi[1][this.pseudo].number);
		bluePrints[styleMap][currentMap].fieldLayout[mainChar.tileLock].isOccupied = true;
		this.exitDoor = mainChar.tileLock;
		mainChar.lastTile.length = 0;
		this.salvo = false;
		this.engrave = partyList[1];
		this.endurance = false;
		this.enough = 0;
		this.peepList = makeShift[0][0][this.num].memberList;
		for (let j = 0; j < this.peepList.length; j++) {
			appearify(this.peepList[j]);
		};
		makeShift[0][0][this.num].kingPin = makeShift[0][0][this.num].kingPin == null ? Random.sample(this.peepList) : makeShift[0][0][this.num].kingPin;
		makeShift[0][0][this.num].kingPin.activeSprite = await Texture.fromFile('@/images/puck2.png'),
		this.kingPin = makeShift[0][0][this.num].kingPin;
		this.biCycle = 0;
		this.transCycle = 0;
		this.zimZalaBimZim = false;
		//this.scyther = true;
		this.oracle = null;
		practiceFight = makeShift[0][0][this.num].name == mainChar.persona[0].name ? true : false;
		this.peripheral = practiceFight;
		if (practiceFight) {
			appearify(Oracle);
			Oracle.fatigue = Oracle.justWait + ilapsian[1] > Date.now() ? false : true;
			/*makeShift[0][0][this.num].oracle = makeShift[0][0][this.num].oracle == null ? Random.sample(this.peepList) : makeShift[0][0][this.num].oracle;
			makeShift[0][0][this.num].oracle.activeSprite = oracleSprite;
			this.oracle = makeShift[0][0][this.num].oracle;*/
		};
	}
	
	on_inputCheck() {
		
		typo = Keyboard.Default.getKey();
	}
	
	async on_update() {
		
		let mammal = Sphere.now() - weatherRadar;
		foreCaster = mammal % 3530;
		if (foreCaster == 0) {
			influence = fatesAlign();
			if (mammal != 0) {
				loseSteam();
			};
		};
		
		if (typo == Key.F1 && !practiceFight) {
			this.peripheral = this.peripheral === true ? false : true;
		};
			
		if (typo == Key.Enter && mainChar.isFacing == Oracle.tileLock) {
			if (practiceFight && !this.zimZalaBimZim) {
				await new Scene()
					.remedy()
					.run();
			};
			if (this.enough > 2) {
				Oracle.fatigue = true;
			};
		};
		
		let interact = from(this.peepList)
			.where(it => it.tileLock == mainChar.isFacing)
			.toArray();
		
		let keyCode1 = [ Key.Up, Key.Left, Key.Down, Key.Right ];
		let keyCode2 = gameMode == "Standard" ? [ "w", "a", "s", "d" ] : [ "u", "h", "j", "k" ];
		if (!scrollLock) {
			if (typo != null && (keyCode1.includes(typo) || keyCode2.includes(Keyboard.Default.charOf(typo)))) {
				this.semi = false;
				this.outRoute = keyCode1.includes(typo) ? keyCode1.indexOf(typo) : keyCode2.indexOf(Keyboard.Default.charOf(typo));
				mainChar.moveMent(this.outRoute);
				this.bumper = mainChar.tileLock == this.exitDoor && this.semi ? true : false;
			};
		};
		
		if (typo == Key.F6) {
			if (partyList.length >= 1 && recruitList.length > 0) {
				let suisei = partyList[1];
				if (suisei != null) {
					partyList.splice(1, 1);
					//recruitList.unshift(suisei);
					recruitList.push(suisei);
					allyList.splice(allyList.indexOf(suisei.agent), 1);
					bodyList.splice(bodyList.indexOf(suisei.agent), 1);
					battlerList.splice(battlerList.indexOf(suisei.agent), 1);
				};
				let wakusei = personaList.indexOf(recruitList[0].persona[0]);
				let hoshi = wakusei >= 0 ? wakusei : recruitList[0].persona.length == 0 ? null : "x";
				if (this.biCycle == recruitList.length - 1 && this.transCycle == 0) {
					this.biCycle++;
					this.transCycle++;
				};
				if (this.biCycle < recruitList.length) {
					recruitList[0].joinParty(hoshi);
					recruitList.splice(0, 1);
					this.biCycle++;
				}
				else {
					this.biCycle = 0;
				};
			};
		};
		
		if (interact.length > 0 && (typo == Key.Enter || typo == Key.P)) {
			let astana = interact[0] == this.kingPin && !this.exhaustList.includes(this.kingPin) ? true : false;
			let budapest = typo == Key.Enter || partyList.length < 2 ? mainChar : partyList[1];
			this.roundUp = budapest.agent.movePoolBase.length;
			let almaty = this.exhaustList.includes(interact[0]) ? true : false;
			let bishkek = this.peepList.length > 1 ? true : false;
			await new Scene()
				.invite(interact[0], budapest, this.num, personaList, false, almaty, astana, bishkek)
				.run();
			if (budapest.agent.movePoolBase.length > this.roundUp) {
				this.exhaustList.push(this.kingPin);
			};	
		};
		
		if (enduranceTest) {
			this.isArmy = from(this.peepList)
				.where(it => it != this.kingPin)
				.where(it => !this.exhaustList.includes(it))
				.toArray();
			this.ammoCount = Math.floor(this.isArmy.length / 2);
			this.zimZalaBimZim = true;
			this.endurance = true;
			enduranceTest = false;
		};
		
		if (this.endurance) {
			let kPop = this.isArmy.length > 0 ? true : false;
			if (kPop) {
				if (this.isArmy.length == this.ammoCount) {
					for (let h = 0; h < partyList.length; h++) {
						partyList[h].rejuvenate();
					};
				};
				this.isArmy[0].morph(this.num);
				battleActive = true;
			}
			else {
				let blackPink = this.exhaustList.includes(this.kingPin) ? true : false;
				if (!blackPink) {
					this.isArmy.push(this.kingPin);
					this.isArmy[0].morph(this.num);
					battleActive = true;
				}
				else {
					this.endurance = false;
				};
			};
		};
		
		if (this.bumper) {
			this.stop();
		};
		
		if (battleActive) {
			this.charts = !this.zimZalaBimZim ? interact : this.isArmy;
			battlerList.push(this.charts[0].agent);
			bodyList.push(this.charts[0].agent);
			let scooby = bluePrints[styleMap][currentMap].contents.indexOf(this.charts[0]);
			let shaggy = this.peepList.indexOf(this.charts[0]);
			if (doubleTeam) {
				let vilma = from(this.peepList)
					.where(it => it != this.kingPin)
					.where(it => it != this.charts[0])
					.ascending(it => Math.abs(bluePrints[styleMap][currentMap].fieldLayout[it.tileLock].horX - bluePrints[styleMap][currentMap].fieldLayout[this.charts[0].tileLock].horX)
						+ Math.abs(bluePrints[styleMap][currentMap].fieldLayout[it.tileLock].verY - bluePrints[styleMap][currentMap].fieldLayout[this.charts[0].tileLock].verY))
					.toArray()
				if (vilma.length > 0) {
					let daphne = this.peepList.indexOf(vilma[0]);
					let fred = bluePrints[styleMap][currentMap].contents.indexOf(vilma[0]);
					await new Scene()
						.confront(mainChar, vilma[0], Array.of(this.exitDoor))
						.run();
					vilma[0].morph(this.num);
					battlerList.push(vilma[0].agent);
					bodyList.push(vilma[0].agent);
					if (!practiceFight) {
						this.peepList.splice(daphne, 1);
						bluePrints[styleMap][currentMap].contents.splice(fred, 1);
						bluePrints[styleMap][currentMap].fieldLayout[vilma[0].tileLock].isOccupied = false;
					}
					else {
						this.exhaustList.push(vilma[0]);
					};
				};
				doubleTeam = false;
			};
			if (!practiceFight) {
				this.peepList.splice(shaggy, 1);
				bluePrints[styleMap][currentMap].contents.splice(scooby, 1)
				bluePrints[styleMap][currentMap].fieldLayout[this.charts[0].tileLock].isOccupied = false;
			}
			else {
				//this.scyther = false;
				this.exhaustList.push(this.charts[0]);
			};
			if (this.zimZalaBimZim) {
				this.isArmy.splice(0, 1);
			};
			this.suspend();
			crossSwords.start();
		};
	}
	
	on_render() {
		
		let jadedView = influence != null ? 0.8 : 1;
		Prim.blit(Surface.Screen, 0, 0, bluePrints[styleMap][currentMap].imagery, influenceShade.fadeTo(jadedView));
		drawCharFieldSprite(mainChar, mainChar.activeSprite);
		let cat = bluePrints[styleMap][currentMap].contents;
		for (let jojo = 0; jojo < bluePrints[styleMap][currentMap].contents.length; jojo++) {
			drawCharFieldSprite(bluePrints[styleMap][currentMap].contents[jojo], bluePrints[styleMap][currentMap].contents[jojo].activeSprite);
		};
		if (practiceFight) {
			drawCharFieldSprite(Oracle, oracleSprite);
		};
		for (let q = 0; q < partyList.length; q++) {
			drawFieldStatus(partyList[q], q, this.peripheral);
		};
	}
	
	on_shutDown() {
		
		if (this.bumper && !firstLaunch) {
			currentMap = this.mapStore;
			if (practiceFight && this.exhaustList.length > 0) {
				for(let j = 0; j < this.exhaustList.length; j++) {
					if (this.exhaustList[j].agent != undefined) {
						this.exhaustList[j].rejuvenate("argh");
					};
				};
			};
			this.exhaustList.length = 0;
			practiceFight = false;
			styleMap = 0;
			sourceFeed = 1;
			mainChar.tileLock = makeShift[0][0][this.num].doorWay;
			mainChar.lastTile = this.fallBack;
			funTimes();
			this.alias = this.pseudo == 0 ? 2 : this.pseudo == 2 ? 0 : this.pseudo == 1 ? 3 : 1;
			underBurrow(makeShift[0][0][this.num].tileLock);
			bluePrints[styleMap][currentMap].fieldLayout[makeShift[0][0][this.num].tileLock].isOccupied = true;
			worldView.resume();
		};
	}
};

export let dojoSchool = new fightMilk;