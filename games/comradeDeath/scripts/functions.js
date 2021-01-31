// A designated page for various useful functions, especially drawing commands

import { from, Music, Prim, Random, Scene, Thread } from '/lib/sphere-runtime.js';
//import { crossSwords } from './battleScript.js';
import { veilOfElysium } from './celestialRealm.js';
//import { Gren } from './dojo.js';
//import { dojoSchool } from './dojoScript.js';
import { lineChange } from './endAndSave.js';
//import { Forge } from './forges.js';
//import { worldView } from './fieldScript.js';
import { Absolved, emptyShell, Persona, personaList } from './personas.js';
//import { Dealer } from './shops.js';
//import { survivalTime } from './survivalMode.js';
//import { shrineList } from './shrine.js';


export function aliasForge(newborn) {
	
	let shiny = from(versatileNames[0]).sample(1).toArray();
	let dull = from(versatileNames[1]).sample(1).toArray();
	let vintage = newborn.weaponType !== undefined ? newborn.weaponType : "Armor";
	let ambivalent = shiny[0] + dull[0] + " " + vintage;
	
	newborn.name = ambivalent;
};


export function appearify(fool, nimrod) {
	
	let q = 0;
	let r = fool.level !== undefined && fool.battlerType !== 1 ? true : false;
	let moron;
	let dunce;
	let idiot;
	let imbecile;
	let twatwaffle;
	let twit;
	let maroon = nimrod == null ? selfSituate() : nimrod;
	let dimwit = false;
	while (q < 1) {
		if (r) {
			idiot = fool.tileLock == null ? false : fool.tileLock < bluePrints[styleMap][currentMap].fieldLayout.length ? true : false;
			dunce = Math.max(0, Random.discrete(0, bluePrints[styleMap][currentMap].tileScroll.length - 1));
			moron = !idiot ? bluePrints[styleMap][currentMap].fieldLayout[dunce].number : fool.tileLock;
		}
		else {
			moron = fool.tileLock == null || fool.tileLock >= bluePrints[styleMap][currentMap].fieldLayout.length - 1 ? Random.discrete(0, bluePrints[styleMap][currentMap].fieldLayout.length - 1) : fool.tileLock;
		};
		twit = !maroon[0].includes(moron) ? true : false;
		imbecile = from(bluePrints[styleMap][currentMap].contents)
			.where(it => it.doorWay != null)
			.where(it => it.doorWay == moron)
			.toArray();
		dimwit = imbecile.length == 0 || fool == mainChar ? true : false;
		twatwaffle = zombie ? true : moron === 0 && fool != mainChar ? false : true;
		if ((bluePrints[styleMap][currentMap].fieldLayout[moron].isOccupied !== true) && dimwit && twit && twatwaffle) {
			bluePrints[styleMap][currentMap].fieldLayout[moron].isOccupied = true;
			fool.tileLock = moron;
			if (r) {
				fool.isFacing = faceTheMusic(moron, widthness);
				fool.sprite = 3;
			};
			q++
		}
		else {
			fool.tileLock = null;
		};
	};
};


export function appraise() {
	
	for (let j = 0; j < makeShift[7].length; j++) {
		makeShift[7][0][j].tileLock = Random.discrete(0, 800);
	};
};


export function bonusReset() { //Nixes all bonuses, such as for a status or an end of battle scenario
		
	let ploy = from(battlerList)
		.where(it => it.battlerType == 0)
		.toArray();
	for (let i = 0; i < ploy.length; i++) {
		ploy[i].friendlyFire = false;
		ploy[i].boostCombo = 1;
		ploy[i].boostStyle = 1;
		ploy[i].boostWeapon = 1;
		ploy[i].movePower = ploy[i].defaultMovePower;
	};
};


export function breakAway() {
	
	let ed = from(makeShift[0][0])
		.where(it => it.name == "Absolved")
		.toArray();
	let faye = ed.length == 0
	if (faye) {
		makeShift[0][0].push(makeShift[0][2]);
		occupyThis(makeShift[0][0].length - 1);
		//let ebisu = Random.discrete(0, bluePrints[0].length - 1);
		bluePrints[0][currentMap].contents.push(makeShift[0][2]);
		openingHours(makeShift[0][2]);
		appearify(makeShift[0][2]);
		universeGalaxy[2].dojoStops.push(makeShift[0][2]);
		universeGalaxy[2].dojoSpots.push(makeShift[0][2].doorWay);
		makeShift[0][4].push("Absolved");
		//makeShift[0].splice(2, 1);
	};
	let spike = !personaList.includes(Absolved) ? personaList.push(Absolved) : null;
	return faye;
};


export function cartography() {
	
	worldMap[0] = Array.of();
	let ink = Random.discrete(2, 4);
	let cubby = 0;
	let quill = from(bluePrints[0])
		.where(it => it != null)
		.shuffle()
		.toArray();
	
	for (let j = 0; j < quill.length; j++) {
		worldMap[cubby].push(quill[j]);
		if (j == ink && j !== quill.length) {
			cubby++
			worldMap[cubby] = Array.of();
			ink = j + Random.discrete(2, 4);
		};
	};
	bluePrints[0] = quill;
	chartMap();
};


export async function chamberRound() {
	
	for (let j = 0; j < bluePrints.length; j++) {
		for (const sketch of bluePrints[j]) {
			sketch.imagery = await sketch.imagery;
		};
	};
	for (let j = 0; j < allWeaponsList.length; j++) {
		for (const sketch of allWeaponsList[j]) {
			sketch.battleSprite[0] = await sketch.battleSprite[0];
			sketch.battleSprite[1] = await sketch.battleSprite[1];
		};
	};
	for (const sketch of makeShift[0][0]) { //dojos
		sketch.sprite = await sketch.sprite;
	};
	/*if (zombie) {
		for (let j = 0; j < partyList.length; j++) {
			for (const sketch of partyList[j].agent.weapon) {
				sketch.battleSprite[0] = await sketch.battleSprite[0];
				sketch.battleSprite[0] = await sketch.battleSprite[0];
			};
		};
	};*/
	makeShift[0][2].sprite = await makeShift[0][2].sprite;
	emptyShell.battleSprite = await emptyShell.battleSprite;
	Absolved.battleSprite = await Absolved.battleSprite;
	Nomad.activeSprite = await Texture.fromFile('@/images/inner4.png');
	/*for (const sketch of makeShift[1][0]) { //forges
		sketch.sprite = await sketch.sprite;
	};*/
	for (const sketch of makeShift[2][0]) { //restoratives
		sketch.sprite = await sketch.sprite;
	};
	for (const sketch of makeShift[3][0]) { //items
		sketch.sprite = await sketch.sprite;
	};
	for (const sketch of makeShift[4][0]) { //comrades
		sketch.sprite = await sketch.sprite;
	};
	/*for (const sketch of makeShift[5][0]) { //dealerships
		sketch.sprite = await sketch.sprite;
	};*/
	for (const sketch of makeShift[6][0]) { //celestial
		sketch.sprite = await sketch.sprite;
	};
	for (const sketch of makeShift[7][0]) { //forgeables
		sketch.sprite = await sketch.sprite;
	};
	for (const sketch of personaList) {
		sketch.battleSprite = await sketch.battleSprite;
	};
};


function chartMap() {
	
	let zeroKM = Math.round(bluePrints[0].length / 2);
	let midPoint = Math.round(worldMap.length / 2);
	let wayPoint = [ "Ruins of Destruction", "Waterfall of Preservation", "Temple of Creation", "Garden of Renewal" ];
	let descriptive = [ " are somewhere in the ", " is said to lie in the ", " lies beyond the formidable ", " is supposedly located on a " ];
	let addendum = [ " reaches.", " part of the world.", " mountains.", " island." ];
	let compass = [ "north", "south", "east", "west" ];
	tochki[0] = "northwestern";
	tochki[1] =  "central";
	knowledgeBank[1].push("The " + wayPoint[0] + descriptive[0] + tochki[0] + addendum[0]);
	knowledgeBank[1].push("The " + wayPoint[1] + descriptive[1] + tochki[1] + addendum[1]);
	for (let j = 2; j < wayPoint.length; j++) {
		let exitRamp = from(bluePrints[0])
			.where(it => it.name === wayPoint[j])
			.toArray();
		let detour = from(worldMap)
			.where(it => it.includes(exitRamp[0]))
			.toArray();
		let freeway = from(worldMap)
			.where(it => it.includes(bluePrints[0][zeroKM]))
			.toArray();
		let bypass = [worldMap.indexOf(detour[0]), worldMap.indexOf(freeway[0]) ];
		let unknown = [ bluePrints[0].indexOf(exitRamp[0]), worldMap[bypass[0]].indexOf(exitRamp[0]), worldMap[bypass[1]].indexOf(bluePrints[0][zeroKM]) ];
		let pointer;
		if (bypass[0] == bypass[1]) {
			pointer = Math.abs(unknown[1] - unknown[2]) <= 1 && worldMap[bypass[0]].length >= 4 ? "central" : unknown[1] - unknown[2] < 0 ? "western" : "eastern";
		}
		else {
			pointer = bypass[0] < bypass[1] ? "north" : "south"
			pointer = Math.abs(unknown[1] - unknown[2]) <= 1 && worldMap[bypass[0]].length >= 4 ? pointer + "ern" : unknown[1] - unknown[2] < 0 ? pointer +  "western" : pointer + "eastern";
		};
		tochki[j] = pointer;
		knowledgeBank[1].push("The " + wayPoint[j] + descriptive[j] + tochki[j] + addendum[j]);
	};
};


export function clickClack(one, two) {
	
	let p = from(bluePrints[styleMap][currentMap].fieldLayout)
		.where(it => it.horX - one <= 0 && it.horX - one > -48)
		.where(it => it.verY - two <= 0 && it.verY - two > -48)
		.toArray();
	let i = p.length > 0 ? p[0].number : null;
	return i;
};


function cordon() {
	
	bluePrints[styleMap][currentMap].fieldLayout.length = 0;
	let e = 0;
	let f = 0;
	for (let g = 0; g < widthness * heightness; g++) {
		bluePrints[styleMap][currentMap].fieldLayout[g] = new fieldTile({horX: e, verY: f, number: g, isOccupied: false});
		bluePrints[styleMap][currentMap].fieldLayout[g].isEdge = [ ];
		if (e == 0) { bluePrints[styleMap][currentMap].fieldLayout[g].isEdge.push("left") };
		if (e == (widthness - 1) * 48) { bluePrints[styleMap][currentMap].fieldLayout[g].isEdge.push("right") };
		if (f == 0) { bluePrints[styleMap][currentMap].fieldLayout[g].isEdge.push("top") };
		if (f == (heightness - 1) * 48) { bluePrints[styleMap][currentMap].fieldLayout[g].isEdge.push("bottom") };
		let h = g == 0 ? false : bluePrints[styleMap][currentMap].fieldLayout.length % widthness == 0 ? true : false;
		if (h) {
			f += 48;
			e = 0;
		}
		else {
			e += 48;
		};
	};
	mapMove(0, 0)
};


export function deadWood(a, b) {
	
	let lump = from(a, b)
		.where(it => it.name != null)
		.distinct(it => it.name)
		.ascending(it => it.name)
		.toArray();
	a.length = 0;
	if (b.length > 0) {
		b.length = 0;
	};
	a.push(...lump)
};


export function deathCheck(qo) { //See if a battler has met a death condition
	
	for (let g = 0; g < qo.length; g++) {
		if (qo[g].health <= 0) {
			qo[g].deathFlag = true;
			//this.persona.ability.activate();
			statusCheck(3) //The only time statusCheck uses Stage 3
		}
		else if ((qo[g].health <= qo[g].healthMax *.11) && (qo[g].statusSearch(27) === false)) {
			qo[g].addStatus(27);
		};
		
		if (qo[g].deathFlag) { //Kill off the deadweight
			qo[g].die(g);
		};
	};
};

	
export function drawBattleMenu(iter, agg) {
			
	for (let x = 0; x < iter.length; x++) {
		Prim.drawSolidRectangle(Surface.Screen, 112 * x, 0, 112, 29, Color.Orange.fadeTo(0.9), Color.Magenta);
		Prim.drawRectangle(Surface.Screen, 112 * x, 0, 112, 29, 1, Color.Black);
		Font.Default.drawText(Surface.Screen, ((112 * x) + 3), 7, iter[x], Color.of('#004d4d'));
	};
	
	if (gameMode === "Standard") {
		let warn = moveSeq == 0 || moveSeq == 3 ? [ Color.Black, Color.Red ] : [ Color.MidnightBlue , Color.Yellow];
		Prim.drawSolidRectangle(Surface.Screen, 112 * iter.length, 0, 52, 29, warn[0]);
		Font.Default.drawText(Surface.Screen, 112 * iter.length + 19, 7, Math.trunc(actPause), warn[1]);
		Prim.drawSolidRectangle(Surface.Screen, 112 * iter.length - 1, 29, 53, 29, warn[0]);
		Font.Default.drawText(Surface.Screen, 112 * iter.length + 1, 36, agg, warn[1]);
	};
};


export function drawBattleSprites() {
	
	let num;
	let horX;
	let verY;
	let offset = [ ];
	let hue;
	let scribble;
	let tint;
	let me;
	let perspective;
	let laoShi;
	let xueSheng;
	
	for (num = 0; num < bodyList.length; num++) {
		laoShi = bodyList[num].unleashMeter === undefined ? Color.Black : bodyList[num].unleashMeter < 40 ? Color.SeaGreen: bodyList[num].unleashMeter < 65 ? Color.SlateBlue : bodyList[num].unleashMeter < 80 ? Color.MidnightBlue : bodyList[num].unleashMeter < 120 ? Color.DarkOrange : Color.DarkMagenta;
		me = bodyList[num].battlerType == 1 ? bodyList[num] : bodyList[num].persona;
		horX = bodyList[num].isProtag ? 685 : 124;
		verY = bodyList[num].hasAlly === false ? 263 : (num % partyList.length === 0) && partyList.length === 2 ? 263 : partyList.length == 1 && (num <= partyList.length) ? 263 : 375;
		offset[1] = verY == 263 ? -145 : 20;
		offset[2] = horX == 124 ? 133 : 0;
		perspective = horX == 124 ? 0 : 1;
		hue = bodyList[num].isProtag ? Color.MediumAquamarine : Color.of('#660000');
		scribble = bodyList[num].deathFlag ? bodyList[num].name + " (vigor): " + bodyList[num].vigor : bodyList[num].isProtag && bodyList[num] == Aggressor ? bodyList[num].name + ":  " + Math.max(0, Math.ceil(bodyList[num].health)) : bodyList[num].name + ":  " + bodyList[num].healthApprox + "%";
		offset[0] = (me.battleSprite.width / 2) - (Font.Default.widthOf(scribble) / 2);
		xueSheng = verY == 263 ? verY - me.battleSprite.height - 2: verY - 2;
		tint = !bodyList[num].deathFlag ? Color.White : Color.Maroon.fadeTo(0.5);
		
//		Prim.drawRectangle(Surface.Screen, horX - 3, xueSheng - 3, me.battleSprite.width + 6, me.battleSprite.height + 26, 3, Color.Black)
		Prim.drawRectangle(Surface.Screen, horX - 2, xueSheng, me.battleSprite.width + 4, me.battleSprite.height + 24, 2, laoShi)
		Prim.drawSolidRectangle(Surface.Screen, horX, verY, me.battleSprite.width, 20, Color.Black);
		Prim.drawSolidRectangle(Surface.Screen, horX, verY, me.battleSprite.width * (Math.max(0, bodyList[num].health / bodyList[num].healthMax)), 20, Color.Black, hue);
		Font.Default.drawText(Surface.Screen, horX + offset[0], verY + 5, scribble, Color.Turquoise);
		Prim.blit(Surface.Screen, horX, verY + offset[1], me.battleSprite, tint);
		if (bodyList[num].battlerType == 0) {
			if (bodyList[num].weaponCurrent.name != "Fists" && !bodyList[num].deathFlag) {
				Prim.blit(Surface.Screen, horX + offset[2], verY + offset[1], bodyList[num].weaponCurrent.battleSprite[perspective]);
			};
		};
	};
};


export function drawCharFieldSprite(model, headshot) {
	
	headshot = model == mainChar ? mainCharSprite : headshot;
	let offset = model.sprite == 0 ? [0, 0] : model.sprite == 1 ? [48, 0] : model.sprite == 2 ? [0, 48] : [48, 48];
	let imlkpo = bluePrints[styleMap][currentMap].tileScroll[0].number > 0 ? bluePrints[styleMap][currentMap].tileScroll[0].number : 0;
	let derive = bluePrints[styleMap][currentMap].fieldLayout[model.tileLock - imlkpo];
	let joStar = model == mainChar ? true : model.tileLock - imlkpo >= 0 ? true : false;
	if (joStar) {
		Prim.blitSection(Surface.Screen, derive.horX, derive.verY, headshot, offset[0], offset[1], 48, 48);
	};
};


export function drawFieldSprite(model, headshot) {

	let kimono = makeShift[0][0].includes(model) && model.name == mainChar.persona[0].name ? welcomeMat : model == Oracle ? oracleSprite : model.weaponType != null || model.defense1 != null  || model[0] != null ? dummySprite : headshot;
	let imlkpo = bluePrints[styleMap][currentMap].tileScroll[0].number > 0 ? bluePrints[styleMap][currentMap].tileScroll[0].number : 0;
	let joStar = model == mainChar ? true : model.tileLock - imlkpo >= 0 ? true : false;
	if (joStar) {
		Prim.blit(Surface.Screen, bluePrints[styleMap][currentMap].fieldLayout[model.tileLock - imlkpo].horX, bluePrints[styleMap][currentMap].fieldLayout[model.tileLock - imlkpo].verY, kimono);
	};
};


export function drawFieldStatus(act, num, expand) {
	
	let horX = (Surface.Screen.width - 128 + (64 * num));
	let verY = 0;
	let size = !expand ? 48 : 108;
	let gap = 12;
	let hue = !expand || (sourceFeed == 3 && practiceFight) ? Color.PurwaBlue : Color.DarkViolet;
	let tint = !expand ? 0.4 : (sourceFeed == 3 && practiceFight) ? 0.4 : 0.8;
	
	Prim.drawSolidRectangle(Surface.Screen, horX, verY, horX, size, Color.Black.fadeTo(tint));
	Font.Default.drawText(Surface.Screen, horX + 2, verY + 1, act.name, hue);
	Font.Default.drawText(Surface.Screen, horX + 2, verY + gap, "Level " + act.level, hue);
	Prim.drawSolidRectangle(Surface.Screen, horX + 1, verY + (gap * 2) + 1, 62 * Math.max(0, act.agent.health / act.agent.healthMax), gap, Color.Chartreuse.fadeTo(tint));
	Font.Default.drawText(Surface.Screen, horX + 2, verY + (gap * 2) + 1, Math.max(0, act.agent.health) + "/" + act.agent.healthMax, hue);
	Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 3, "zh^" + Math.trunc(act.credit), hue);
	
	if (expand) {
		Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 4, act.persona[0].name, hue);
		let weap = act.agent.weapon.length > 0 ? act.agent.weapon[0].name : "No Weapon";
		let script = Font.Default.wordWrap(weap, horX / 2);
		let arms = act.agent.gear != null ? act.agent.gear.name : "No Armor";
		let coatOf = Font.Default.wordWrap(arms, horX / 2);
		Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 5, script, hue);
		Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 6, coatOf, hue);
		Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 7, "Rep: " + act.reputation.toFixed(2), hue);
		let hole = act.agent.expPoints == null ? 0 : act.agent.expPoints;
		let deficit = ((act.levelSeries[act.level] - hole) / 1000)
		Font.Default.drawText(Surface.Screen, horX + 2, verY + gap * 8, "XP: " + deficit.toFixed(1) + "k", hue);
	};
};


export function drawMenu(x, y, a, b, you, us, we, paint) {
	
	let gumgum;
	let luffy;
	if (you != null) {
		gumgum = from(you)
			.where(it => it.name != null)
			.descending(it => Font.Default.widthOf(it.name))
			.toArray();
		if (gumgum.length == 0) {
			luffy = from(you)
			.where(it => it != null)
			.descending(it => Font.Default.widthOf(it))
			.toArray();
		};
		let devilFruit = gumgum.length !== 0 ? gumgum[0].name : luffy[0];
		a = Math.max(a + Font.Default.widthOf(devilFruit) + 30, 112);
	};
	
	let next = 0;
	paint = paint !== undefined ? paint: Color.Chocolate;
	if (us <= 4) {
		while (next < you.length) {
			Prim.drawSolidRectangle(Surface.Screen, x, y, a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.9)); //Color.of('#4d004d'), Color.of('#cc00cc')
			Prim.drawRectangle(Surface.Screen, x, y, a, b, 1, Color.Black);
			if (us == 0) {
				let writeIn = you[0].grade == null ? "" : you[0].weaponType == null ? "(Armor)" : " (" + you[next].weaponType + ")";
				Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name + " " + we[next] + writeIn, paint);
			}
			else if (us == 1) {
				Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name + " " + we[next], paint);
			}
			else if (us == 2) {
				Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name + " " + you[next].drain, paint);
			}
			else if (us == 3) {
				Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next][0].name + " " + you[next][1], paint);
			}
			else if (us == 4) {
				Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name, paint);
			};
			y += 29;
			next++;
		};
	}
	else if (us == 5) {
		Prim.drawSolidRectangle(Surface.Screen, x, y * (you.length + 1), a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.7));
		Prim.drawRectangle(Surface.Screen, x, y * (you.length + 1), a, b, 1, Color.Black);
		Font.Default.drawText(Surface.Screen, x + 3, (y * (you.length + 1)) + 7, we, paint);
		for (next = 0; next < you.length; next++) {
			Prim.drawSolidRectangle(Surface.Screen, x, y, a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.7)); //Color.of('#4d004d'), Color.of('#cc00cc')
			Prim.drawRectangle(Surface.Screen, x, y, a, b, 1, Color.Black);
			Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name, paint);
			y += 29;
		};
	}
	else if (us == 6) {
		while (next < you.length) {
			Prim.drawSolidRectangle(Surface.Screen, x, y, a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.7));
			Prim.drawRectangle(Surface.Screen, x, y, a, b, 1, Color.Black);
			Font.Default.drawText(Surface.Screen, x + 3, y + 7, you[next], paint);
			y += 29;
			next++;
		};
	}
	else if (us == 7) {
		while (next < you.length) {
			Prim.drawSolidRectangle(Surface.Screen, x, y, a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.7));
			Prim.drawRectangle(Surface.Screen, x, y, a, b, 1, Color.Black);
			Font.Default.drawText(Surface.Screen, x + 5, y + 7, you[next].name + " " + we[you[next].targetRegion], paint);
			y += 29;
			next++;
		};
	}
	else if (us == 8) {
		while (next < you.length) {
			Prim.drawSolidRectangle(Surface.Screen, x, y, a, b, Color.MidnightBlue.fadeTo(0.9), Color.Crimson.fadeTo(0.7));
			Prim.drawRectangle(Surface.Screen, x, y, a, b, 1, Color.Black);
			Font.Default.drawText(Surface.Screen, x + 3, y + 7, you[next] + "  " + us[next], paint);
			y += 29;
			next++;
		};
	};
};


export function drawMenuSorter(agg, override) {
		
	let details = [ ];
	let span = 0;
	let quest = true;
	let shade = Color.Chocolate;
	
	switch(menu) {
		
		case "Alterations":
			details = [agg.alteredState, 3, null];
			span = Font.Default.widthOf(" 20");
			quest = agg.HUD.includes("ailment") ? false : true;
		break;
		case "Comrades":
			details = [agg.comrades, 4, null];
		break;
		case "Moves":
			let fishHead = ["(H)", "(A)", "(B)", "(L)", "(N/A)"];
			span = Font.Default.widthOf(" (A)");
			details = [agg.movePool, 7, fishHead];
		break;
		case "Restore":
			details = [agg.stock[0], 1, agg.stock[1]];
			span = Font.Default.widthOf(" 20");
		break;
		case "Status":
			let a = Math.trunc(agg.health) + " / " + agg.healthMax;
			let b = "Vigor: " + agg.vigor;
			let c = agg.weaponCurrent.name;
			let d = agg.gear.name;
			let e = "Qi Unleash: " + agg.unleashMeter + "%";
			let f = agg.lastAction[agg.lastAction.length - 1] == null ? "Inactive" : "Last: " + agg.lastAction[agg.lastAction.length - 1].name;
			let g = agg.target != null ? "Targeting: " + agg.target.name : "Targeting: Self";
			let h = agg.persona.ability;
			let i = "Cycle Number: " + (cycleNo - 1);
			details = [ Array.of(a, b, c, d, e, f, g, h, i), 6, null ];
			span = 
			quest = agg.HUD.includes("status") ? false : true;
			shade = Color.PurwaBlue;
		break;
		case "Subterfuge":
			details = [agg.stash[0], 1, agg.stash[1]];
			span = Font.Default.widthOf(" 20");
		break;
		case "Targets":
			let tick = foeList[0] == null ? true : foeList[0].battlerType == 0 ? true : false;
			let flea = (agg.hasAlly === false || bodyList[agg.hasAlly].deathFlag == true) && tick && !aggro && sourceFeed !== 2 && passAlong !== null ? 5 : 4;
			span = flea ? Font.Default.widthOf(" (N)") : 0;
			details = [ battlerList, flea, "Negotiate (N)"];
		break;
		case "Qi Unleash":
			details = [agg.specialMoves, 2, null];
			span = Font.Default.widthOf(" 120");
		break;
		case "Weapons":
			let scope = agg.weaponCurrent.name == "Fists" && agg.weapon.length < 3 && scrollLock ? 5 : 4;
			details = [agg.weapon, scope, "Seize (Z)"];
		break;
		
	};
	
	if (quest || override != null) {
		drawMenu(112 * menuList.indexOf(menu), 29, span, 29, details[0], details[1], details[2], shade);
		Prim.drawSolidCircle(Surface.Screen, 112 * menuList.indexOf(menu), 29 * (menuScroll + 1), 2, Color.Lime);
	};	
}


export function drawWoodsyOwl(ponytail) {
	
	let imlkpo = bluePrints[styleMap][currentMap].tileScroll[0].number > 0 ? bluePrints[styleMap][currentMap].tileScroll[0].number : 0;
	let pigtails = ponytail.tileLock - imlkpo >= 0 ? true : false;
	if (pigtails) {
		Prim.blit(Surface.Screen, bluePrints[styleMap][currentMap].fieldLayout[ponytail.tileLock - imlkpo].horX, bluePrints[styleMap][currentMap].fieldLayout[ponytail.tileLock - imlkpo].verY, ponytail.sprite);
	};
};


export function emissionCheck() {
	
	for (let j = 0; j < bodyList.length; j++) {
		if (bodyList[j].vigor <= 0) {
			if (battlerList.includes(bodyList[j])) {
				let goner = battlerList.indexOf(bodyList[j])
				battlerList[goner].health = 0;
			}
			/*else {
				bodyList.splice(j, 1);
				if (bodyList.battlerType == 0 && bodyList[j].hasAlly !== false) {
					bodyList[bodyList[j].hasAlly].hasAlly = false;
				};
			};*/
		};
	};
};


export function faceTheMusic(a, b) {
	
	if (a + b >= bluePrints[styleMap][currentMap].fieldLayout.length || a + b < 0) {
		return null;
	}
	else {
		return a + b;
	};
};


export function fatesAlign() {
	
	let meetDestiny = false;
	let goldenOpp = null;
	let zodiac = ["creation", "preservation", "renewal", "destruction"];
	let horoScope = from(zodiac)
		.shuffle()
		.toArray();
	for (let j = 0; meetDestiny == false; j++) {
		if (j >= horoScope.length) {
			meetDestiny = true;
		}
		else {
			if (gambler.next().value <= .075) {
				goldenOpp = horoScope[j];
				meetDestiny = true;
			};
		};
	};
	let defyDeity = zodiac.indexOf(goldenOpp);
	rainbowPath(defyDeity);
	return goldenOpp;
};


class fieldTile {
	
	constructor(grain) {
		this.horX = grain.horX;
		this.verY = grain.verY;
		this.number = grain.number;
		this.isOccupied = grain.isOccupied;
		this.isEdge = grain.isEdge;
	};
};


export function fossilization() {
	
	let kabutops = [ ];
	let cradily = false;
	let j = 0
	do {
		let decoy = saveFace;
		decoy = decoy.concat(j.toString());
		decoy = FS.fullPath(`${decoy}.json`);
		if (FS.fileExists(decoy)) {
			/*if (j !== 0 && kabutops.length - 1 !== j) {
				kabutops.push(null);
			};*/
			cradily = true;
			kabutops.push(j.toString());
		}
		else {
			kabutops.push(null);
		};
		j++;
	} while(/*zombie == false && */j < 3);
	if (!cradily) {
		kabutops.length = 0;
	};
	zombie = kabutops.length > 0 ? true : false;
	return kabutops;
};


export async function funTimes() {
	
	widthness = Math.round(bluePrints[styleMap][currentMap].imagery.width / 48); //Determine how many horizontals panels
	heightness = Math.round(bluePrints[styleMap][currentMap].imagery.height / 48); //Determine how many vertical panels
};


export function goTimer() {
	
	if (timeOut == cycleNo) {
		timeOut++;
		timeCheck = Sphere.now();
	};
};


export function gpsMe() {
	
	let minotaur = from(makeShift[0][0])
		.where(it => it.name == mainChar.persona[0].name)
		.toArray();
	if (minotaur.length > 0) {
		return makeShift[0][0].indexOf(minotaur[0]);
	}
	else {
		return false;
	}
};


function highSchoolFlop(gpa) {
	
	if (dropItem !== null) {
		
	};
	dropItem = gpa;
	dropItem.tileLock = mainChar.isFacing;
};


export function hitchHike(mianzi) {
	
	//let stuffing = saveFace == 0 ? '~/saveFile0.json' : saveFace == 1 ? '~/saveFile1.json' : '~/saveFile2.json'
	saveFace = "~/saveFile";
	saveFace = saveFace.concat(mianzi);
	saveFace = FS.fullPath(`${saveFace}.json`);
	//stuffing = stuffing.substr(2);
};


export function illustrateMap(localized) {
	
	let horX = 0;
	let verY = 0;
	let gap = 5;
	let expanse = from(worldMap)
		//.selectMany(it => it)
		.descending(it => it.length)
		.toArray();
	let size = [ expanse[0].length * (20 + gap), worldMap.length * (20 + gap) ];
	let eagleEye = localized ? true : false //This will be for either showing the current map or the overall world map
	let dropOff = 20; //y axis
	let hue = !localized ? Color.Green : Color.Blue;
	let tint = 0.4;
	
	Prim.drawSolidRectangle(Surface.Screen, horX, verY, size[0], size[1], Color.Black.fadeTo(tint));
	for (let j = 0; j < worldMap.length; j++) {
		for (let q = 0; q < worldMap[j].length; q++) {
			let hue2 = worldMap[j][q] == bluePrints[styleMap][currentMap] ? Color.Black : worldMap[j][q].color != null ? worldMap[j][q].color : hue;
			Prim.drawSolidRectangle(Surface.Screen, horX + (q * (20 + gap)), verY + (j * (20 + gap)), 18, 18, hue2);
		};
	};
	
};


export function intransigenceMeter(reading, visit) {
	
	let yoshi = mainChar.potentialRecruit;
	let luigi;
	if (visit == 0) {
		if (reading >= .93) {
			yoshi = null;
			return true;
		}
		else {
			return reading;
		};
	}
	else {
		if (reading >= .70) {
			let bowser = from(battlerList)
				.where(it => it.name == yoshi.agent.lastAttacker)
				.toArray();
			luigi = (!allyList.includes(bowser[0]) && yoshi.agent.turnNo > 2) ? true : false;
		}
		else if (reading >= .40) {
			luigi = (yoshi.agent.health / yoshi.agent.healthMax <= .5) ? true : false;
		}
		else if (reading >= .15) {
			luigi = (yoshi.agent.healthApprox <= 5 && yoshi.agent.comrades.length == 0) ? true : false;
		}
		else {
			luigi = false;
			launchCode = false;
			mainChar.potentialRecruit = null;
		};
		return luigi;
	};
};


export function killAim(vic) {
	
	for (let i = 0; i < battlerList.length - 1; i++) {
		if (battlerList[i].target == vic) {
			let fax = vic.hasAlly !== false ? vic.hasAlly : i;
			battlerList[i].setVictim(fax);
			if (battlerList[i].queuedTarget != null) {
				let scan = from(battlerList[i].queuedTarget)
					.where(it => it == vic)
					.toArray();
				for (let j = 0; j < scan.length; j++) {
					let pluck = battlerList[i].queuedTarget.indexOf(scan[0]);
					battlerList[i].queuedTarget[pluck] = battlerList[i];
					scan.splice(0, 1);
				};
			};
		};
	};
};


export function levelAdjust(cue, eight, ball) {
	
	//for (let q = 0; q < partyList.length; q++) {
		let q = ball;
		let aizen = partyList[q].agent.health / partyList[q].agent.healthMax;
		//let ichimaru = partyList[q].level == universalDynamicLevel;
		partyList[q].level = universalDynamicLevel;
		partyList[q].updateAgent();
		if (eight) {
			partyList[q].agent.lifeForce(partyList[q].agent.persona.defDeterminant);
			partyList[q].agent.health = Math.floor(partyList[q].agent.healthMax * aizen);
		};
		if (cue) {
			partyList[q].agent.isVirgin = true;
			partyList[q].agent.assignRole(true);
		};
	//};
};


export function loseSteam() {
	
	let pencil = from(masterList)
		.where(it => it.agent != null)
		.where(it => !it.agent.isVirgin)
		.where(it => it.agent.unleashMeters.length > 0)
		.toArray();
	for (let crayon = 0; crayon < pencil.length; crayon++) {
		for (let ink = 0; ink < pencil[crayon].agent.unleashMeters.length; ink++) {
			if (pencil[crayon].agent.unleashMeters[ink] > 0) {
				pencil[crayon].agent.unleashMeters[ink]--;
			};
		};
	};
};


export function makeAList(list1, list2, limit) {
	
	for (let j = 0; j < list2.length; j++) {
		list1.push(Random.discrete(0, limit));
	};
};


export function mapMove(amt, base) {
	
	let one = Math.round(Surface.Screen.width / 48);
	let two = Math.round(Surface.Screen.height / 48);

	if (amt !== 0) {
		let j = 0;
		let k = amt == 1 ? "right" : amt == -1 ? "left" : amt == widthness ? "bottom" : amt == widthness * (-1) ? "top" : "empty"
		let n = from(bluePrints[styleMap][currentMap].tileScroll)
			.where(it => it.isEdge.includes(k))
			.toArray();
		let o = n.length === 0 ? true : false
		if (o) {
			let p = base + amt;
			let q = p;
			bluePrints[styleMap][currentMap].tileScroll.length = 0;
			for (let r = 0; r < one * two; r++) {
				bluePrints[styleMap][currentMap].tileScroll[r] = bluePrints[styleMap][currentMap].fieldLayout[q];
				let s = r == 0 ? false : bluePrints[styleMap][currentMap].tileScroll.length % one == 0 ? true : false;
				if (s) {
					++j;
					q = p + (widthness * j);
				}
				else {
					q++;
				};
			};
		}
	}
	else {
		bluePrints[styleMap][currentMap].tileScroll.length = 0;
		let v = base;
		let w = 0;
		for (let x = 0; x < one * two; x++) {
			bluePrints[styleMap][currentMap].tileScroll[x] = bluePrints[styleMap][currentMap].fieldLayout[v];
			let y = v == 0 ? false : bluePrints[styleMap][currentMap].tileScroll.length % one == 0 ? true : false;
			if (y) {
				++w;
				v = base + (widthness * w);
			}
			else {
				v++;
			};
		};
	};
};


export function meteorology(num) {
	
	let youth;
	let maturity = false;
	let pastime = 0;
	while (maturity == false && pastime < weatherPatterns[0].length) {
		youth = Random.normal(.5, .2);
		if (forecast.includes(weatherPatterns[1][pastime])) {
			if (youth > weatherPatterns[0][pastime]) {
				let wrinkle = forecast.indexOf(weatherPatterns[0][pastime]);
				forecast.splice(wrinkle, 1);
			};
		}
		else {
			if (youth <= weatherPatterns[0][pastime]) {
				forecast.push(weatherPatterns[1][pastime])
				maturity = true;
			};
		};
		pastime++;
	};
	
	let cloudFront = 1;
	if (forecast.length > 0) {
	 	for (let j = 0; cloudFront == 1; j++) {
	 		cloudFront = forecast[0] == weatherPatterns[1][j] ? 0.4 : 1;
	 	};
	};
	return cloudFront;
};


export function mixItUp() {
	
	let colorado = bluePrints[0][0];
	let avalanche = from(bluePrints[0])
		.where(it => it != colorado)
		.shuffle()
		.toArray();
	bluePrints[0].length = 0;
	bluePrints[0].push(colorado, ...avalanche);
};


export function nameBot(leng) {
	
	let vowels = [ "a", "e", "i", "o", "u", "y" ];
	let consonants = [ "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z" ];
	
	let vow = from(vowels).sample(3).toArray();
	let con = from(consonants).sample(leng - vow.length).toArray();
	let prelim = from(vow, con)
		.shuffle()
		.toArray();
	prelim[0] = prelim[0].toUpperCase();
	let name = ""
	for (let i = 0; i < prelim.length; i++) {
		name += prelim[i];
	};
	return name;
};

function naturePark(grove) {
	
	//for (let lan = 0; lan < bluePrints.length - 1; lan++) {
		//let lan = 0;
		//for (let hong = 0; hong < bluePrints[lan].length; hong++) {
			let daxiao = ((bluePrints[0][grove].imagery.width / 48) * (bluePrints[0][grove].imagery.height / 48) - 1);
			let fenbu = Math.round(daxiao * Random.normal(.07, .015));
			if (fenbu % 2 == 0) { fenbu += 1 };
			if (bluePrints[0][grove].landscape.length < fenbu) {
				let cao = [ ];
				while (bluePrints[0][grove].landscape.length < fenbu) {
					let shu = Random.discrete (0, daxiao);
					let zhao = gambler.next().value > .28 ? obstacles[0] : obstacles[1];
					cao = new Obstacle({
						name: "ziran",
						tileLock: shu,
						sprite: zhao,
					});
					bluePrints[0][grove].landscape.push(cao);
				};
			};
		//};
	//};	
};


export function npcApproach2(act, npc, dmz) {
	
	let jayWalk = npc.lastTile;
	let crossWalk = [npc.tileLock, npc.isFacing];
	let clickIt = bluePrints[styleMap][currentMap].fieldLayout[act.tileLock];
	let ticket = bluePrints[styleMap][currentMap].fieldLayout[npc.tileLock];
	let occifer = [ Array.of(), Array.of(), Array.of(), Array.of() ];
	let jack = [clickIt.horX, clickIt.verY];
	let chock = [ticket.horX, ticket.verY];
	let autoBan = [ ];
	let fuel = jack[0] > chock[0] ? [3, 1] : [1, 3];
	let grease = jack[1] > chock[1] ? [2, 0] : [0, 2];
	let tank = Math.abs(jack[0] - chock[0]) > Math.abs(jack[1] - chock[1]) ? [ fuel[0], grease[0], fuel[1], grease[1] ] : [ grease[0], fuel[0], grease[1], fuel[1] ] ;
	let pump = [ 0, 1, 2, 3 ];
	let wrench = false;
	let funnel = 0;
	let cover;
	let walkArray = [ ];
	let iterator = 0;
	while (npc.isFacing != mainChar.tileLock && iterator < 100) {
		while (!wrench && funnel < 4) {
			wrench = (npc.moveMent(tank[funnel]) && !autoBan.includes(npc.tileLock)) && !dmz.includes(npc.tileLock) || npc.isFacing == mainChar.tileLock ? true : false;
			cover = funnel;
			funnel++;
		};
		if (wrench) {
			autoBan.push(npc.tileLock);
			let muffler = pump.indexOf(tank[cover]);
			walkArray.push(muffler);
		}
		else {
			npc.backTrack();
			walkArray.splice(walkArray.length - 1, 1);
		};
		wrench = false;
		funnel = 0;
		ticket = bluePrints[styleMap][currentMap].fieldLayout[npc.tileLock];
		chock = [ticket.horX, ticket.verY];
		fuel = jack[0] > chock[0] ? [3, 1] : [1, 3];
		grease = jack[1] > chock[1] ? [2, 0] : [0, 2];
		tank = Math.abs(jack[0] - chock[0]) >= Math.abs(jack[1] - chock[1]) ? [ fuel[0], grease[0], fuel[1], grease[1] ] : [ grease[0], fuel[0], grease[1], fuel[1] ] ;
		iterator++;
	};
	while (npc.tileLock != crossWalk[0]) {
		npc.backTrack();
	};
	if (iterator === 100) {
		return false;
	}
	else {
		return walkArray;
	};
};


export class Obstacle
{
	constructor(nature){
		
		this.name = nature.name;
		this.tileLock = nature.tileLock;
		this.sprite = nature.sprite;
	};
};

export function occupyThis(city) {
	
	while (makeShift[0][0][city].memberList.length < 7) {
		NPC.createNew();
		/*let onepercenter = from(personaList)
			.where(it => it.name == makeShift[0][0][city].name)
			.toArray();
		let capitalist = personaList.indexOf(onepercenter[0]);
		charList[charList.length - 1].morph(capitalist);
		charList[charList.length - 1].assignRole(0);*/
		makeShift[0][0][city].kingPin = null;
		makeShift[0][0][city].memberList.push(charList[charList.length - 1]);
		charList.splice(charList.length - 1, 1);
		bluePrints[1][city].contents.push(makeShift[0][0][city].memberList[makeShift[0][0][city].memberList.length - 1]);
	};
};

export function openingHours(biz) {
	
	let bonkers = [biz.tileLock - widthness, biz.tileLock + 1, biz.tileLock + widthness, biz.tileLock - 1];
	let looney = false;
	let daffy;
	let lola = 0;
	while (looney === false && lola < 100) {
		daffy = Random.sample(bonkers);
		looney = daffy < 0 || daffy >= bluePrints[styleMap][currentMap].fieldLayout.length - 1 ? false :
			Math.abs(bluePrints[styleMap][currentMap].fieldLayout[biz.tileLock].horX - bluePrints[styleMap][currentMap].fieldLayout[daffy].horX) > 48 ||
			Math.abs(bluePrints[styleMap][currentMap].fieldLayout[biz.tileLock].verY - bluePrints[styleMap][currentMap].fieldLayout[daffy].verY) > 48 ? false : 
			bluePrints[styleMap][currentMap].fieldLayout[daffy].isOccupied == true ? false : daffy;
		biz.doorWay = looney;
		lola++
	};
	if (lola >= 100) {
		let g = 0;
	};
};

export function orientMe(maw, paw) {
	
	cordon();
	
	if (maw) {
		if (!bluePrints[styleMap][currentMap].isDecorated) {
			let law = Math.round(widthness * heightness / 264)
			let haw = law == 1 ? 0 : law / 15;
			bluePrints[styleMap][currentMap].mining = Math.round((gambler.next().value - 0.1) + haw);
			
			naturePark(currentMap);
	
			if (paw != null && !zombie) {
				let naw = gpsMe();
				if (naw !== false && !makeShift[0][4].includes(makeShift[0][0][naw].name)) {
					bluePrints[styleMap][currentMap].contents.push(makeShift[0][0][naw]);
					makeShift[0][4].push(makeShift[0][0][naw].name);
				};
			};
			
			for (let q = 0; q < makeShift.length - 1 - divineWill; q++) {
				if (q !== 1 && q !== 5) {
					let count = bluePrints[styleMap][currentMap].fieldLayout.length <= 350 ? 2 : bluePrints[styleMap][currentMap].fieldLayout.length <= 700 ? 3 : 4;
					let r = makeShift[q][0][0].techType != null && makeShift[q][0][0].selfHarm == null ? Math.min(makeShift[q][0].length, count) : /*q == 2 ? 4 : */Math.min(makeShift[q][0].length, 1);
					let s = [ ];
					while (s.length < r) {
						let t = from(makeShift[q][0]).sample(1).toArray();
						if (t[0].rarity == null || t[0].rarity <= gambler.next().value) {
							if (!bluePrints[styleMap][currentMap].contents.includes(t[0]) && !s.includes(t[0]) && !makeShift[0][4].includes(t[0].name)) {
								s.push(t[0]);
								if (q === 0 || q === 6) {
									makeShift[0][4].push(t[0].name);
									divineWill = q === 6 ? 1 : divineWill;
								};
							};
						};
					};
					bluePrints[styleMap][currentMap].contents.push(...s);
				}
				else if (q === 1) {
					let sizeable = bluePrints[styleMap][currentMap].fieldLayout.length <= 450 ? 1 : 2;
					for (let i = 0; i < sizeable; i++) {
						let armsDealer = new makeShift[q][2] ({ name: "Blacksmith" + makeShift[q][0].length, armorShop: Math.round(gambler.next().value - 0.15), isMainstream: Math.round(gambler.next().value + 0.25),
							tileLock: Random.discrete(0, 1000), wares: [ ] });
						armsDealer.sprite = armsDealer.isMainstream ? brandName[0] : brandName[1];
						makeShift[q][0].push(armsDealer);
						bluePrints[styleMap][currentMap].contents.push(armsDealer);
					};
				}
				else if (q === 5) {
					let regulator = bluePrints[styleMap][currentMap].fieldLayout.length <= 350 ? 1 : bluePrints[styleMap][currentMap].fieldLayout.length <= 700 ? 2 : 3;
					for (let i = 0; i < regulator; i++) {
						let dealerShop = new makeShift[q][2] ({ name: "Frylock" + makeShift[q][0].length, itemSale: Math.round(gambler.next().value), isMainstream: Math.round(gambler.next().value + 0.20),
							tileLock: Random.discrete(0, 1000), wares: [ ] });
						dealerShop.sprite = dealerShop.isMainstream ? shopFront[0] : shopFront[1];
						makeShift[q][0].push(dealerShop);
						bluePrints[styleMap][currentMap].contents.push(dealerShop);
					};
				};
			};
			
			bluePrints[styleMap][currentMap].isDecorated = true;
		};

		let sawachika = selfSituate();
		for (let q = 0; q < bluePrints[styleMap][currentMap].contents.length; q++) {
			let harima = false;
			for (let kenji = 0; harima == false; kenji++) {
				harima = makeShift[kenji][0].includes(bluePrints[styleMap][currentMap].contents[q]) ? makeShift[kenji] : false;
			};
			appearify(bluePrints[styleMap][currentMap].contents[q], sawachika);
			harima[1].push(bluePrints[styleMap][currentMap].contents[q].tileLock);
		};
		
		let hu = bluePrints[styleMap][currentMap].landscape;
		for (let j = 0; j < bluePrints[styleMap][currentMap].landscape.length; j++) {
			appearify(bluePrints[styleMap][currentMap].landscape[j], sawachika);
		};
	};
};


export function powerSurge() {
	
	for (let nerf = 0; nerf < battlerList.length; nerf++) {
		if (battlerList[nerf].overLoad > 0 && battlerList[nerf].overLoad > battlerList[nerf].turnNo) {
			damage = battlerList[nerf].healthMax * .01;
			battlerList[nerf].harm(null, battlerList[nerf], damage);
		};
	};
};


export function pinPoint() {
	
	let obj1 = from(makeShift[0][0])
		.where(it => bluePrints[styleMap][currentMap].contents.includes(it))
		.toArray();
	let obj2 = [ ];
	for (let q = 0; q < obj1.length; q++) {
		if (obj1[q].doorWay === undefined) {
			openingHours(obj1[q]);
		};
		obj2.push(obj1[q].doorWay);
	};
	return Array.of(obj1, obj2);
};


export function playerLose() { //Clause for if the protags died - Tie goes to the enemy, for now.

	if (!practiceFight) {
		deadWood(agentList, battlerList);
		bodyList.length = 0;
		allyList.length = 0;
		foeList.length = 0;
		battlerList.length = 0;
		partyList.length = 0;
		qingXu.dissolve();
		let patrickZvyozda = false;
		let sandySongShu;
		if (recruitList.length > 0) {
			mainChar = recruitList[0];
			sandySongShu = recruitList[0].level;
			recruitList.splice(0, 1);
			let gubkaBob = personaList.includes(mainChar.persona[0]) ? personaList.indexOf(mainChar.persona[0]) : "x";
			patrickZvyozda = mainChar.joinParty(gubkaBob);
		};
		if (patrickZvyozda) {
			levelAdjust(sandySongShu === mainChar.level, true, partyList.indexOf(mainChar));
			universeGalaxy[3].successor = true;
		}
		else {
			for (let q = 0; q < bluePrints[0].length; q++) {
				bluePrints[0][q].contents.length = 0;
			};
			firstLaunch = true;
			memo = "Comrade Death mocks you."; //Taunt the player
			Music.override('@/music/Downfall.ogg');
			gameImage = 2;
		};
	}
	else {
		if (sourceFeed == 2) {
			allyList.length = 0;
			universeGalaxy[4].stop();
		}
		else {
			universeGalaxy[1].endurance = false;
			universeGalaxy[1].zimZalaBimZim = false;
			allyList.length = 0;
			for (let j = 0; j < partyList.length; j++) {
				partyList[j].reputation -= .025 * mainChar.level;
				partyList[j].credit -= 111 * mainChar.level;
				partyList[j].agent.lastAttacker = null;
				partyList[j].agent.target = null;
				partyList[j].agent.lastAction.length = 0;
				partyList[j].agent.queuedTarget = null;
			};
			for (let r = 0; r < bodyList.length; r++) {
				let dogwood = bodyList[r].battlerType == 0 ? bodyList[r].swapWeapon(-1) : null;
			};
			let anti = from(bodyList)
				.where(it => !it.isProtag)
				.where(it => it.battlerType == 0)
				.toArray();
			for (let n = 0; n < anti.length; n++) {
				bodyList.splice(bodyList.indexOf(anti[n]), 1);
			};
		};
	};
	for (let u = 0; u < foeList.length; u++) {
		let gluttony = battlerList.indexOf(foeList[u]);
		if (gluttony >= 0) {
			battlerList.splice(gluttony, 1);
		};
	};
	foeList.length = 0;
	chance = 0;
	damage = "Empty";
	attackName = "";
	battleActive = false;
	Music.reset();
};

export function playerWin(capitulation) { //Protags win, so no clearing the battlerList

	if (allyList[1] == null) { allyList.splice(1, 1) };
	if (allyList[0] == null) { allyList.splice(0, 1) };
	let ember = from(bodyList)
		.where(it => !it.isProtag)
		.descending(it => it.level)
		.toArray();
	for (let j = 0; j < partyList.length; j++) {
		if (sourceFeed !== 2) { //No exp gained for survival mode
			partyList[j].agent.expPoints += Math.max(166, Math.round(33.33 * (partyList[j].agent.totalDamage / 10) * ember[0].level) / 2) - (partyList[j].agent.totalHarm * 2.5);
			partyList[j].credit += Math.max(1, Math.round(11.11 * (partyList[j].agent.totalDamage / 10) * ember[0].level));
			//Should credit also be in the exceptions list?
		};
		partyList[j].agent.target = null;
		partyList[j].agent.queuedTarget = null;
		partyList[j].agent.lastAttacker = null;
		partyList[j].agent.lastAction.length = 0;
		partyList[j].agent.totalDamage = 0;
		partyList[j].agent.totalHarm = 0;
		let torment = sourceFeed !== 2 ? false : universeGalaxy[4].harrow < 3 ? true : false;
		if (!torment) {
			for (let q = 0; q < partyList[j].agent.alteredState.length; q++) {
				//partyList[j].agent.alteredState[j][1] = 0;
				partyList[j].agent.alteredState[q][0].redact(partyList[j].agent);
				partyList[j].agent.alteredState.splice(q, 1);
			};
		};
	};
	for (let q = 0; q < bodyList.length; q++) {
		let otto = bodyList[q].battlerType == 0 ? bodyList[q].swapWeapon(-1) : null;
	};
	foeList.splice(0, foeList.length);
	let acat = from(bodyList)
		.where(it => !it.isProtag)
		.toArray();
	if (acat.length > 0) {
		if (acat[0].battlerType == 0) {
			if (acat[0].weapon.length > 0 && !duckOut && !capitulation && !practiceFight && sourceFeed !== 2 && sourceFeed !== 3) {
				highSchoolFlop(acat[0].weapon[0]);
			};
		}
		else {
			if (!duckOut && !capitulation && sourceFeed !== 2 && sourceFeed !== 3) {
				highSchoolFlop(mythicalArmorList[0]);
				qingXu.dissolve();
			};
			if (battlerList.includes(acat[0])) { 
				battlerList.splice(battlerList.indexOf(acat[0]), 1);
			};
		};
	};
	for (let q = 0; q < acat.length; q++) {
		let adog = bodyList.indexOf(acat[q]);
		bodyList[adog].target = null;
		bodyList[adog].queuedTarget = null;
		bodyList.splice(adog, 1);
	};
	chance = 0;
	battleActive = false;
	damage = "Empty";
	attackName = "";
	memo = duckOut ? "Comrade Death awaits an even greater sacrifice in the future" : "Comrade Death is sated once more."; //Praise or chastise the player
	Music.reset(17);
};


export async function quickPaint(obj) {
	
	obj.sprite = await obj.sprite;
	if (obj.battleSprite != undefined) {
		obj.battleSprite = await obj.battleSprite;
	};
};


function rainbowPath(trail) {
	
	influenceShade = trail < 0 || isNaN(trail) ? Color.White : trail == 0 ? Color.MidnightBlue : trail == 1 ? Color.LavenderBlush 
		: trail == 2 ? Color.Olive : Color.Red;
};

export function randoFoe(lotto) {
	
	let ging = battlerList.length == 1 ? 3 : 4
	let gang = 0;
	let geng;
	let gung;
	let gong = from(charList)
		//.where(it => !battlerList.includes(it.agent))
		.shuffle()
		.toArray();
	while (battlerList.length < ging) {
		geng = charList.indexOf(gong[gang])
		if (geng >= 0) {
			gung = lotto == null ? null : lotto[geng];
			charList[geng].morph(gung);
			battlerList.push(charList[geng].agent);
			bodyList.push(charList[geng].agent);
			charList.splice(geng, 1);
		};
		++gang;
	};
};

export function reAlign(distance, act, rev) {
	
	let piano = bluePrints[styleMap][currentMap].tileScroll[0];
	let tuna = act.tileLock + distance;
	if (bluePrints[styleMap][currentMap].fieldLayout[tuna].isOccupied) {
		return false;
	}
	else {
		bluePrints[styleMap][currentMap].fieldLayout[act.tileLock].isOccupied = false;
		if (rev !== true) {
			act.lastTile.push(act.tileLock);
		}
		act.tileLock = tuna;
		bluePrints[styleMap][currentMap].fieldLayout[tuna].isOccupied = true;
		if (act == mainChar) {
			let horizon = Math.abs(distance) == 1 ? bluePrints[styleMap][currentMap].fieldLayout[mainChar.tileLock].number % widthness :
				Math.abs(distance) == widthness ? (bluePrints[styleMap][currentMap].fieldLayout[mainChar.tileLock].verY / 48) % (heightness) : 0;
			let rocket = distance > 0 && horizon >= 4 ? true : false;
			let comet = distance == (widthness * -1) && horizon <= heightness - 4 ? true : distance == -1 && horizon < widthness - 4 ? true : false;
			if (rocket || comet) {
				mapMove(distance, bluePrints[styleMap][currentMap].tileScroll[0].number);
			}
		};
		return true;
	};
};

export function reSolve(stage) {
		
	for (let j = 0; j < bodyList.length; j++) {
		for (let c = 0; c < bodyList[j].pendingAction.length; c++) {
			if (bodyList[j].pendingAction[c][2](stage)) {
				let sub = bodyList[j]
				let x = bodyList[j].pendingAction[c][1][0];
				let y = bodyList[j].pendingAction[c][1][1];
				let z = bodyList[j].pendingAction[c][1][2];
				let a = bodyList[j].pendingAction[c][1][3];
				bodyList[j].pendingAction[c][0](x, y, z, a)
				sub.pendingAction.shift(); //in case the battler completely dies in the previous action
			};
		};
	};
};

export function selfSituate() {
	
	let punkt = bluePrints[styleMap][currentMap].fieldLayout.length;
	let nazna = Surface.Screen.width / 48;
	let cheniye = Surface.Screen.height / 48;
	let scrolly = [
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(punkt - (widthness / 2))].number, //tileScroll
		bluePrints[styleMap][currentMap].fieldLayout[Math.round((punkt / 2) - 1)].number,
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(widthness / 2)].number,
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(punkt - widthness * Math.floor(heightness / 2))].number
	];
	//let dock = [ "top", "left", "right", "bottom" ];
	//for (let j = 0; j < 4; j++) {
		let itsRelative = from(bluePrints[styleMap][currentMap].fieldLayout)
			.where(it => it.isEdge.includes("right"))
			.toArray();
		scrolly[1] = itsRelative[Math.round(itsRelative.length / 2) - 1].number;
	//};
	let drawy = [
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(scrolly[0] - (widthness * (cheniye - 1)) - (nazna/ 2))], //done
		bluePrints[styleMap][currentMap].fieldLayout[Math.round((scrolly[1] + 1) - (widthness * (cheniye / 2 - 1)) - nazna)], //done
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(scrolly[2] - nazna / 2)], //done
		bluePrints[styleMap][currentMap].fieldLayout[Math.round(scrolly[3] - (widthness * (cheniye / 2)))] //done
	];
	return Array.of(scrolly, drawy);
};

export async function sortOut(num, act, def, listy) {
	
	let dis = num === false ? false : menu == "Comrades" ? act.comrades[num] : menu == "Moves" ? act.movePool[num] : menu == "Restore" ? act.stock[0][num] :
		menu == "Subterfuge" ? act.stash[0][num] : menu == "Qi Unleash" ? act.specialMoves[num] : menu == "Weapons" ? act.allCapabilities[0] : menu == "Targets" ? act.allCapabilities[2] : false;
	
	if (dis != false && dis != null) {
		if (moveSeq == 0) { //|| menu == "Targets") {
			act.moveChoice = dis;
			if (act.moveQueue.length > 0) { //Up stress meter if had to change move
				act.stress = act.moveQueue[0] == act.moveChoice ? act.stress : act.stress + .0025;
			};
			await act.moveSifter(num);
		}
	}
	else {
		act.autoBattler(false);
	};
	
	if (!def.endBattleCheck()) {
		sortOut2(act, def);
	};
};

async function sortOut2(act, def) {
	
	if (moveSeq == 0 && !act.deathFlag) {
		moveSeq++;
		timeCheck = Sphere.now();
			if (preview) {
			let jamie = [ "Weapons" ];
			let franklin = [ ];
			let hyneman = [ act.weapon ];
			if (act.stash[0].length > 0) {
				jamie.push("Subterfuge");
				hyneman.push(act.stash[0]);
			};
			jamie.push("Alterations", "Status");
			hyneman.push(franklin, franklin);
			await new Scene()
				.tempMenu(jamie, act, hyneman, 382) //about 6.5 seconds to set retal
				.run();
			if (tempMenuOutput != null && tempMenuOutput != "Z") {
				let billy = from(allWeaponsList)
					.where(it => it.includes(tempMenuOutput))
					.toArray();
				if (billy.length > 0 || tempMenuOutput == -1) {
					let mandy = act.weapon.indexOf(tempMenuOutput);
					act.swapWeapon(mandy);
					attackName = "Weapon Swap -> " + act.weaponCurrent.name;
					act.countdown += (150 / act.persona.atkDeterminant);
				}
				else {
					act.moveQueue[0] = act.stash[0][tempMenuOutput];
				};
				tempMenuOutput = null;
			}
			else if (tempMenuOutput == "Z") {
				act.moveQueue[0] = act.allCapabilities[0];
			};
			preview = false;
		}
		else {
			moveSeq = 3;
			if (!firstLaunch && !conditionCleared && battleActive) {
				await new Scene()
					.showAttack()
					.run();
			};
		};
		act.endCycle();
	};
	
	timeBump = (30 - universalDynamicLevel) / 0.0165; //455; //Dynamically adjusted between 7 and 30 seconds
	def.countDown();
};

export function statusCheck(stage) { //See if status effects need to be enacted
		
	for (let i = 0; i < battlerList.length; i++) {
		if (battlerList[i].alteredState.length > 0) {
			for (let j = 0; battlerList[i] != null && j < battlerList[i].alteredState.length; j++) { //Go through to make sure each status effect activates
				battlerList[i].alteredState[j][0].enact(battlerList[i], j, stage);
			};
			if (battlerList[i] != null) {
				let z = from(battlerList[i].alteredState)
					.where(it => it[1] == 0)
					.toArray();
				for (let q = 0; q < z.length; q++) { //remove expired statuses
					let k = battlerList[i].alteredState.indexOf(z[q]);
					battlerList[i].alteredState[k][0].redact(battlerList[i]);
					battlerList[i].alteredState.splice(k, 1);
				};
			};
		};
	};
};


export function switchMap(next) {
	
	let openBorder = false;
	let continents = 0;
	let navigate = 0;
	if (styleMap == 0) {
		let pin = bluePrints[styleMap][currentMap];
		let topography = false;
		let j = 0;
		while (topography === false && j < worldMap.length) {
			topography = worldMap[j].includes(pin) ? j : false;
			continents = topography === false ? continents + worldMap[j].length : continents;
			j++;
		};
		if (topography !== null) {
			navigate = worldMap[topography].indexOf(pin);
			if (next == 0) {
				if (topography !== 0) {
					openBorder = navigate < worldMap[topography - 1].length ? true : false;
					continents = topography !== 0 ? continents - worldMap[topography - 1].length : continents;
				};
			}
			else if (next == 1) {
				openBorder = navigate !== 0 ? true : false;
				navigate -= 1;
			}
			else if (next == 2) {
				if (topography != worldMap.length - 1) {
					openBorder = navigate < worldMap[topography + 1].length ? true : false;
					continents += worldMap[topography].length;
				};
			}
			else if (next == 3) {
				openBorder = navigate < worldMap[topography].length - 1? true : false;
				navigate += 1;
			};
		};
	}
	
	if (styleMap == 0 && openBorder) {
		qingXu.vanish();
		//dropItem = null;
		let blackBeard = from(bluePrints[styleMap][currentMap].contents)
			.where(it => it.grade !== undefined)
			.toArray();
		if (blackBeard.length > 0) {
			for (let j = 0; j < blackBeard.length; j++) {
				let redBeard = bluePrints[styleMap][currentMap].contents.indexOf(blackBeard[j]);
				bluePrints[styleMap][currentMap].contents.splice(redBeard, 1);
			}
		};
		
		currentMap = continents + navigate;
		wipeTheSlate();
		chance = 0;
		funTimes();
		let goldRush = gambler.next().value
		if (bluePrints[styleMap][currentMap].mining) {
			let motherLode = from(makeShift[7][0])
				.where(it => it.rarity <= goldRush)
				.where(it => it.onField == true)
				.where(it => !bluePrints[styleMap][currentMap].contents.includes(it))
				.shuffle()
				.toArray();
			if (motherLode.length > 0) {
				motherLode[0].tileLock = Random.discrete(0, widthness * heightness);
				bluePrints[styleMap][currentMap].contents.push(motherLode[0]);
			}
		};
		/*for (let q = 0; q < makeShift[1][0].length; q++) {
			makeShift[1][0][q].armorShop = Math.round(Random.chance(.5));
		};*/
		weatherRadar = Sphere.now() + 1;
		universeGalaxy[2].timer = 352;
		return true;
	}
	else if (styleMap == 2) {
		universeGalaxy[0].pearlyGates = true;
		return false;
	}
	else if (styleMap == 1) {
		universeGalaxy[1].semi = true;
		return false;
	}
	else {
		return false;
	};
};


export function terminalFrost() {

	try {
		Dispatch.now(() => {});
		return false;
	}
	catch (e) {
		return true;
	}
};


export function underBurrow(xMark) {

	let njn = bluePrints[styleMap][currentMap];
	let claustrophobia = Surface.Screen.width / 48 / 2;
	let clausewitzophobia = Surface.Screen.height / 48 / 2;
	let fangs = from(njn.fieldLayout)
		.where(it => it.verY == njn.fieldLayout[xMark].verY)
		.ascending(it => it.number)
		.toArray()
	let spider = fangs.indexOf(njn.fieldLayout[xMark]);
	let crawly = (fangs.length - spider) < claustrophobia ? spider - (claustrophobia + (claustrophobia - (fangs.length - spider))) : claustrophobia - spider > 0 ? 0 : spider - claustrophobia;
	let arachnophobia = njn.fieldLayout.indexOf(fangs[crawly]);
	let ripTide = from(njn.fieldLayout)
		.where(it => it.horX == njn.fieldLayout[arachnophobia].horX)
		.ascending(it => it.number)
		.toArray();
	let ocean = ripTide.indexOf(njn.fieldLayout[arachnophobia]);
	let scaly = (ripTide.length - ocean) < clausewitzophobia ? ocean - (clausewitzophobia + (clausewitzophobia - (ripTide.length - ocean))) : clausewitzophobia - ocean > 0 ? 0 : ocean - clausewitzophobia;
	let hydrophobia = njn.fieldLayout.indexOf(ripTide[scaly]);
	mapMove(0, hydrophobia);
};


function wipeTheSlate() {
	
	for (let j = 0; j < makeShift.length; j++) {
		makeShift[j][1].length = 0;
	};
};


export function yesterYear() {
	
	if (!Sphere.Engine.includes("Oozaru")) {
		let fluffyBear = lineChange();
		FS.writeFile(saveFace, JSON.stringify(fluffyBear));
	};
};


export function waitItOut(word, deed) {
	
	let notHypocrite = word === deed ? true : false;
	return notHypocrite;
};
