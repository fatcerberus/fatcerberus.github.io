//First take at a battle system thread

import { from, Prim, Random, Thread } from '/lib/sphere-runtime.js';
//import { dojoSchool } from './dojoScript.js';
//import { worldView } from './fieldScript.js';
import { appearify, deadWood, drawBattleMenu, drawBattleSprites, drawMenu, drawMenuSorter, gpsMe, intransigenceMeter, playerWin, randoFoe, sortOut } from './functions.js';
import { emptyShell, personaList } from './personas.js';
//import { survivalTime } from './survivalMode.js';


export default
class battleScript extends Thread
{
	constructor() {
		super();
		
		this.doShow = true;
	}

	on_startUp() {

		crossSwords = this;
		this.takeFocus();
		//mainChar.agent.stash[0].push(makeShift[3][0][12]) //funFume
		//mainChar.agent.stash[1].push(5);
		//emptyShell.classify();
		let opus;
		for (let gung = 0; gung < battlerList.length; gung++) {
			let milo = battlerList[gung];
			let flip = from(partyList)
				.where(it => it.agent == battlerList[gung])
				.toArray();
			let gi = flip.length > 0 ? 1 : 0;
			opus = milo.battlerType == 0 ? milo.assignRole(gi) : foeList.push(milo);
			opus = milo.battlerType == 0 ? milo.battlePrep() : null;
		};
		attackName = "Comrade Death demands bloodshed!"
		this.revUp = false;
		this.successor = false;
		timeBump = (30 - universalDynamicLevel) / 0.0165;
		Dummy.countDown();
	}

	on_inputCheck() {

		typo = Keyboard.Default.getKey();
	};

	on_update() {
		
		if (battleActive) {
			actPause = gameMode === "Dynamic" && moveSeq == 0 ? 0 : (((timeCheck + timeBump) - Sphere.now()) * .0165);
			
			if (launchCode && !conditionCleared) {
				let drSeuss = intransigenceMeter(mainChar.potentialRecruit.isInternationalist, 1);
				if (drSeuss && battleActive) {
					battlerList.splice(battlerList.indexOf(mainChar.potentialRecruit.agent), 1);
					conditionCleared = true;
				};
			};
			
			if (foeList.length == 1 && foeList[0].battlerType == 1 && foeList[0].healthGradient.length > 1 && !conditionCleared) {
				foeList[0].nextStage();
			};
			
			if (actPause <= 0 && gameMode !== "Classic") {
				scrollLock = true;
				menu = "";
				menuScroll = -1;
				sortOut(false, Aggressor, Dummy, battlerList);
			};
			
			let keyList = [ "t", "w", "m", "r", "b", "u", "c", "a", "s", ];
			if (!scrollLock && moveSeq !== 3) {
				if (typo != null && keyList.includes(Keyboard.Default.charOf(typo))) {
					this.doShow = true;
					menuScroll = 0;
					menuNo = keyList.indexOf(Keyboard.Default.charOf(typo))
					menu = menuList[menuNo]; }
				else if (typo == Key.Escape) {
					menu = "";
					menuNo = -1;
					menuScroll = 0;
				};
				if (typo == Key.Right && menuNo < menuList.length - 1) {
					menuNo++;
					menuScroll = 0;
					menu = menuList[menuNo];
				}
				else if (typo == Key.Left && menuNo > 0) {
					menuNo--;
					menuScroll = 0;
					menu = menuList[menuNo];
				}
				else if (typo == Key.Up) {
					if (menuScroll > 0) {
						menuScroll--;
					}
					else {
						menu = "";
						this.doShow = false;
					};
				}
				if (typo == Key.Down && this.doShow == false) {
					--menuScroll;
					this.doShow = true;
					menu = menuList[menuNo];
				};
				if (menu != "" && typo == Key.Enter && !this.doShow) {
					this.doShow = true;
				};
				if ((typo == Key.Enter) && (this.doShow)) {
					this.revUp = true;
				};
				if ((typo == Key.Space)) {
					let vacuum = [ "Weapons", "Comrades", "Moves", "Restore", "Subterfuge", "Qi Unleash" ];
					this.revUp = this.doShow && vacuum.includes(menu) ? true : false;
					preview = true;
				};

				if (menu === "Comrades") {
					if (typo == Key.Down && menuScroll < Aggressor.comrades.length - 1) {
						++menuScroll;
					};
					
					if (this.revUp) {
						sortOut(menuScroll, Aggressor, Dummy, battlerList);
						menuNo = -1;
						menu = "";
						menuScroll = 0;
						this.revUp = false;
					}
				};

				if (menu === "Moves") {
					if (typo == Key.Down && menuScroll < Aggressor.movePool.length -1) {
						++menuScroll;
					};
					
					if (this.revUp) {
						sortOut(menuScroll, Aggressor, Dummy, battlerList);
						menuNo = -1;
						menu = "";
						menuScroll = 0;
						this.revUp = false;
					}
				};

				if (menu === "Restore") {
					if (typo == Key.Down && menuScroll < Aggressor.stock[0].length -1) {
						++menuScroll;
					};

					if (this.revUp) {
						sortOut(menuScroll, Aggressor, Dummy, battlerList);
						menuNo = -1;
						menu = "";
						menuScroll = 0;
						this.revUp = false;
					}
					else if (typo == Key.Enter && !this.doShow) {
						this.doShow = true;
					};
				};

				if (menu === "Subterfuge") {
					if (typo == Key.Down && menuScroll < Aggressor.stash[0].length -1) {
						++menuScroll;
					}
					
					if (this.revUp) {
						sortOut(menuScroll, Aggressor, Dummy, battlerList);
						menuNo = -1;
						menu = "";
						menuScroll = 0;
						this.revUp = false;
					}
				};

				if (menu === "Targets") {
					if (typo == Key.Down && menuScroll < battlerList.length - 1) {
						++menuScroll;
					};
					
					if (this.revUp) {
						Aggressor.setVictim(menuScroll);
						menu = "";
						menuNo = -1;
						menuScroll = 0;
						this.revUp = false;
					};
					
					if ((typo == Key.N) && (this.doShow) && !aggro && passAlong !== null) {
						let verbatim = foeList[0] == null ? true : foeList[0].battlerType == 0 ? true : false;
						if ((Aggressor.hasAlly === false || Aggressor.hasAlly.deathFlag == true) && verbatim && sourceFeed != 2) {
							sortOut(null, Aggressor, Dummy, battlerList);
							menu = "";
							menuScroll = 0;
							menuNo = -1;
						};
					};
				};

				if (menu === "Qi Unleash") {
					if (typo == Key.Down && menuScroll < Aggressor.specialMoves.length - 1) {
						++menuScroll;
					};
					
					if (this.revUp) {
						if (Aggressor.specialMoves[menuScroll].drain <= Aggressor.unleashMeter /*|| moveSeq == 1*/) {
							sortOut(menuScroll, Aggressor, Dummy, battlerList);
						}
						else {
							attackName = "Great math there. Try again."
							Aggressor.harm(null, Aggressor, Aggressor.healthMax * .001);
							menu = "";
							timeBump += 11; //Add ~.2 seconds to the timer. This also will ensure autoBattler triggers on a misfire
						};
						
						menuNo = -1;
						menu = "";
						menuScroll = 0;
						this.revUp = false;
					}
				};

				if (menu === "Weapons") {
					if (typo == Key.Down && menuScroll < Aggressor.weapon.length - 1) {
						menuScroll++;
					}
					
					if (this.revUp || (typo == Key.D0) && (this.doShow)) {
						let ws = typo == Key.D0 ? -1 : menuScroll;
						let sb = ws !== -1 ? true : Aggressor.weaponCurrent.name == "Fists" ? false : true;
						if (sb) {
							sortOut(ws, Aggressor, Dummy, battlerList);
							menu = "";
							menuScroll = 0;
							menuNo = -1;
						};
						this.revUp = false;
					}
				};
			};
		}
		else {
			this.stop();	
		}
	}
	
	on_render() {

		if (battleActive) {
			let tint = sourceFeed === 2 ? Color.DarkViolet : Color.Black; //Color.DeepPink
			Prim.blit(Surface.Screen, 0, 0, backImage[gameImage]);
			Prim.drawSolidRectangle(Surface.Screen, 305, 287, 400, 87, Color.RebeccaPurple, Color.Gray, Color.Orange)
			let newsTicker = "Damage: " + Math.trunc(Math.max(1, damage));
			if (output) {
				Font.Default.drawText(Surface.Screen, 305 + 200 - (Font.Default.widthOf(newsTicker) / 2), Surface.Screen.height / 2 + 10, newsTicker, Color.Black);//Color.of('#391313'));
			};
			let resultative = Font.Default.wordWrap(attackName, 385);
			for (let j = 0; j < resultative.length; j++) {
				let oval = Surface.Screen.height / 2 + 40 + (j * 17);
				let rhombus = 305 + 200 - (Font.Default.widthOf(resultative[j]) / 2);
				Font.Default.drawText(Surface.Screen, rhombus, oval, resultative[j], tint);
			};
			
			drawBattleMenu(menuList, Aggressor.name); //Create a menu
			drawBattleSprites(); //Display surviving battlers' HP meters
			
			if (this.doShow) {
				drawMenuSorter(Aggressor, null);
			};
		};
	}
	
	on_shutDown() {
		
		duckOut = false;
		aggro = false;
		passAlong = null;
		moveSeq = 0;
		menuScroll = 0;
		retalTrigger = false;
		preview = false;
		if (!firstLaunch) {
			//output = 0;
			chance = 0;
			if (launchCode && conditionCleared) {
				mainChar.potentialRecruit.joinParty();
			};
			mainChar.potentialRecruit = null;
			launchCode = false;
			conditionCleared = false;
			if (this.successor) {
				zombie = true;
				let ronin = [ 2, 4, 1 ];
				for (let j = 0; j < ronin.length; j++) {
					if (universeGalaxy[ronin[j]].running) {
						universeGalaxy[ronin[j]].stop();
					};
				};
				let samurai = gpsMe();
				if (samurai !== false) {
					let teleport = from(bluePrints[0])
						.where(it => it.contents.includes(makeShift[0][0][samurai]))
						.toArray();
					currentMap = bluePrints[0].indexOf(teleport[0]);
					universeGalaxy[1].num = samurai;
					sourceFeed = 4;
					universeGalaxy[2].start();
					//universeGalaxy[2].suspend();
					//universeGalaxy[1].start();
				};
				this.successor = false;
			}
			else {
				if (sourceFeed !== 2) {
					for (let j = 0; j < partyList.length; j++) {
						partyList[j].struggleOn();
					};			
					if (sourceFeed === 1) {
						if (NPClist[0].tileLock == null) {
							NPC.bandit();
						};	
						universeGalaxy[2].resume();
					}
					else if (sourceFeed === 3) {
						universeGalaxy[1].resume();
					};
				}
				else {
					universeGalaxy[4].resume();
				};
			};
		}
		else {
			styleMap = 0;
			currentMap = 0;
			zombie = false;
			for (let j = 0; j < universeGalaxy.length; j++) {
				if (universeGalaxy[j].running) {
					universeGalaxy[j].stop();
				};
			};
			tovarishch.start();
		};
	}
}

export let crossSwords = new battleScript;