/*
 *  <Comradier Death>
 *  (c) <2018> <Giraffe-ic Mayhem>
 */

import { Console, from, Logger, Music, Pact, Prim, Random, Scene, Thread } from '/lib/sphere-runtime.js';
import { Agent } from './agents.js';
import { Armor, baseArmor, chainArmor, ghoulArmor, jadeArmor, qingXuArmor, preservationArmor, renewalArmor, creationArmor, destructionArmor } from './armor.js';
import { itemList } from './battleItems.js';
import { crossSwords } from './battleScript.js';
import { veilOfElysium } from './celestialRealm.js';
import { Character } from './characters.js';
import { comradePosse } from './comrades.js';
import { Demon } from './demons.js';
import { dojoList } from './dojo.js';
import { dojoSchool } from './dojoScript.js';
import { loadOut } from './endAndSave.js';
import { worldView } from './fieldScript.js';
import { Forge, forgeList } from './forges.js';
import { rawMaterials } from './forgeables.js';
import { chamberRound, deadWood, drawMenu, fossilization, mixItUp, Obstacle } from './functions.js';
import { healList, } from './items.js';
import { Weapon, skeletalWeapons, crimsonWeapons, chrysocollaWeapons, masterWeapons, mythicalWeapons, transcendentalWeapons, specialtyWeapons } from './mainWeapons.js';
import { mappy } from './maps.js';
import { superPool } from './movepools.js';
import { Absolved, personaList } from './personas.js';
import { Dealer, dealerShops } from './shops.js';
import { shrineList } from './shrine.js';
import { statusList } from './statuses.js';
import { survivalTime } from './survivalMode.js';
import { weaponUnleashMoves } from './unleashes.js';
import './cutscenes.js';


export default
class MyGame extends Thread
{
	constructor() {
		
		super();  // call the superclass constructor

		this.angiesList = [ ];
		this.craigsList = [ ];
		this.crypt = "Today's cryptogram is: ";
		this.customizeMenu = 0;
		this.teamSport = 0;
		this.veer = 2;
		this.personalize = false;
		
		global.actPause = 0;
		global.Aggressor = null;
		global.aggro = false;
		global.allArmorList = Array.of(baseArmor, jadeArmor, ghoulArmor, chainArmor);
		global.allWeaponsList = Array.of(skeletalWeapons, crimsonWeapons, chrysocollaWeapons, masterWeapons, mythicalWeapons, transcendentalWeapons, specialtyWeapons);
		global.allyList = [ ];
		global.alphaTime = Date.now();
		global.agentList = [ ];
		global.attackName = "Go Team Venture!";
		global.backImage = [ ];
		global.battleActive = false;
		global.battleType = "Default";
		global.battlerList = [ ];
		global.bluePrints = mappy;
		global.bodyList = [ ];
		global.brandName = [ ];
		global.chance = 0; //for holding random numbers
		global.charList = [ ];
		global.charOptions = [ "Aztrinu", "Bevoxan", "Bxadinr", "Cosiek", "Cyxro", "Dirjopa", "Dyuvalh", "Enlkoci", 
			"Gjiiqot", "Hnothnr", "Inothel", "Krzueom", "Kswuvis", "Lyzexuk", "Mzuilno", "Ocixar", "Temuyz", "Ubaij",
			"Vndesar", "Voigen",
		];
		global.charSprites = [ ];
		global.conditionCleared = false;
		global.console = new Console({ hotKey: Key.Tilde });
		global.currentMap = 0 //index number of bluePrints;
		global.cycleNo = 1;
		global.damage = "Empty";
		global.divineWill = 1;
		global.doubleTeam = false;
		global.dropItem = null; //For gaining cool stuff
		global.duckOut = false; //For fleeing
		global.Dummy = new Agent({ name: "Dummy", alteredState: statusList }); //For use in activating turn system and other actions without impacting battlers
		global.dummySprite = null;
		global.easterEgg = null;
		global.effectChance = 0;
		global.enduranceTest = false;
		global.fieldSquares = [ ];
		global.firstLaunch = true;
		global.foeList = [ ];
		global.forecast = [ ];
		global.foreCaster = 0;
		global.forest = [ ];
		global.gambler = RNG.fromSeed(Random.normal(99989, 61));
		global.gameImage = 3;
		global.gameMode = "Default";
		global.healOrHarm = 0; //Determines if damage will cause harm or healing. True is heal, false is harm
		global.hedwig //= new Logger('@/treePage');
		global.heightness = 0;
		global.ilapse = [ 300000, 300000 ]; //time lag for character-based actions and shops
		global.ilapsian = [ alphaTime - 300000, alphaTime - 300000 ]; //forges, shops
		global.influence = null;
		global.influenceShade = Color.White;
		global.itemUsed = 0;
		global.knowledgeBank = [
		Array.of(
		"There are four great forces: destruction, creation, preservation, and renewal.",
		"The goddess destroyed herself to end the great battle.",
		"I may be a squirrel, but you are a nut.",
		"Obtaining a goddess crystal privilges you to found your own dojo.",
		"Comrades will continue to protect you after healing you.",
		"Those with a poor reputation can always rely on traders of similar ill repute.",
		"One without a clear mind will no doubt fall prey to merciless QingXu.",
		),
		Array.of(),
		 ];
		global.knowledgeBase = [ ];
		global.launchCode = false;
		global.mainChar = new Character({ name: "empty"});
		global.mainCharSprite = null;
		global.makeShift = [
			dojoList, //0
			forgeList, //1 [ Array.of(), Array.of() ],
			healList, //2
			itemList, //3
			comradePosse, //4
			dealerShops, //5 [ Array.of(), Array.of() ],
			shrineList, //6
			rawMaterials, //7
		];
		global.masterList = [ ]; //ALL the characters ever created
		global.memo = "Reapers eat apples.";
		global.menu = "";
		global.menuNo = -1;
		global.menuList = [
			"Targets",
			"Weapons",
			"Moves",
			"Restore",
			"Subterfuge",
			"Qi Unleash",
			"Comrades",
			"Alterations",
			"Status",
		];
		global.menuScroll = 0;
		global.moveSeq = 0;
		global.mythicalArmorList = [
			qingXuArmor,
			preservationArmor,
			renewalArmor,
			creationArmor,
			destructionArmor,
		];
		global.Nomad = new Character ({ name: "Nomad", lastTile: [ ], });
		Nomad.visible = false;
		Nomad.fatigue = false;
		global.NPC = new Character({ name: "NPC" });
		global.NPClist = [ ];
		global.obstacles = [ ];
		global.output = 1;
		global.Oracle = new Character ({ name: "Oracle", justWait: alphaTime - 300000, });
		Oracle.fatigue = false;
		global.oracleSprite = null;
		global.partyList = [ ];
		global.passAlong = null;
		global.pendingWeapon = null;
		global.preview = false; //determines if player wants to view retal menu
		global.practiceFight = false;
		global.qingXu = new Demon({ });
		global.recruitList = [ ];
		global.resetDojo = null;
		global.resistance = 0;
		global.retalTrigger = false;
		global.retroLancer = null;
		global.saveFace = "~/saveFile";
		global.saveVersion = 3;
		global.scrollLock = false; //Make sure the player is allowed to navigate menus
		global.Sheath = new Weapon({ name: "Sheath" }); //Dummy weapon, if needed
		global.shopFront = [ ];
		global.sourceFeed = 0; //Which thread fed in?
		global.styleMap = 0; //Dojo or field indicator
		global.tempMenuOutput = null;
		global.timeBump = 1765; //647; //Set the timer -- Currently at ~30 seconds
		global.timeCheck = 0;
		global.timeOut = 1; //For setting the timer
		global.tochki = [ ]; //Determining where the sacred sites are
		global.typo = null; //Key input getter
		global.universalDynamicLevel = 1;
		global.universeGalaxy = [
			veilOfElysium, //0
			dojoSchool, //1
			worldView, //2
			crossSwords, //3
			survivalTime, //4
		];
		global.versatileNames = [Array.of("Calm", "Warm", "Searing", "Warped"), Array.of("gulf", "gust", "miasma", "wood", "stream",)];
		global.weatherPatterns = [
		Array.of(.15, .03, .08, .17, .13),
		Array.of("rain", "snow", "humidity", "gust", "fog"),
		//rain reduces armor effectiveness
		//snow adds .5 to rank
		//humidity reduces healing or vigor?
		//gust reduces melee damage
		//fog reduces projectile damage
		];
		global.weatherRadar = 0;
		global.welcomeMat = null;
		global.widthness = 0;
		global.worldMap = [	];
		global.zangetsu = [ ];
		global.zombie = false;
		
		console.defineObject('bgm', null, {
			'override'(fileName) { Music.override(fileName); },
			'pop'() { Music.pop(); },
			'play'(fileName) { Music.play(FS.fullPath(`${fileName}.ogg`, 'music')); },
			'push'(fileName) { Music.push(FS.fullPath(`${fileName}.ogg`, 'music')); },
			'reset'() { Music.reset(); },
			'stop'() { Music.override(null); },
			'volume'(value) { Music.adjustVolume(value); },
		});
		console.defineObject('stealth', null, { 'kill'() { comradePosse[0][0].apocalypse(battlerList) }, });		
	}
		
	async on_startUp() {
		
		tovarishch = this;
		this.takeFocus();
		backImage = [
			await Texture.fromFile('@/images/aha.png'), //0
			await Texture.fromFile('@/images/battlefield.png'), //1
			await Texture.fromFile('@/images/gameOver3.png'), //2
			await Texture.fromFile('@/images/victory.png'), //3
			await Texture.fromFile('@/images/victory1.png'), //4
		];
		brandName = [
			await Texture.fromFile('@/images/turan1.png'),
			await Texture.fromFile('@/images/puck1.png'),
		];
		charSprites = [
			await Texture.fromFile('@/images/barys4.png'),
			await Texture.fromFile('@/images/dinamo4.png'),
		];
		obstacles = [
			await Texture.fromFile('@/images/tarja1.png'), //Fauna
			await Texture.fromFile('@/images/ulquiorra1.png'), //Rock
		];
		shopFront = [
			await Texture.fromFile('@/images/dealership1.png'),
			await Texture.fromFile('@/images/dealta1.png'),
		];
		welcomeMat = await Texture.fromFile('@/images/lenin0.png');
		easterEgg = await Texture.fromFile('@/images/easterEgg.png');
		dummySprite = await Texture.fromFile('@/images/test1.png');
		mainCharSprite = await Texture.fromFile('@/images/mainChar.png');
		oracleSprite = await Texture.fromFile('@/images/oracle0.png');
		let armaldo = !Sphere.Engine.includes("Oozaru") ? fossilization() : [ ];
		duckOut = false;
		launchCode = false;
		personaList[0].classify();
		await chamberRound();
		await new Scene()
			.intro(armaldo)
			.run();
		if (!zombie) {
			mixItUp();
			gameMode = gameMode === "Default" ? "Standard" : gameMode;
		}
		else {
			if (sourceFeed === 0) {
				firstLaunch = false;
				loadOut(Agent, personaList, Weapon, superPool, weaponUnleashMoves, Armor, Character, Obstacle, statusList, Absolved);
			}
		};
	}
	
	on_inputCheck() {
		
		typo = Keyboard.Default.getKey();
	}
	
	async on_update() {
		
		if (typo != null) {this.crypt += Keyboard.Default.charOf(typo); };
		
		if (!battleActive && !firstLaunch && !zombie) {
			while (charList.length < 9) {
				NPC.createNew()
			};
			
			if (memo == "Comrade Death mocks you.") {
				universalDynamicLevel = 1;
				partyList.length = 0;
				NPClist.length = 0;
				this.customizeMenu = 0;
				this.teamSport = 0;
				this.veer = 2;
				scrollLock = false;
			};

			memo = this.customizeMenu == 0 ? "Become yourself" : this.customizeMenu == this.veer - 1 ? "Choose weaponry" : this.customizeMenu == this.veer ? "Solo mission?" : "Select a battle class";
			this.craigsList = this.customizeMenu == 0 ? charList : this.customizeMenu == this.veer - 1 ? allWeaponsList[Math.trunc(mainChar.level / 4.5)] : personaList;
			deadWood(this.craigsList, 0);
		
			if (typo == Key.Down && menuScroll < this.craigsList.length - 1) {
				++menuScroll;
			};
			if (typo == Key.Up && menuScroll > 0) {
				menuScroll--;
			};
			
			if (typo == Key.U && this.veer !== 3) {
				scrollLock = true;
				await new Scene()
					.rename(this.customizeMenu)
					.run();
				this.customizeMenu = this.veer;
				this.menuScroll = 0;
			}
			
			if (typo == Key.Enter && !scrollLock) {
				if (this.customizeMenu == 0) {
					if (partyList.length == 0) {
						mainChar = charList[menuScroll];
					};
					if (this.veer === 3) {
						this.tempWorker = charList[menuScroll];
					}
					else {
						charList[menuScroll].joinParty("x");
						charList.splice(menuScroll, 1);
						this.customizeMenu = this.veer;
					};
					//hedwig.write(mainChar.name);
				}
				else if (this.customizeMenu == 1 && this.veer === 3) {
					this.tempWorker.joinParty(menuScroll);
					let c = charList.indexOf(partyList[this.teamSport]);
					charList.splice(c, 1);
					this.customizeMenu = 2;
				}
				else if (this.customizeMenu == this.veer - 1) {
					partyList[this.teamSport].agent.seizeWeapon(0, this.craigsList[menuScroll]);
				};
				if (this.customizeMenu < this.veer) {
					this.customizeMenu++;
					menuScroll = 0;
				};
			}

			if (this.customizeMenu == this.veer) {
				if (typo == Key.M) {
					Music.push('@/music/Vespertine.ogg');
				};

				let huh = typo == Key.Y ? true : this.teamSport == true ? true : typo == Key.N ? false : null;
				if (huh == false) {
					memo = "Find a suitable partner.";
					menuScroll = 0;
					this.customizeMenu = 0;
					this.teamSport = 1;
				}
				else if (huh && this.veer == 2) {
					memo = "Let's go meet Comrade Death!";
					gameImage = 1;
					this.customizeMenu++;
				}
				else if (huh != null) {
					memo = "";
					menuScroll = 0;
					this.stop();
					survivalTime.start();
				};
			};
			if (typo == Key.Escape && this.customizeMenu == 0) {
				this.veer = 3;
			};
			if (this.customizeMenu > this.veer) {
				this.stop();
				veilOfElysium.start();
			};
		};
		if (zombie) {
			//await chamberRound();
			this.stop();
			worldView.start();
		};
		if (this.crypt == null) {
			this.stop();
		};
	}

	on_shutDown() {
		
		let x = 0;
	}
	
	on_render() {
		
		if (!firstLaunch) {
			Prim.blit(Surface.Screen, 0, 0, backImage[gameImage]);
			Prim.drawRectangle(Surface.Screen, 0, 0, Surface.Screen.width, Surface.Screen.height, 2, Color.Black);
			Font.Default.drawText(Surface.Screen, 20, 700, this.crypt, Color.Maroon, 777);
			Prim.drawSolidRectangle(Surface.Screen, 0, 0, 250, 29, Color.Chartreuse, Color.DarkGreen);
			Prim.drawRectangle(Surface.Screen, 0, 0, 250, 29, 2, Color.Black);
			Font.Default.drawText(Surface.Screen, 10, 10, memo, Color.MidnightBlue);
		};
		if (!firstLaunch && this.customizeMenu < this.veer) {
			if (this.customizeMenu == this.veer - 1) {
				for (let j = 0; j < this.craigsList.length; j++) {
					this.angiesList.push("zh^" + 0);
				};
				drawMenu(0, 29, Font.Default.widthOf(" zh^") + Font.Default.widthOf(" 100,000"), 30, this.craigsList, 0, this.angiesList, Color.PurwaBlue);
			}
			else if (this.veer !== 3) {
				drawMenu(0, 29, 0, 30, this.craigsList, 5, "Custom (U)", Color.PurwaBlue);
			}
			else {
				drawMenu(0, 29, 0, 30, this.craigsList, 4, null, Color.PurwaBlue);
			};
			Prim.drawSolidCircle(Surface.Screen, 1, 29 * (menuScroll + 1), 2, Color.Lime);
		};
	}
}

global.tovarishch = Sphere.main;