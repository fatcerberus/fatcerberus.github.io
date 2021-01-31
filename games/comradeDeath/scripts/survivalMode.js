//What good is a battle engine without a survival mode?
//Can switch battlers every 3 fights, maybe change for longer streaks.
//Healed after every other fight.

import { from, Music, Prim, Thread } from '/lib/sphere-runtime.js';
import { drawMenu, levelAdjust, makeAList, randoFoe, terminalFrost } from './functions.js';
import { personaList } from './personas.js';


export default
class survivalFight extends Thread
{
	constructor() {
		
		super();
		
		this.doShow = true;
		this.RaNuGe = [ ];
		this.shouldChange = true;
		this.harrow = 0;
		this.halo = 0;
		this.typo = null;
	}
	
	on_startUp() {
		
		survivalTime = this;
		this.takeFocus();
		this.regurgitate = sourceFeed;
		sourceFeed = 2;
		this.vessel = [ Array.of(), Array.of() ];
		this.firstFight = true;
		this.picturePerfect = gameImage;
		this.keyPad = [Key.Enter, Key.P];
		gameImage = 4;
		this.storageSlot = universalDynamicLevel;
		universalDynamicLevel = 23;
		for (let j = 0; j < partyList.length; j++) {
			this.vessel[j].push(partyList[j].agent.weapon);
			this.vessel[j].push(partyList[j].agent.gear);
			this.vessel[j].push(partyList[j].agent.health);
			this.vessel[j].push(partyList[j].agent.healthMax);
			this.vessel[j].push(partyList[j].agent.stash);
			this.vessel[j].push(partyList[j].agent.stock);
			this.vessel[j].push(partyList[j].agent.comrades);
			this.vessel[j].push(partyList[j].agent.comradesPast);
			this.vessel[j].push(partyList[j].agent.unleashMeters);
			levelAdjust(true, false, j);
		};
	}
	
	on_inputCheck() {
		
		this.typo = Keyboard.Default.getKey();
	}
	
	on_update() {
		
		while (charList.length < 9) {
			NPC.createNew();
			this.shouldChange = true;
		};
		
		this.halo = this.harrow % 2;
		//if (this.halo == 0 && !this.firstFight) {
		if (this.harrow === 3) {
			for (let h = 0; h < partyList.length; h++) {
				partyList[h].rejuvenate();
			};
		};
		
		if (this.shouldChange) {
			this.RaNuGe.length = 0;
			makeAList(this.RaNuGe, charList, personaList.length - 1);
			this.shouldChange = false;
		};
		
		if (this.typo == Key.Down && menuScroll < charList.length - 1) {
			menuScroll++;
		}
		else if (this.typo == Key.Up && menuScroll > 0) {
			menuScroll--;
		};
		
		if (this.regurgitate !== 4 && this.keyPad.includes(this.typo)) {
			charList[menuScroll].morph(this.RaNuGe[menuScroll]);
			if (partyList.length < 2) { //Add a protag
				battlerList.push(charList[menuScroll].agent);
				bodyList.push(charList[menuScroll].agent);
				partyList.push(charList[menuScroll]);
			}
			else {
				let duckTales = this.keyPad.indexOf(this.typo);
				battlerList[duckTales] = charList[menuScroll].agent;
				bodyList[duckTales] = charList[menuScroll].agent;
				partyList[duckTales] = charList[menuScroll];
			};
			charList.splice(menuScroll, 1);
			menuScroll = 0;
		};

		if ((this.typo == Key.S && partyList.length > 0) || (partyList.length == 2 && this.harrow < 3)) {
			randoFoe(this.RaNuGe);
			menuScroll = 0;
			menuNo = -1;
			battleActive = true;
			Music.override('@/music/Tower-of-Death.ogg'); //Set the mood
		};
		
		if (battleActive) {
			menu = "";
			moveSeq = 0;
			damage = "Empty";
			this.firstFight = false;
			this.shouldChange = true;
			this.harrow = this.harrow === 3 ? 0 : this.harrow + 1;
			this.suspend();
			universeGalaxy[3].start();
		};
		if (this.typo == Key.X) {
			this.stop();
		};
	}
	
	on_render() {
		
		Prim.blit(Surface.Screen, 0, 0, backImage[gameImage]);
		Prim.drawSolidRectangle(Surface.Screen, 250, 0, 83, 29, Color.Chartreuse, Color.DarkGreen);
		Prim.drawRectangle(Surface.Screen, 250, 0, 83, 29, 2, Color.Black);
		Font.Default.drawText(Surface.Screen, 263, 8, "Start! (S)", Color.Brown);
		drawMenu(0, 29, 50, 30, charList, 4, null, Color.PurwaBlue);
		Prim.drawSolidCircle(Surface.Screen, 0, 29 * (menuScroll + 1), 2, Color.Lime);
		Prim.drawSolidRectangle(Surface.Screen, 385, 310, 180, 25, Color.Brown);
		Prim.drawRectangle(Surface.Screen, 385, 310, 180, 25, 2, Color.Black);
		Font.Default.drawText(Surface.Screen, 390, 315, charList[menuScroll].level + " " + personaList[this.RaNuGe[menuScroll]].name, Color.Blue);
		if (battlerList.length > 0) {
			Prim.drawSolidEllipse(Surface.Screen, 320, 310, 70, 15, Color.White);
			Font.Default.drawText(Surface.Screen, 302, 302, battlerList[battlerList.length - 1].name, Color.Red);
		};
	}
	
	on_shutDown() {
		
		if (!firstLaunch) {
			sourceFeed = this.regurgitate;
			gameImage = this.picturePerfect;
			universalDynamicLevel = this.storageSlot < 5 ? 5 : this.storageSlot;
			for (let j = 0; j < partyList.length; j++) {
				partyList[j].rejuvenate();
				partyList[j].agent.movePool.length = 0;
				partyList[j].agent.gear = this.vessel[j].length > 0 ? this.vessel[j][1] : allArmorList[0];
				partyList[j].agent.armoryRun("initial");
				let scaleDown = this.vessel[j].length === 0 && partyList[j].level !== universalDynamicLevel;
				levelAdjust(this.regurgitate !== 4, scaleDown, j);
				if (this.vessel[j].length > 0) {
					partyList[j].agent.weapon = this.vessel[j][0];
					partyList[j].agent.health = this.vessel[j][2];
					partyList[j].agent.healthMax = this.vessel[j][3];
					partyList[j].agent.stash = this.vessel[j][4];
					partyList[j].agent.stock = this.vessel[j][5];
					partyList[j].agent.comrades = this.vessel[j][6];
					partyList[j].agent.comradesPast = this.vessel[j][7];
					partyList[j].agent.unleashMeters = this.vessel[j][8];
				};
			};
			let upsurge = terminalFrost();
			if (!upsurge) {
				if (universeGalaxy[0].running) {
					universeGalaxy[0].resume();
				}
				else {
					universeGalaxy[0].start();
				};
			};
		};
	}
}

export let survivalTime = new survivalFight;
