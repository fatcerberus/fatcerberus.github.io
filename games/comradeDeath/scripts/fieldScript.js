//Field map code

import { from, Music, Prim, Random, Scene, Thread } from '/lib/sphere-runtime.js';
import { appearify, appraise, breakAway, clickClack, deadWood, drawCharFieldSprite, drawFieldSprite, drawFieldStatus, drawWoodsyOwl, fatesAlign, funTimes, gpsMe, illustrateMap, loseSteam, meteorology, orientMe, pinPoint, quickPaint, randoFoe, underBurrow, yesterYear } from './functions.js';
import { personaList } from './personas.js';


export default
class walkWay extends Thread
{
	constructor() {
		
		super();
		
		this.greenLight = false;
		this.partyOverview = false;
		this.popUpBlocker = true;
		this.obman = false;
		this.dojoStops = [ ];
		this.dojoSpots = [ ];
	}
	
	async on_startUp() {
		
		worldView = this;
		this.takeFocus();
		weatherRadar = Sphere.now();
		this.altRoute = sourceFeed;
		styleMap = 0;
		//mainChar.provisions[0].push(makeShift[7][0][0]);
		//mainChar.provisions[1].push(1);
		/*let axed = from(bluePrints[0])
			.where(it => it.name == "Wildlands")
			.toArray();
		let axer = bluePrints[0].indexOf(axed[0]);
		bluePrints[0][axer].contents.push(makeShift[0][0][12]); //testing edge doorways
		currentMap = axer;*/
		if (!zombie) {
			currentMap = Random.discrete(0, bluePrints[0].length - 1);
			chance = 0;
		};
		sourceFeed = 1;
		this.mapOut = currentMap;
		funTimes();
		let retread = zombie ? null : 1;
		orientMe(true, retread);
		NPC.bandit();
		this.vortex = pinPoint();
		this.dojoStops = this.vortex[0];
		this.dojoSpots = this.vortex[1];
		if (!zombie) {
			appraise();
			let introvert = from(this.dojoStops)
				.where(it => it.name == mainChar.persona[0].name)
				.toArray();
			mainChar.tileLock = mainChar.persona[0].name != "Iconoclast" ? introvert[0].doorWay : 0;
		}
		else {
			underBurrow(mainChar.tileLock);
		};
		appearify(mainChar);
		if (!zombie) {
			qingXu.optimize();
		};
		await quickPaint(qingXu);
		this.logger = null;
		this.mapCheck = false;
		this.timer = 352;
		if (this.altRoute == 4) {
			this.bagel = gpsMe();
			if (this.bagel !== false) {
				this.suspend();
				sourceFeed = 4;
				universeGalaxy[1].num = this.bagel;
				universeGalaxy[1].start();
			};
		};
		Music.play('@/music/Raven-Child.ogg');
	}
	
	on_inputCheck() {
		
		typo = Keyboard.Default.getKey();
		this.clicky = Mouse.Default.getEvent();
	}
	
	async on_update() {
			
		if (charList.length <= 5) {
			NPC.createNew()
		};
		
		let donkey = Sphere.now() - weatherRadar;
		foreCaster = donkey % 3530;
		if (foreCaster == 0) {
			influence = fatesAlign();
			this.precip = meteorology();
			if (donkey != 0) {
				loseSteam();
			};
		};
		
		if (this.mapOut != currentMap) {
			this.vortex = pinPoint();
			this.dojoStops = this.vortex[0];
			this.dojoSpots = this.vortex[1];
			this.mapOut = currentMap;
		};
		let swan = from(this.dojoStops)
			.where(it => it.tileLock == mainChar.isFacing)
			.toArray();
		
		if (!this.popUpBlocker && qingXu.tileLock == undefined) {
			qingXu.optimize();
			await quickPaint(qingXu);
			bluePrints[styleMap][currentMap].contents.push(qingXu);
			appearify(qingXu);
			this.popUpsEnabled = false;
		};
		
		if (dropItem != null && !bluePrints[styleMap][currentMap].fieldLayout[dropItem.tileLock].isOccupied) {
			bluePrints[styleMap][currentMap].contents.push(dropItem);
			appearify(dropItem);
			dropItem = null;
		};
		
		if (Sphere.now() > timeCheck + this.timer) {
			timeCheck = Sphere.now();
			this.timer = 205;
			let stroll = Random.discrete(0, 3);
			NPClist[0].moveMent(stroll);
			if (Nomad.visible) {
				stroll = Random.discrete(0, 3);
				Nomad.moveMent(stroll);
			};
		};
		
		let keyCode1 = [ Key.Up, Key.Left, Key.Down, Key.Right ];
		let keyCode2 = gameMode == "Standard" ? [ "w", "a", "s", "d" ] : [ "u", "h", "j", "k" ];
		if (!scrollLock) {
			if (typo != null && keyCode1.includes(typo)) {
				this.logger = keyCode1.indexOf(typo);
				mainChar.moveMent(this.logger);
				this.popUpBlocker = gambler.next().value > chance ? true : false;
			}
			else if (typo != null && keyCode2.includes(Keyboard.Default.charOf(typo))) {
				this.logger = keyCode2.indexOf(Keyboard.Default.charOf(typo));
				mainChar.moveMent(this.logger);
				this.popUpBlocker = gambler.next().value > chance ? true : false;
			}
			else if (typo == Key.E) {
				mainChar.backTrack();
			}
			else if ((typo == Key.P || typo == Key.Enter) && mainChar.isFacing != null) {
				let who = typo == Key.Enter ? 0 : 1;
				if (makeShift[1][1].includes(mainChar.isFacing)) {
					let prodav = from(makeShift[1][0])
						.where(it => it.tileLock == mainChar.isFacing)
						.toArray();
					prodav[0].orderForm(who);
				}
				else if (makeShift[5][1].includes(mainChar.isFacing)) {
					let drugMule = from(makeShift[5][0])
						.where(it => it.tileLock == mainChar.isFacing)
						.toArray();
					drugMule[0].dispense(who);
				}
				else if (bluePrints[styleMap][currentMap].fieldLayout[mainChar.isFacing].isOccupied) {
					mainChar.getGrabby(who);
				};
			};
			
			if (typo == Key.F1) {
				this.partyOverview = this.partyOverview == false ? true : false;
			};
			
			if (typo == Key.M) {
				this.mapCheck = this.mapCheck == false ? true : false;
			};
			
			if (typo == Key.F9) {
				this.timer = Infinity;
				await new Scene()
					.confront(mainChar, NPClist[0], [ ])
					.run();
			};
			
			if (Nomad.visible && mainChar.isFacing == Nomad.tileLock && typo == Key.Enter) {	
				await new Scene()
					.enlighten()
					.run();
				if (Nomad.fatigue) {
					yesterYear();
				};
			};
			
			if ((NPClist[0].isFacing == mainChar.tileLock && NPClist[0].isRevisionist) || (mainChar.isFacing == NPClist[0].tileLock && typo == Key.Enter)) {
				let sav = NPClist[0];
				let hitItOff = mainChar.engage(NPClist[0]);
				if (hitItOff != null) {
					bluePrints[styleMap][currentMap].fieldLayout[sav.tileLock].isOccupied = false;
				}
				if (hitItOff == false) {
					battlerList.push(sav.agent);
					bodyList.push(sav.agent);
					launchCode = true;
					battleActive = true;
					if (typo == Key.Enter) {
						Music.override('@/music/Cold-Emptiness.ogg');
					}
					else {
						Music.override('@/music/Burial_Fields.ogg');
					};
				};
			};
			
			if (this.dojoSpots.includes(mainChar.tileLock) && swan.length > 0) {
				let duck = from(swan)
					.where(it => it.name == mainChar.persona[0].name)
					.toArray();
				let falcon = makeShift[0][0].indexOf(swan[0]);
				if (typo == Key.Enter) {
					this.suspend();
					universeGalaxy[1].num = falcon;
					universeGalaxy[1].start();
				}
				else if (typo == Key.D0) {
					if (duck.length > 0) {
						for (let h = 0; h < partyList.length; h++) {
							partyList[h].rejuvenate();
						};
					}
					else {
						randoFoe(NPClist, null);
						battleActive = true;
						Music.override('@/music/Groves-of-Death.ogg'); //Set the mood
					};
				};
			};
			
			if (bluePrints[styleMap][currentMap].contents.includes(qingXu)) {
				 if (qingXu.tileLock == mainChar.isFacing && typo == Key.Enter) {
					qingXu.vanish();
					battlerList.push(qingXu);
					bodyList.push(qingXu);
					battleActive = true;
				}
				else if (qingXu.tileLock == mainChar.isFacing && typo == Key.D0) {
					let halo = breakAway();
					divineWill = halo === true ? 0 : 1;
				};
			};
			
			if (makeShift[6][1].includes(mainChar.isFacing)) {
				if (typo == Key.Enter) {
					this.suspend();
					universeGalaxy[0].start();
				};
			};
			
			if (this.clicky.key != null && Mouse.Default.isPressed(MouseKey.Left)) {
				let quixote = clickClack(this.clicky.x, this.clicky.y)
				if (makeShift[0][1].includes(quixote)) {
					memo = "Found a new toy, huh?"
					this.greenLight = true;
				};
			};
			if (this.greenLight) {
				randoFoe(NPClist, null);
				battleActive = true;
				this.greenLight = false;
			};
		};
		
		if (battleActive) {
			sourceFeed = 1;
			this.suspend();
			universeGalaxy[3].start();
		};
	}
	
	on_render() {
		
		let filter = influence != null ? 0.8 : this.precip;
		let imlkpo = bluePrints[styleMap][currentMap].tileScroll[0].number > 0 ? bluePrints[styleMap][currentMap].tileScroll[0].number : 0;
		Prim.blitSection(Surface.Screen, 0, 0, bluePrints[styleMap][currentMap].imagery, bluePrints[styleMap][currentMap].fieldLayout[imlkpo].horX, bluePrints[styleMap][currentMap].fieldLayout[imlkpo].verY, Surface.Screen.width, Surface.Screen.height, influenceShade.fadeTo(filter));
		/*for (let u = 0; u < bluePrints[styleMap][currentMap].tileScroll.length; u++) {
			Prim.drawRectangle(Surface.Screen, bluePrints[styleMap][currentMap].fieldLayout[bluePrints[styleMap][currentMap].tileScroll[u].number - imlkpo].horX, bluePrints[styleMap][currentMap].fieldLayout[bluePrints[styleMap][currentMap].tileScroll[u].number - imlkpo].verY, 48, 48, 2, Color.Black);
		};*/
	
		for (let jojo = 0; jojo < bluePrints[styleMap][currentMap].contents.length; jojo++) {
			drawFieldSprite(bluePrints[styleMap][currentMap].contents[jojo], bluePrints[styleMap][currentMap].contents[jojo].sprite);
		};
		drawCharFieldSprite(NPClist[0], NPClist[0].activeSprite);
		drawCharFieldSprite(mainChar, mainChar.activeSprite);
		if (Nomad.visible) {
			drawCharFieldSprite(Nomad, Nomad.activeSprite);
		};
		
		for (let y = 0; y < bluePrints[styleMap][currentMap].landscape.length; y++) {
			drawWoodsyOwl(bluePrints[styleMap][currentMap].landscape[y]);
		};
		
		for (let q = 0; q < partyList.length; q++) {
			drawFieldStatus(partyList[q], q, this.partyOverview);
		};
		
		if (this.mapCheck) {
			illustrateMap(false);
		};
	}
	
	on_shutDown() {
		
		//partyList.length = 0;
	}
};
		
export let worldView = new walkWay;