//Into the realm beyond -- Accessible from dojos, or will there be actual shrines hidden/found around the world?

import { from, Prim, Scene, Thread } from '/lib/sphere-runtime.js';
import { appearify, cartography, drawCharFieldSprite, drawFieldSprite, drawFieldStatus, funTimes, gpsMe, mapMove, orientMe, selfSituate } from './functions.js';
import { personaList } from './personas.js';


export default
class exaltedShrine extends Thread 
{
	constructor() {
		super();
		
		this.image = null;
		this.fallBack = [ ];
	}
	
	async on_startUp() {
		
		veilOfElysium = this;
		this.takeFocus();
		this.mapStore = currentMap;
		sourceFeed = 4;
		currentMap = 0;
		styleMap = 2;
		funTimes();
		memo = "The goddess beckons you to her; choose how you will seek to attain to worthiness."
		if (!universeGalaxy[2].running && !zombie) {
			cartography();
		}
		else {
			this.fallBack = from(mainChar.lastTile)
				.where(it => Number.isInteger(it))
				.toArray();
			this.landPoint = mainChar.tileLock;
			//mainChar.tileLock = this.quasi[0][universeGalaxy[2].logger];
			//mapMove(0, this.quasi[1][universeGalaxy[2].logger].number);
		}
		this.pearlyGates = false;
		this.destinations = [ ];
		this.bumper = false;
		this.payOut = partyList.length > 1 ? [ mainChar.credit, partyList[1].credit ] : [ mainChar.credit ];
		orientMe(false);
		this.quasi = selfSituate();
		mainChar.tileLock = Math.ceil((bluePrints[styleMap][currentMap].fieldLayout.length - 1) / 2 - (widthness / 2));
		this.stairwayToNether = [ 0, this.quasi[0][2], widthness - 1, this.quasi[0][1], this.quasi[0][3], (heightness * widthness) - widthness, this.quasi[0][0], heightness * widthness - 1];
		appearify(mainChar);
		bluePrints[styleMap][currentMap].contents.length = 0;
		for (let j = 0; j < makeShift[0][0].length; j++) {
			bluePrints[styleMap][currentMap].contents.push(makeShift[0][0][j]);
			appearify(bluePrints[styleMap][currentMap].contents[j])
			this.destinations.push(makeShift[0][0][j].tileLock);
		};
	}
	
	on_inputCheck() {
		
		typo = Keyboard.Default.getKey();
	}
	
	async on_update() {
		
		let keyCode1 = [ Key.Up, Key.Left, Key.Down, Key.Right ];
		let keyCode2 = gameMode == "Standard" ? [ "w", "a", "s", "d" ] : [ "u", "h", "j", "k" ];
		if (!scrollLock) {
			if (typo != null && keyCode1.includes(typo)) {
				this.pearlyGates = false;
				mainChar.moveMent(keyCode1.indexOf(typo));
				this.bumper = this.stairwayToNether.includes(mainChar.tileLock) && this.pearlyGates ? true : false;
			}
			else if (typo != null && keyCode2.includes(Keyboard.Default.charOf(typo))) {
				this.pearlyGates = false;
				mainChar.moveMent(keyCode2.indexOf(Keyboard.Default.charOf(typo)));
				this.bumper = this.stairwayToNether.includes(mainChar.tileLock) && this.pearlyGates ? true : false;
			}
			
		};
		
		if (this.destinations.includes(mainChar.isFacing) && (typo == Key.Enter || typo == Key.P)) {
			let journey = this.destinations.indexOf(mainChar.isFacing);
			let almaty = typo == Key.Enter || partyList.length < 2 ? mainChar : partyList[1];
			let astana = typo == Key.Enter || partyList.length < 1 ? 0 : 1;
			await new Scene()
				.invite(null, almaty, journey, personaList, true, false, false, false, this.payOut[astana] == almaty.credit)
				.run();
		};
		
		if (typo == Key.V) {
			practiceFight = true;
			this.suspend();
			universeGalaxy[4].start();
		};
		
		if (this.bumper) {
			this.stop();
		};
	}
	
	on_render() {
		
		Prim.blit(Surface.Screen, 0, 0, bluePrints[styleMap][currentMap].imagery);
		for (let jojo = 0; jojo < bluePrints[styleMap][currentMap].contents.length; jojo++) {
			drawFieldSprite(bluePrints[styleMap][currentMap].contents[jojo], bluePrints[styleMap][currentMap].contents[jojo].sprite);
		};
		drawCharFieldSprite(mainChar, mainChar.activeSprite);
		
		for (let q = 0; q < partyList.length; q++) {
			drawFieldStatus(partyList[q], q, true);
		};
		
		let clubWrap = Font.Default.wordWrap(memo, 215);
		Prim.drawSolidRectangle(Surface.Screen, 0, 0, 225, 75, Color.Black.fadeTo(0.4));
		for (let j = 0; j < clubWrap.length; j++) {
			let verb = 10 + (j * 15);
			let adverb = Math.round((225 - Font.Default.widthOf(clubWrap[j])) / 2);
			Font.Default.drawText(Surface.Screen, adverb, 7 + verb, clubWrap[j], Color.White);
		};
	}
	
	on_shutDown() {
		
		if (this.bumper && !firstLaunch) {
			currentMap = this.mapStore;
			if (universeGalaxy[2].running) {
				styleMap = 0;
				sourceFeed = 1;
				mainChar.tileLock = this.landPoint;
				mainChar.lastTile = this.fallBack;
				funTimes();
				universeGalaxy[2].resume();
			}
			else {
				universeGalaxy[2].start();
			};
		};
	};
};

export let veilOfElysium = new exaltedShrine;