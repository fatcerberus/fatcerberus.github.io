import { from, Pact, Query, Random } from '/lib/sphere-runtime.js';

export class Sentience
{
	constructor(wit) {
		
		this.name = wit.name;
		this.availAttacks = wit.availAttacks; //Checks which moves are able to be used
		this.wasAssaulted = wit.wasAssualted;
		this.itemChoice = wit.itemChoice;
		this.hasAsphyx = wit.hasAsphyx;
	}
	
	asphyxCure(host) {
		
		let trustButVerify = false;
		let wereWolf = host.statusSearch(1)
		let coneHead = false;
		let marceline = false;
		if (wereWolf !== false) {
			coneHead = host.alteredState[wereWolf][1] <= 2;
			let bigFoot = host.health / host.healthMax <= 0.71;
			if (bigFoot) {
				let greenFlag = from(host.comrades).sample(1).toArray();
				trustButVerify = greenFlag[0];
			}
			else {
				if (coneHead) {
					let lostSoul = wereWolf === host.alteredState.length - 1;
					let slenderMan = from(host.stock)
						.where(it => it[0].name === "Borshch" || it.name === "Ancient Herb")
						.descending(it => it[0].name)
						.toArray();
					if (slenderMan.length > 0) {
						let nightMan = host.stock.indexOf(slenderMan[1]);
						let buoyShoal = host.stock.indexOf(slenderMan[0]);
						let trollToll = buoyShoal >= 0 && lostSoul ? host.stock[buoyShoal] : slenderMan[1] == null ? false : "paid";
						if (trollToll === "paid") {
							trollToll = host.stock[nightMan];
							marceline = true;
						};
						trustButVerify = trollToll;
					};
				};	
			};
		};
		this.hasAsphyx = [coneHead, wereWolf, marceline];
		return trustButVerify;
	};
	
	doStuff(host) {
		
		let heimLich = this.asphyxCure(host);
		if (this.hasAsphyx[0] === true) {
			host.moveChoice = heimLich;
			return this.hasAsphyx;
		}
		else {
			if (host.lastAttacker != null) {
				let x = battlerList[host.lastAttacker];
				let y = x.lastAction;
			}

			host.bonusMath(false);
			let stalin = null; //return
			let lenin = ussr.boostWeapon > 1.025 ? 1 : ussr.boostWeapon == 1.025 ? 2 : 3;
			let soviet = ussr.health / ussr.healthMax;
			let red = [ ];
			let moscow = soviet <= this.painThreshold ? true : false;
			let trotsky = ussr.alteredState.length > 0 ? from(ussr.alteredState).where(it => it[0].statusType == 0).toArray() : false;
			let marx = [ false, false, false, false, false ]; //action options
			let cccp;
			let kulak = [ ];
			let ribbentrop = [ ussr.movePool, ussr.stash[0], ussr.stock[0], ussr.comrades, ussr.specialMoves ];
			let molotov = [ ];
			let sickle = [ ];
			let seige;
			let yuri;
			let andropov = false;
			let krushchyov = 0;
			let glasnost;
			let gorbachyov;
			
			
			if (((ussr.weaponCurrent.name == "Fists") || (ussr.statusSearch(39) !== false)) && ussr.weapon.length > 0) {
				molotov = from(ussr.weapon).groupBy(it => it.style == this.prefStyle)
				cccp = molotov.true != null ? ussr.weapon.indexOf(molotov.true[0]) : 0;
				molotov = [ ];
				molotov.push(...ussr.allCapabilities);
			};
			
			sickle[0] = ussr.movePool.length == 0 ? null : lenin === 1 ? true : false;
			if (ribbentrop[1].length > 0) {
				if (ussr.lastAction.length > 0) {
					yuri = ussr.lastAction.length > 3 ? 3 : ussr.lastAction.length;
					for (let rib = 0; rib < yuri; rib++) {
						if (ussr.lastAction[rib] != null) {
							if (ussr.lastAction[rib].giveStatus == true) {
								andropov = true;
							};
						};
					};
					if (!andropov) {
						kulak.length = 0;
						kulak = from(ussr.stash[0])
							.where(it => list1[it.giveStatus].statusType == 0)
							.toArray();
						kulak = kulak.length > 0 ? kulak: null;
					}
					sickle[1] = andropov;
				};
			}
			else {
				sickle[1] = null;
			};
			sickle[2] = ussr.stock.length == 0 || ussr.health / ussr.healthMax > .9 ? null : moscow ? true : false;
			sickle[3] = ussr.comrades.length == 0 || ussr.health / ussr.healthMax > .7 ? null : moscow ? true : false;
			if (ussr.unleashMeter >= 40) {
				red = from(ribbentrop[4])
					.where(it => it.drain <= ussr.unleashMeter)
					.toArray();
				if (red.length > 0) {
					ribbentrop[4] = red;
				};
				sickle[4] = red.length == 0 ? false : ussr.unleashMeter > 60 ? true : false;
			}
			else {
				sickle[4] = null;
			};
			sickle[5] = molotov.length > 0 ? true : null;
					
			
			switch(ussr.persona.name) {
								
				case "Absolved":
					this.stratPref[0] = sickle[0] == null ? 0 : sickle[0] == true ? .68 : .37;
					this.stratPref[1] = sickle[1] == null ? 0 : sickle[1] == true ? .57 : .29;
					this.stratPref[2] = sickle[2] == null ? 0 : sickle[2] == true ? .31 : .08;
					this.stratPref[3] = sickle[3] == null ? 0 : sickle[3] == true ? .24 : .20;
					this.stratPref[4] = sickle[4] == null ? 0 : sickle[4] == true ? .89 : .54;
					this.stratPref[5] = sickle[5] == null ? 0 : 1;
					
					seige = from(battlerList)
						.where(it => it.isProtag != ussr.isProtag)
						.where(it => it.battlerType != 1)
						.descending(it => it.persona.name)
						.toArray();
				break;
			}
			
			if (this.stratPref[5] != 0) {
				ribbentrop.push(...molotov);
			}
			else {
				this.stratPref.splice(5, 1);
			};
			while (stalin == null) {
				let purge = Math.random()
				stalin = this.stratPref[krushchyov] < purge ? null : ribbentrop[krushchyov].length > 0 ? ribbentrop[krushchyov] : null;
				krushchyov = krushchyov < this.stratPref.length - 1 ? krushchyov + 1 : 0;
			};
			glasnost = from(battlerList)
				.where(it => it.isProtag != ussr.isProtag)
				.ascending(it => it.name)
				.toArray();
			gorbachyov = seige.length == 0 || stalin[0].techType == 4 || stalin[0].techType == 5 ? glasnost[0] : seige[0];
			ussr.setVictim(battlerList.indexOf(gorbachyov));
			this.stratPref.length = 0;
			ussr.toRandomize = stalin == molotov ? cccp : null;
			if (stalin.length == 0) {
				stalin = allCapabilities;
				ussr.toRandomize = 1;
			};
			return stalin;
		};
	};
};