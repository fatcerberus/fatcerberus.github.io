//For exporting and importing save data

import { from, Random } from '/lib/sphere-runtime.js';
import { emptyShell } from './personas.js';

export function lineChange() { //export
	
	let timeless = from(allWeaponsList[6])
		.where(it => allWeaponsList[6].indexOf(it) > 8)
		.toArray();
	for (let j = 0; j < timeless.length; j++) {
		timeless[j].battleSprite[0] = timeless[j].battleSprite[0].fileName;
		timeless[j].battleSprite[1] = timeless[j].battleSprite[1].fileName;
	};
	
	let immortal = from(allArmorList)
		.where(it => allArmorList.indexOf(it) > 3)
		.toArray();
	/*for (let j = 0; j < immortal.length; j++) {
		immortal[j].battleSprite[0] = immortal[j].battleSprite[0].fileName;
		immortal[j].battleSprite[1] = immortal[j].battleSprite[1].fileName;
	};*/
	
	let eternal = [
		alphaTime,
		chance,
		//charList; //all existing character options
		currentMap,
		divineWill,
		dropItem,
		forecast,
		foreCaster,
		gameImage,
		gameMode,
		ilapse,
		ilapsian,
		influence,
		influenceShade,
		knowledgeBank,
		knowledgeBase,
		//masterList, //ALL the characters ever created
		//Nomad,
		output,
		//saveVersion,
		sourceFeed,
		styleMap,
		gambler.state,
		universalDynamicLevel,
	];
	
	let ageless = [ ]
	for (let j = 0; j < worldMap.length; j++) {
		for (let q = 0; q < worldMap[j].length; q++) {
			for (let i = 0; i < worldMap[j][q].landscape.length; i++) {
				ageless[i] = obstacles.indexOf(worldMap[j][q].landscape[i].sprite);
			};
		};
	};
	
	let forever = from(masterList)
		.where(it => !partyList.includes(it))
		.where(it => !recruitList.includes(it))
		.toArray();
	
	let interminable = from(bluePrints[1])
		.where(it => it.contents.length > 0)
		.toArray();
	
	let classic = [ partyList, eternal, timeless, immortal, worldMap, qingXu, recruitList, ageless, forever, interminable, makeShift, saveVersion ];
	return classic;
};


// BREAK!!!! BELOW THIS IS THE IMPORT OF SAVED DATA ///


export async function loadOut(sub, bus, usb, sbu, ubs, bsu, nub, bun, ubn, unb) { //Agent, personaList, Weapon, superPool, weaponUnleashMoves, Armor, Character, Obstacle, statusList, Absolved
	
	makeShift[1][0] = retroLancer[10][1][0];
	makeShift[5][0] = retroLancer[10][5][0];
	let snazzy = from(retroLancer[10][0][0])
		.where(it => it != null)
		.where(it => it.name == "Absolved")
		.toArray();
	if (snazzy.length > 0) {
		makeShift[0][0].push(makeShift[0][2]);
		bus.push(unb);
		bus[bus.length - 1].classify();
	};
	
	
	alphaTime = retroLancer[1][0];
	chance = retroLancer[1][1];
	currentMap = retroLancer[1][2];
	divineWill = retroLancer[1][3];
	dropItem = retroLancer[1][4];
	forecast = retroLancer[1][5];
	foreCaster = retroLancer[1][6]
	gameImage = retroLancer[1][7];
	gameMode = gameMode === "Default" ? retroLancer[1][8] : gameMode;
	ilapse = retroLancer[1][9];
	ilapsian = retroLancer[1][10];
	influence = retroLancer[1][11];
	influenceShade = retroLancer[1][12];
	knowledgeBank = retroLancer[1][13];
	knowledgeBase = retroLancer[1][14];
	/*Nomad.isVisible = retroLancer[1][13].isVisible;
	Nomad.fatigue = retroLancer[1][13].fatigue;
	Nomad.tileLock = retroLancer[1][13].tileLock;*/
	output = retroLancer[1][15];
	sourceFeed = retroLancer[1][16];
	styleMap = retroLancer[1][17];
	gambler.state = retroLancer[1][18];
	universalDynamicLevel = retroLancer[1][19];
	
	for (let j = 0; j < retroLancer[2].length; j++) {
		let rawr = new usb ({ name: retroLancer[2][j].name, style: retroLancer[2][j].style, range: retroLancer[2][j].range,
			grade: retroLancer[2][j].grade, weaponType: retroLancer[2][j].weaponType, robustness: retroLancer[2][j].robustness,
			isLocked: retroLancer[2][j].isLocked });
		let wishyWashy = rawr.weaponType === "Shield" ? "Trident" : rawr.weaponType;
		let whimsical = [ new String("@/images/" + wishyWashy.toLowerCase() + "Alt-0"), new String("@/images/" + wishyWashy.toLowerCase() + "Alt-1") ];
		let mischievous = [ FS.fullPath(`${whimsical[0]}.png`), FS.fullPath(`${whimsical[1]}.png`) ];
		rawr.battleSprite = [
			//await Texture.fromFile(retroLancer[2][j].battleSprite[0]),
			//await Texture.fromFile(retroLancer[2][j].battleSprite[0]),
			await Texture.fromFile(mischievous[0]),
			await Texture.fromFile(mischievous[1]),
		];
		allWeaponsList[6].push(rawr);
	};
	
	
	for (let j = 0; j < retroLancer[3].length; j++) {
		let yip = new bsu  ({ name: retroLancer[3][j].name, grade: retroLancer[3][j].grade, defense1: retroLancer[3][j].defense1,
			defense2: retroLancer[3][j].defense2, defense3: retroLancer[3][j].defense3, defense4: retroLancer[3][j].defense4, vim: Infinity});
		/*yip.battleSprite = [
			await Texture.fromFile(retroLancer[3][j].battleSprite[0]),
			await Texture.fromFile(retroLancer[3][j].battleSprite[0]),
		];*/
		allArmorList.push(yip);
	};
	
	
	let grumpy = from(retroLancer[9])
		.selectMany(it => it.contents)
		.where(it => it.agent != null)
		.toArray();
	retroLancer[8].unshift(...retroLancer[0], ...retroLancer[6], ...grumpy);
	while (masterList.length < retroLancer[8].length) {
		for (let j = 0; j < retroLancer[8].length; j++) {
			//Put the good stuff here
			let crazed = new nub ({ });
			let timid = null;
			masterList.push(crazed);
			masterList[j].persona = [ ];
			if (retroLancer[8][j].agent != null) {
				timid = new sub ({ movePoolBase: [ ] });
				timid.psychUp();
				timid.name = retroLancer[8][j].agent.name;
				timid.battlerType = retroLancer[8][j].agent.battlerType;
				timid.berserkSuit = retroLancer[8][j].agent.berserkSuit;
				timid.comrades = retroLancer[8][j].agent.comrades;
				timid.comradesPast = retroLancer[8][j].agent.comradesPast;
				timid.deathFlag = retroLancer[8][j].agent.deathFlag;
				timid.defaultArmorPower = retroLancer[8][j].agent.defaultArmorPower;
				timid.defaultMovePower = retroLancer[8][j].agent.defaultMovePower;
				timid.expPoints = retroLancer[8][j].agent.expPoints;
				timid.gear = retroLancer[8][j].agent.gear;
				timid.hasAlly = retroLancer[8][j].agent.hasAlly;
				timid.health = retroLancer[8][j].agent.health;
				timid.healthMax = retroLancer[8][j].agent.healthMax;
				timid.isProtag = retroLancer[8][j].agent.isProtag;
				timid.isVirgin = retroLancer[8][j].agent.isVirgin;
				timid.level = retroLancer[8][j].agent.level;
				timid.movePoolBase = retroLancer[8][j].agent.movePoolBase;
				timid.stash = retroLancer[8][j].agent.stash;
				timid.stock = retroLancer[8][j].agent.stock;
				timid.unleashMeters = retroLancer[8][j].agent.unleashMeters;
				timid.weapon = retroLancer[8][j].agent.weapon;
		
				let shy = from(allArmorList, mythicalArmorList)
					.where(it => it.name == timid.gear.name)
					.toArray();
				if (shy.length > 0) {
					timid.gear = shy[0];
				};
				timid.armoryRun("initial");
				for (let q = 0; q < timid.comrades.length; q++) {
					let vain = from(makeShift[4][0])
						.where(it => it.name == timid.comrades[q].name)
						.toArray();
					if (vain.length > 0) {
						timid.comrades[q] = vain[0];
					};
				};
				for (let q = 0; q < timid.comradesPast.length; q++) {
					let haughty = from(makeShift[4][0])
						.where(it => it.name == timid.comradesPast[q].name)
						.toArray();
					if (haughty.length > 0) {
						timid.comradesPast[q] = haughty[0];
						
						let naughty = from(timid.berserkSuit)
							.where(it => it != null)
							.where(it => it.name == haughty[0].name)
							.toArray();
						if (naughty.length > 0) {
							timid.berserkSuit[timid.berserkSuit.indexOf(naughty[0])] = haughty[0];
						};
					};
				};
				for (let q = 0; q < timid.stock[0].length; q++) {
					let proud = from(makeShift[2][0])
						.where(it => it.name == timid.stock[0][q].name)
						.toArray();
					if (proud.length > 0) {
						timid.stock[0][q] = proud[0];
					};
				};
				for (let q = 0; q < timid.stash[0].length; q++) {
					let snooty = from(makeShift[3][0])
						.where(it => it.name == timid.stash[0][q].name)
						.toArray();
					if (snooty.length > 0) {
						timid.stash[0][q] = snooty[0];
					};
				};
				for (let q = 0; q < timid.weapon.length; q++) {
					let aloof = from(allWeaponsList)
						.selectMany(it => it)
						.where(it => it.name == timid.weapon[q].name)
						.toArray();
					if (aloof.length > 0) {
						timid.weapon[q] = aloof[0];
						if (retroLancer[8][j].agent.weapon[q].power !== undefined) {
							timid.weapon[q].power = retroLancer[8][j].agent.weapon[q].power;
							timid.weapon[q].robustness = retroLancer[8][j].agent.weapon[q].robustness;
							timid.weapon[q].isLocked = retroLancer[8][j].agent.weapon[q].isLocked;
						}
						else {
							timid.seizeWeapon(q, retroLancer[8][j].agent.weapon[q]);
						};
					};
				};
				for (let q = 0; q < retroLancer[8][j].agent.movePoolBase.length; q++) {
					let perky = from(bus)
						.where(it => it.name == retroLancer[8][j].persona[0].name)
						.toArray();
					let lenient = from(bus[bus.indexOf(perky[0])].moves)
						.where(it => it.name == retroLancer[8][j].agent.movePoolBase[q].name)
						.toArray();
					if (lenient.length > 0) {
						timid.movePoolBase[q] = lenient[0];
					};
				};
			};
		
			masterList[j].name = retroLancer[8][j].name;
			masterList[j].level = retroLancer[8][j].level;
			masterList[j].levelSeries = retroLancer[8][j].levelSeries;
			if (retroLancer[8][j].persona.length > 0) {
				if (retroLancer[8][j].persona[0].name === "Iconoclast") {
					masterList[j].persona[0] = emptyShell;
				}
				else {
					let meek = from(bus)
						.where(it => it.name == retroLancer[8][j].persona[0].name)
						.toArray();
					masterList[j].persona[0] = meek[0];
					masterList[j].persona[0].stratPref = [ ];
				};
				if (timid !== null) {
					timid.persona = masterList[j].persona[0];
				};
			}
			masterList[j].agent = timid;
			masterList[j].aura = retroLancer[8][j].aura;
			masterList[j].activeSprite = charSprites[Random.discrete(0, charSprites.length - 1)];
			masterList[j].sprite = retroLancer[8][j].sprite;
			masterList[j].tileLock = retroLancer[8][j].tileLock;
			masterList[j].lastTile = retroLancer[8][j].lastTile;
			masterList[j].isFacing = retroLancer[8][j].isFacing;
			masterList[j].isInternationalist = retroLancer[8][j].isInternationalist;
			masterList[j].isRevisionist = retroLancer[8][j].isRevisionist;
			masterList[j].justWait = retroLancer[8][j].justWait;
			masterList[j].currentStage = retroLancer[8][j].currentStage;
			masterList[j].provisions = retroLancer[8][j].provisions;
			masterList[j].reputation = retroLancer[8][j].reputation;
			masterList[j].credit = retroLancer[8][j].credit;
			
			
			for (let q = 0; q < masterList[j].provisions[0].length; q++) {
				let sullen = from(makeShift[7][0])
					.where(it => it.name == masterList[j].provisions[0][q].name) //masterList[j].provisions.includes(it)
					.toArray();
				if (sullen.length > 0) {
					masterList[j].provisions[0][q] = sullen[0];
				};
			};
		};
	};
	
	
	if (retroLancer[5].name !== undefined) {
		qingXu.optimize();
		qingXu.name = retroLancer[5].name;
		qingXu.alteredState = retroLancer[5].alteredState;
		qingXu.comboLog = retroLancer[5].comboLog;
		qingXu.countdown = retroLancer[5].countdown;
		qingXu.currentStage = retroLancer[5].currentStage;
		qingXu.healQueue = retroLancer[5].healQueue;
		qingXu.healDelay = retroLancer[5].healDelay;
		qingXu.health = retroLancer[5].health;
		qingXu.healthGradient = retroLancer[5].healthGradient != null ? retroLancer[5].healthGradient : qingXu.healthGradient;
		qingXu.healthMax = retroLancer[5].healthMax;
		qingXu.healthApprox = retroLancer[5].healthApprox == null ? 100 : retroLancer[5].healthApprox;
		qingXu.moveQueue = retroLancer[5].moveQueue;
		qingXu.pendingAction = retroLancer[5].pendingAction;
		qingXu.queuedTarget = retroLancer[5].queuedTarget;
		qingXu.target = retroLancer[5].target;
		qingXu.tileLock = retroLancer[5].tileLock;
		qingXu.turnNo = retroLancer[5].turnNo;
		
			if (qingXu.alteredState.length > 0) {
			for (let j = 0; j < qingXu.alteredState.length; j++) {
				let brazen = from(ubn)
					.where(it => it.name == qingXu.alteredState[j][0].name)
					.toArray();
				if (brazen.length > 0) {
					qingXu.alteredState[j][0] = brazen[0];
				};
			};
		};
	};
	
	
	let cruel = [ ];
	for (let j = 0; j < retroLancer[4].length; j++) {
		worldMap[j] = Array.of();
		for (let q = 0; q < retroLancer[4][j].length; q++) {
			let sneaky = from(bluePrints[0])
				.where(it => it.name == retroLancer[4][j][q].name)
				.toArray();
			//Nested loop for map contents
			for (let i = 0; i < retroLancer[4][j][q].contents.length; i++) {
				let banal = [ ];
				let nerdy = 0;
				if (retroLancer[4][j][q].contents[i].name == qingXu.name) {
					retroLancer[4][j][q].contents.splice(i, 1);
				}
				else {
					while (banal.length === 0) {
						banal = from(makeShift[nerdy][0])
							.where(it => it.name == retroLancer[4][j][q].contents[i].name)
							.toArray();
						if (banal.length > 0) {
							let maniacal = makeShift[nerdy][0].indexOf(banal[0]);
							banal[0].tileLock = retroLancer[4][j][q].contents[i].tileLock;
							if (nerdy === 0) {
								banal[0] = new makeShift[0][3] ({ name: retroLancer[4][j][q].contents[i].name, tileLock: retroLancer[4][j][q].contents[i].tileLock,
									doorWay: retroLancer[4][j][q].contents[i].doorWay, memberList: [ ], kingPin: null });
								banal[0].sprite = banal[0].name == "Absolved" ? makeShift[0][2].sprite : makeShift[nerdy][0][maniacal].sprite;
								for (let r = 0; r < retroLancer[4][j][q].contents[i].memberList.length; r++) {
									let fierce = from(masterList)
										.where(it => it.name == retroLancer[4][j][q].contents[i].memberList[r].name)
										.toArray();
									banal[0].memberList[r] = fierce[0];
									if (retroLancer[4][j][q].contents[i].kingPin != null) {
										if (fierce[0].name == retroLancer[4][j][q].contents[i].kingPin.name) {
											banal[0].kingPin = fierce[0];
										};
									};
								};
								makeShift[nerdy][0][maniacal] = banal[0];
							}
							else if (nerdy === 1) {
								banal[0] = new makeShift[1][2] ({ name: retroLancer[4][j][q].contents[i].name, armorShop: retroLancer[4][j][q].contents[i].armorShop,
									isMainstream: retroLancer[4][j][q].contents[i].isMainstream, tileLock: retroLancer[4][j][q].contents[i].tileLock });
								banal[0].wares = [ ];
								if (ilapsian[0] + ilapse[1] > Date.now()) {
									for (let r = 0; r < retroLancer[4][j][q].contents[i].wares.length; r++) {
										let giddy;
										if (retroLancer[4][j][q].contents[i].wares[0].weaponType != null) {
											giddy = from(allWeaponsList)
												.selectMany(it => it)
												.where(it => it.name == retroLancer[4][j][q].contents[i].wares[r].name)
												.toArray();
										}
										else {
											 giddy = from(allArmorList)
												.where(it => it.name == retroLancer[4][j][q].contents[i].wares[r].name)
												.toArray();
										};	
										banal[0].wares.push(giddy[0]);
									};
									ilapsian[0] = Date.now();
								};
								banal[0].sprite = banal[0].isMainstream ? brandName[0] : brandName[1];
								makeShift[nerdy][0][maniacal] = banal[0];
							}
							else if (nerdy === 5) {
								banal[0] = new makeShift[5][2] ({ name: retroLancer[4][j][q].contents[i].name, itemSale: retroLancer[4][j][q].contents[i].itemSale,
									isMainstream: retroLancer[4][j][q].contents[i].isMainstream, tileLock: retroLancer[4][j][q].contents[i].tileLock, wares: [ ] });
								banal[0].wares = [ ];
								if (ilapsian[1] + ilapse[1] > Date.now()) {
									for (let r = 0; r < retroLancer[4][j][q].contents[i].wares.length; r++) {
										let worldly;
										let wise = retroLancer[4][j][q].contents[i].wares[0].techType === 1 ? 3 : 2;
										worldly = from(makeShift[wise][0])
											.where(it => it.name == retroLancer[4][j][q].contents[i].wares[r].name)
											.toArray();
										banal[0].wares.push(worldly[0]);
									};
									ilapsian[1] = Date.now();
								};
								banal[0].sprite = banal[0].isMainstream ? shopFront[0] : shopFront[1];
								makeShift[nerdy][0][maniacal] = banal[0];
							}
							else {
								makeShift[nerdy][0][maniacal].tileLock = banal[0].tileLock;
							};
							sneaky[0].contents.push(makeShift[nerdy][0][maniacal]);
						}
						nerdy++;
					};
				};
			};
			for (let i = 0; i < retroLancer[4][j][q].landscape.length; i++) {
				let angry = new bun ({ })
				angry.name  = retroLancer[4][j][q].landscape[i].name;
				angry.tileLock = retroLancer[4][j][q].landscape[i].tileLock;
				angry.sprite = retroLancer[7][i] == 0 ? obstacles[0] : obstacles[1];
				sneaky[0].landscape.push(angry);
			};
			sneaky[0].mining = retroLancer[4][j][q].mining;
			sneaky[0].isDecorated = retroLancer[4][j][q].isDecorated;
			let caring = bluePrints[0].indexOf(sneaky[0]);
			bluePrints[0][caring] = sneaky[0];
			worldMap[j].push(bluePrints[0][caring]);
			cruel.push(bluePrints[0][caring]);
			bluePrints[0].splice(caring, 1);
		};
	};
	bluePrints[0] = cruel;
	
	
	for (let j = 0; j < retroLancer[10][0][4].length; j++) {
		let goofy = from(makeShift[0][0])
			.where(it => it.name == retroLancer[10][0][4][j])
			.toArray();
		let flippant = makeShift[0][0].indexOf(goofy[0]);
		makeShift[0][4].push(retroLancer[10][0][4][j]);
	};
	
		
	for (let j = 0; j < retroLancer[9].length; j++) {
		let funny = from(bluePrints[1])
			.where(it => it.name == retroLancer[9][j].name)
			.toArray();
		let clumsy = bluePrints[1].indexOf(funny[0]);
		for (let q = 0; q < retroLancer[9][j].contents.length; q++) {
			let gracious = from(masterList)
				.where(it => it.name == retroLancer[9][j].contents[q].name)
				.toArray();
			bluePrints[1][clumsy].contents[q] = gracious[0];
		};
		bluePrints[1][clumsy].isDecorated = true;
	};
	
	let gallant = retroLancer[0];
	let solemn = partyList;
	while (partyList.length + recruitList.length < retroLancer[0].length + retroLancer[6].length) {
		for (let j = 0; j < gallant.length; j++) {
			let passive = from(masterList)
				.where(it => it.name == gallant[j].name)
				.toArray();
			solemn.push(passive[0]);
			if (solemn == partyList) {
				mainChar = j == 0 ? solemn[j] : mainChar;
				//solemn[j].agent.persona.stratPref = [ ];
				battlerList.push(solemn[j].agent);
				bodyList.push(solemn[j].agent);
			};
		};
		gallant = gallant = retroLancer[0] ? retroLancer[6] : retroLancer[0];
		solemn = solemn == partyList ? recruitList : partyList;
	};
	
	let vibing = [ ];
	for (let j = 0; j < charOptions.length; j++) {
		let happy = from(masterList)
			.where(it => it.name == charOptions[j])
			.toArray();
		if (happy.length === 0) {
			vibing.push(charOptions[j]);
		};
	};
	charOptions.length = 0;
	charOptions.push(...vibing);
};