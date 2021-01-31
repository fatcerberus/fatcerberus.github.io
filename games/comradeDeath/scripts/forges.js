//Forges for weapons and armor

import { from, Random, Scene } from '/lib/sphere-runtime.js';
import { Armor } from './armor.js';
import { aliasForge } from './functions.js';
import { Weapon } from './mainWeapons.js';


export class Forge
{
	constructor(smithy) {
		this.name = smithy.name;
		this.armorShop = smithy.armorShop;
		this.isMainstream = smithy.isMainstream;
		this.tileLock = smithy.tileLock;
		this.wares = smithy.wares;
		this.sprite = smithy.sprite;
	}
	
	async orderForm(num) {
		
		let buyer = partyList.length > 1 ? partyList[num] : mainChar;
		let cost = this.armorShop ? 4750 : 3250;
		let percent = this.isMainstream ? 1 : 1.45;
		let competition = from(bluePrints[styleMap][currentMap].contents)
			.where(it => makeShift[1][0].includes(it))
			.where(it => it.isMainstream)
			.toArray();
		percent = competition.length == 1 || !this.isMainstream ? percent : percent - ((competition.length - 1) * 0.035);
		let choices = this.armorShop ? allArmorList : allWeaponsList[Math.trunc(buyer.level / 4.5)];
		let willMake = !this.isMainstream ? true : buyer.reputation >= 4.8 ? true : false;
		let forgery = false;
		
		await new Scene()
			.weaponForge(buyer, cost, percent, choices, willMake)
			.run();
			
		if (scrollLock) {
			await new Scene()
					.hammerOut(buyer, buyer.provisions, cost, percent, choices)
					.run();
			forgery = true;
			scrollLock = false;
		};
		
		if (tempMenuOutput !== null && forgery) {
			let solaceSystem;
			let designUniverse = zangetsu.purity * bluePrints[styleMap][currentMap].mining;
			if (this.armorShop) {
				if (zangetsu.name == "Qing Xu Hide") {
					solaceSystem = mythicalArmorList[0];
				}
				else {
					let divineConspiracy = [
					Math.min(100, Math.round(Random.normal(zangetsu.grade * 20, (zangetsu.purity * 10)))),
					Math.min(100, Math.round(Random.normal(zangetsu.grade * 20, (zangetsu.purity * 10)))),
					Math.min(100, Math.round(Random.normal(zangetsu.grade * 20, (zangetsu.purity * 10)))),
					Math.min(100, Math.round(Random.normal(zangetsu.grade * 20, (zangetsu.purity * 10)))),
					];
					solaceSystem = new Armor ({ name: null, grade: zangetsu.grade, defense1: divineConspiracy[0], defense2: divineConspiracy[1], defense3: divineConspiracy[2], defense4: divineConspiracy[3], vim: Infinity});
					aliasForge(solaceSystem)
					allArmorList.push(solaceSystem);
				};
				buyer.agent.gear = solaceSystem;
				buyer.agent.armoryRun("initial");
			}
			else {
				solaceSystem = new Weapon ({ name: null, style: Math.round(gambler.next().value), range: null, grade: zangetsu.grade, weaponType: tempMenuOutput });
				solaceSystem.range = solaceSystem.style == 0 ? "Projectile" : "Melee";
				let phantomAgony = tempMenuOutput === "Shield" ? "Trident" : tempMenuOutput;
				let omega = [ new String("@/images/" + phantomAgony.toLowerCase() + "Alt-0"), new String("@/images/" + phantomAgony.toLowerCase() + "Alt-1") ];
				solaceSystem.battleSprite = [
				//await allWeaponsList[0][tempMenuOutput[1]].battleSprite[0],
				//await allWeaponsList[0][tempMenuOutput[1]].battleSprite[1],
				await Texture.fromFile(FS.fullPath(`${omega[0]}.png`)),
				await Texture.fromFile(FS.fullPath(`${omega[1]}.png`)),
				];
				aliasForge(solaceSystem)
				allWeaponsList[6].push(solaceSystem);
				solaceSystem.setValues();
				solaceSystem.power = Math.min(100, Math.round(Random.normal(solaceSystem.power, (zangetsu.purity * 10))));
				let consignOblivion = buyer.agent.weapon.length < 2 ? buyer.agent.weapon.length : buyer.agent.weapon.length == 3 ? 2 : buyer.agent.weapon.length == 2 && buyer.agent.weaponCurrent != null && buyer.agent.weaponCurrent.name !== "Fists" ? 1 : 2;
				buyer.agent.seizeWeapon(consignOblivion, solaceSystem);
			};
			zangetsu = [ ];
			tempMenuOutput = null;
		};
	};
};


export let forgeList = [
[ ],
[ ],
Forge,
]