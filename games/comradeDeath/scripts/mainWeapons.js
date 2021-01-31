//Create the Weapons class
/*Level 4 weapons are obtained from finishing dojo training, but can't be equipped until later. Stage 5s will be hidden
	throughout the world, held by high-level foes or mentors. Equipping a weapon of too high a class causes the spirit of
	the goddess to attack and leave the battler in critical condition.*/


import { from, Random } from '/lib/sphere-runtime.js';
import { generalMoves, weaponMoves } from './movepools.js';
import { weaponUnleashMoves } from './unleashes.js';

export class Weapon
{
	constructor(tool) {

		this.name = tool.name;
		this.style = tool.style; //Melee or finesse
		this.range = tool.range; //Projectile or in-close usage
		this.grade = tool.grade; //Determines the weapon tier
		this.power = tool.power; //Plays into damage formula
		this.unleashMoves = tool.unleashMoves; //The Unleash movepool associated with the weapon
		this.moves = tool.moves; //The movepool for that weapon
		this.robustness = tool.robustness; //How resistant it is to breakage
		this.isBroken = tool.isBroken; //True/False test of useability
		this.isLocked = tool.isLocked; //Determines if you can switch
		this.weaponType = tool.weaponType; //Which weapon type it is
		this.statusOpt = tool.statusOpt; //Array with one positive and one negative status
		this.battleSprite = tool.battleSprite;
	};
	
	breakCheck() { //Check if usage broke a weapon
		
		let a = this.brakeJob === undefined ? 0 : this.brakeJob;
		let x = Math.random() - 0.01;
		let y = Math.random() - 0.01;
		let z = ((x + y) / 2) + a;
		//let z = gambler.next().value - 0.2 + a;
		
		if (this.name != "Fists") {
			if (this.robustness < 1) {
				if (z > this.robustness) {
					this.isBroken = true;
				};
			};
		};
	};
		
	harm(tool) { //Damage output measure
		
		if (unleashUsed != true) {
			return this.power
		}
		else { return 99 };
	};
	
	setValues() {
		
		this.prepWeapon();
		let x = this.grade;
		let j = Math.min(100, Math.trunc(Random.normal(x * 20, Math.sqrt(x))));
		let y = .9 + (j * .001);
		this.power = j;
		this.robustness = Math.min(y, 1);
		this.isLocked = false;
	};
	
	prepWeapon() { //Make everything prettier by assigning sprites for the different weapon types
		
		switch(this.weaponType) {
		case "Axe":
			this.moves = weaponMoves[0];
			this.unleashMoves = weaponUnleashMoves[0];
			this.statusOpt = [4, 15]; //Bestial/Faltering
		break;
		case "Blade":
			this.moves = weaponMoves[1];
			this.unleashMoves = weaponUnleashMoves[1];
			this.statusOpt = [21, 13]; //Honed/Enslaved
		break; 
		case "Bow":
			this.moves = weaponMoves[2];
			this.unleashMoves = weaponUnleashMoves[2];
			this.statusOpt = [33, 32]; //Patience/Paranoid
		break;
		case "Dagger":
			this.moves = weaponMoves[3];
			this.unleashMoves = weaponUnleashMoves[3];
			this.statusOpt = [14, 23]; //Excel/Insidious
		break;
		case "Fists":
			this.moves = weaponMoves[4];
			this.unleashMoves = weaponUnleashMoves[4];
			this.statusOpt = [24, 3]; //Jolt/Bedeviled
		break;
		case "Mace":
			this.moves = weaponMoves[5];
			this.unleashMoves = weaponUnleashMoves[5];
			this.statusOpt = [16, 46]; //Fearless/Vortex
		break;
		case "Scythe":
			this.moves = weaponMoves[6];
			this.unleashMoves = weaponUnleashMoves[6];
			this.statusOpt = [25, 41]; //Kickback/Tagged
		break;
		case "Shield":
			this.moves = weaponMoves[7];
			this.unleashMoves = weaponUnleashMoves[7];
			this.statusOpt = [47, 8]; //Wary/Crystalize
		break;
		case "Shuriken":
			this.moves = weaponMoves[8];
			this.unleashMoves = weaponUnleashMoves[8];
			this.statusOpt = [10, 43]; //Deftness/Unaware
		break;
		case "Spear":
			this.moves = weaponMoves[9];
			this.unleashMoves = weaponUnleashMoves[9];
			this.statusOpt = [19, 38]; //Glide/Shrapnel
		break;
		case "Trident":
			this.moves = weaponMoves[10];
			this.unleashMoves = weaponUnleashMoves[10];
			this.statusOpt = [17, 37]; //Float/Rust
		break;
		};
	};
};


//Designate the various weapons

const baseAxe = new Weapon ({
	name: "Axe",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv1-0.png'),
	Texture.fromFile('@/images/axeLv1-1.png'),
	],
});

const baseBlade = new Weapon ({
	name: "Blade",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv1-0.png'),
	Texture.fromFile('@/images/bladeLv1-1.png'),
	],
});

const baseBow = new Weapon ({
	name: "Bow",
	style: null,
	range: "Projectile",
	grade: 1,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv1-0.png'),
	Texture.fromFile('@/images/bowLv1-1.png'),
	],
});

const baseDagger = new Weapon ({
	name: "Dagger",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv1-0.png'),
	Texture.fromFile('@/images/daggerLv1-1.png'),
	],
});

const baseMace = new Weapon ({
	name: "Mace",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv1-0.png'),
	Texture.fromFile('@/images/maceLv1-1.png'),
	],
});

const baseScythe = new Weapon({
	name: "Scythe",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv1-0.png'),
	Texture.fromFile('@/images/scytheLv1-1.png'),
	],
});

const baseShield = new Weapon ({
	name: "Shield",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const baseShuriken = new Weapon ({
	name: "Shuriken",
	style: null,
	range: "Projectile",
	grade: 1,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv1-0.png'),
	Texture.fromFile('@/images/shurikenLv1-1.png'),
	],
});

const baseSpear = new Weapon ({
	name: "Spear",
	style: null,
	range: "Projectile",
	grade: 1,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv1-0.png'),
	Texture.fromFile('@/images/spearLv1-1.png'),
	],
});

const baseTrident = new Weapon ({
	name: "Trident",
	style: null,
	range: "Melee",
	grade: 1,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv1-0.png'),
	Texture.fromFile('@/images/tridentLv1-1.png'),
	],
});

const crimsonAxe = new Weapon ({
	name: "Entwining Rose",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv2-0.png'),
	Texture.fromFile('@/images/axeLv2-1.png'),
	],
});

const crimsonBlade = new Weapon ({
	name: "Sparkling Ember",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv2-0.png'),
	Texture.fromFile('@/images/bladeLv2-1.png'),
	],
});

const crimsonBow = new Weapon ({
	name: "Crimson Gust",
	style: 2,
	range: "Projectile",
	grade: 2,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv2-0.png'),
	Texture.fromFile('@/images/bowLv2-1.png'),
	],
});

const crimsonDagger = new Weapon ({
	name: "Blood Fairy",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv2-0.png'),
	Texture.fromFile('@/images/daggerLv2-1.png'),
	],
});

const crimsonMace = new Weapon ({
	name: "Phoenix Wisp",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv2-0.png'),
	Texture.fromFile('@/images/maceLv2-1.png'),
	],
});

const crimsonScythe = new Weapon ({
	name: "Crimson Shadow",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv2-0.png'),
	Texture.fromFile('@/images/scytheLv2-1.png'),
	],
});

const crimsonShield = new Weapon ({
	name: "Solar Wall",
	style: 2,
	range: "Melee",
	grade: 2,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const crimsonShuriken = new Weapon ({
	name: "Lightning Flare",
	style: 2,
	range: "Projectile",
	grade: 2,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv2-0.png'),
	Texture.fromFile('@/images/shurikenLv2-1.png'),
	],
});

const crimsonSpear = new Weapon ({
	name: "Flickering Serpent",
	style: 1,
	range: "Projectile",
	grade: 2,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv2-0.png'),
	Texture.fromFile('@/images/spearLv2-1.png'),
	],
});

const crimsonTrident = new Weapon ({
	name: "Volcanic Wave",
	style: 1,
	range: "Melee",
	grade: 2,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv2-0.png'),
	Texture.fromFile('@/images/tridentLv2-1.png'),
	],
});

export const Fists = new Weapon ({
	name: "Fists",
	style: 1,
	range: "Melee",
	power: 5,
	grade: .5,
	//moves: weaponMoves[4],
	//unleashMoves: weaponUnleashMoves[4],
	robustness: 1,
	isLocked: false,
	weaponType: "Fists",
});

const mistAxe = new Weapon ({
	name: "Cavernous Maw",
	style: 1,
	range: "Melee",
	grade: 3,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv3-0.png'),
	Texture.fromFile('@/images/axeLv3-1.png'),
	],
});

const mistBlade = new Weapon ({
	name: "Mist Katana",
	style: 2,
	range: "Melee",
	grade: 3,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv3-0.png'),
	Texture.fromFile('@/images/bladeLv3-1.png'),
	],
});

const mistBow = new Weapon ({
	name: "Cerulean Wind",
	style: 2,
	range: "Projectile",
	grade: 3,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv3-0.png'),
	Texture.fromFile('@/images/bowLv3-1.png'),
	],
});

const mistDagger = new Weapon ({ //Can be thrown and then melts away
	name: "Veiled Fang",
	style: 2,
	range: "Projectile",
	grade: 3,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv3-0.png'),
	Texture.fromFile('@/images/daggerLv3-1.png'),
	],
});

const mistMace = new Weapon ({
	name: "Shattered Sky",
	style: 1,
	range: "Melee",
	grade: 3,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv3-0.png'),
	Texture.fromFile('@/images/maceLv3-1.png'),
	],
});

const mistScythe = new Weapon ({
	name: "Azure Abyss",
	style: 2,
	range: "Melee",
	grade: 3,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv3-0.png'),
	Texture.fromFile('@/images/scytheLv3-1.png'),
	],
});

const mistShield = new Weapon ({
	name: "Secluded Castle",
	style: 1,
	range: "Melee",
	grade: 3,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const mistShuriken = new Weapon ({
	name: "Glimmering Comet",
	style: 2,
	range: "Projectile",
	grade: 3,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv3-0.png'),
	Texture.fromFile('@/images/shurikenLv3-1.png'),
	],
});

const mistSpear = new Weapon ({
	name: "Serpent's Lash",
	style: 2,
	range: "Projectile",
	grade: 3,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv3-0.png'),
	Texture.fromFile('@/images/spearLv3-1.png'),
	],
});

const mistTrident = new Weapon ({
	name: "Diluvian Mayhem",
	style: 2,
	range: "Projectile",
	grade: 3,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv3-0.png'),
	Texture.fromFile('@/images/tridentLv3-1.png'),
	],
});

const profAxe = new Weapon ({
	name: "Razor's Edge",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv4-0.png'),
	Texture.fromFile('@/images/axeLv4-1.png'),
	],
});

const profBlade = new Weapon ({
	name: "Death Blade",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv4-0.png'),
	Texture.fromFile('@/images/bladeLv4-1.png'),
	],
});

const profBow = new Weapon ({
	name: "Piercing Gale",
	style: 2,
	range: "Projectile",
	grade: 4,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv4-0.png'),
	Texture.fromFile('@/images/bowLv4-1.png'),
	],
});

const profDagger = new Weapon ({
	name: "Violent Subtlety",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv4-0.png'),
	Texture.fromFile('@/images/daggerLv4-1.png'),
	],
});

const profMace = new Weapon ({
	name: "Gravity's Minstrel",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv4-0.png'),
	Texture.fromFile('@/images/maceLv4-1.png'),
	],
});

const profScythe = new Weapon ({
	name: "Soul Harvester",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv4-0.png'),
	Texture.fromFile('@/images/scytheLv4-1.png'),
	],
});

const profShield = new Weapon ({
	name: "Remote Enclosure",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const profShuriken = new Weapon ({
	name: "Jagged Precipice",
	style: 2,
	range: "Projectile",
	grade: 4,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv4-0.png'),
	Texture.fromFile('@/images/shurikenLv4-1.png'),
	],
});

const profSpear = new Weapon ({
	name: "Warlord's Lance",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv4-0.png'),
	Texture.fromFile('@/images/spearLv4-1.png'),
	],
});

const profTrident = new Weapon ({
	name: "Idyllic Tempest",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv4-0.png'),
	Texture.fromFile('@/images/tridentLv4-1.png'),
	],
});

const reiAxe = new Weapon ({
	name: "Ancient Relic",
	style: 2,
	range: "Melee",
	grade: 5,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv5-0.png'),
	Texture.fromFile('@/images/axeLv5-1.png'),
	],
});

const reiBlade = new Weapon ({
	name: "Edge of Chaos",
	style: 1,
	range: "Melee",
	grade: 5,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv5-0.png'),
	Texture.fromFile('@/images/bladeLv5-1.png'),
	],
});

const reiBow = new Weapon ({
	name: "Rampaging Hurricane",
	style: 2,
	range: "Projectile",
	grade: 5,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv5-0.png'),
	Texture.fromFile('@/images/bowLv5-1.png'),
	],
});

const reiDagger = new Weapon ({
	name: "Rabid Lycan",
	style: 2,
	range: "Melee",
	grade: 5,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv5-0.png'),
	Texture.fromFile('@/images/daggerLv5-1.png'),
	],
});

const reiMace = new Weapon ({
	name: "Mournful Bell",
	style: 1,
	range: "Melee",
	grade: 5,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv5-0.png'),
	Texture.fromFile('@/images/maceLv5-1.png'),
	],
});

const reiScythe = new Weapon ({
	name: "Death Sceptre",
	style: 2,
	range: "Melee",
	grade: 5,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv5-0.png'),
	Texture.fromFile('@/images/scytheLv5-1.png'),
	],
});

const reiShield = new Weapon ({
	name: "Diamond Fortress",
	style: 1,
	range: "Melee",
	grade: 5,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const reiShuriken = new Weapon ({
	name: "Silent Night",
	style: 2,
	range: "Projectile",
	grade: 5,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv5-0.png'),
	Texture.fromFile('@/images/shurikenLv5-1.png'),
	],
});

const reiSpear = new Weapon ({
	name: "Enraged Dragon",
	style: 1,
	range: "Melee",
	grade: 5,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv5-0.png'),
	Texture.fromFile('@/images/spearLv1-1.png'),
	],
});

const reiTrident = new Weapon ({
	name: "Tine of Destiny",
	style: 1,
	range: "Melee",
	grade: 5,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv5-0.png'),
	Texture.fromFile('@/images/tridentLv5-1.png'),
	],
});

const transAxe = new Weapon ({
	name: "Insurmountable Force",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeLv6-0.png'),
	Texture.fromFile('@/images/axeLv6-1.png'),
	],
});	

const transBlade = new Weapon ({
	name: "Immortal Melancholy",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeLv6-0.png'),
	Texture.fromFile('@/images/bladeLv6-1.png'),
	],
});

const transBow = new Weapon ({
	name: "Unbending Tyrant",
	style: 2,
	range: "Projectile",
	grade: 6,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowLv6-0.png'),
	Texture.fromFile('@/images/bowLv6-1.png'),
	],
});

const transDagger = new Weapon ({
	name: "Incessant Assault",
	style: 2,
	range: "Melee",
	grade: 6,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerLv6-0.png'),
	Texture.fromFile('@/images/daggerLv6-1.png'),
	],
});

const transMace = new Weapon ({
	name: "Immeasurable Impact",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceLv6-0.png'),
	Texture.fromFile('@/images/maceLv6-1.png'),
	],
});

const transScythe = new Weapon ({
	name: "Inevitable Doom",
	style: 2,
	range: "Melee",
	grade: 6,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheLv6-0.png'),
	Texture.fromFile('@/images/scytheLv6-1.png'),
	],
});

const transShield = new Weapon ({
	name: "Impenetrable Sanctuary",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Shield",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const transShuriken = new Weapon ({
	name: "Invisible Demise",
	style: 2,
	range: "Projectile",
	grade: 6,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenLv6-0.png'),
	Texture.fromFile('@/images/shurikenLv6-1.png'),
	],
});

const transSpear = new Weapon ({
	name: "Unhealing Wound",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/spearLv6-0.png'),
	Texture.fromFile('@/images/spearLv6-1.png'),
	],
});

const transTrident = new Weapon ({
	name: "Unfathomable Trauma",
	style: 1,
	range: "Melee",
	grade: 6,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const xtraAxe = new Weapon ({
	name: "Executioner's Invite",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Axe",
	battleSprite: [
	Texture.fromFile('@/images/axeAlt-0.png'),
	Texture.fromFile('@/images/axeAlt-1.png'),
	],
});

const xtraBlade = new Weapon ({
	name: "Dual Swords",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Blade",
	battleSprite: [
	Texture.fromFile('@/images/bladeAlt-0.png'),
	Texture.fromFile('@/images/bladeAlt-1.png'),
	],
});	

const xtraBow = new Weapon ({
	name: "Demon's Harp",
	style: 1,
	range: "Projectile",
	grade: 4,
	weaponType: "Bow",
	battleSprite: [
	Texture.fromFile('@/images/bowAlt-0.png'),
	Texture.fromFile('@/images/bowAlt-1.png'),
	],
});	

const xtraDagger = new Weapon ({
	name: "Shadow Emissary",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Dagger",
	battleSprite: [
	Texture.fromFile('@/images/daggerAlt-0.png'),
	Texture.fromFile('@/images/daggerAlt-1.png'),
	],
});	

const xtraMace = new Weapon ({
	name: "Forlorn Porcupine",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Mace",
	battleSprite: [
	Texture.fromFile('@/images/maceAlt-0.png'),
	Texture.fromFile('@/images/maceAlt-1.png'),
	],
});

const xtraScythe = new Weapon ({
	name: "Cruel Embrace",
	style: 2,
	range: "Melee",
	grade: 4,
	weaponType: "Scythe",
	battleSprite: [
	Texture.fromFile('@/images/scytheAlt-0.png'),
	Texture.fromFile('@/images/scytheAlt-1.png'),
	],
});

const xtraShuriken = new Weapon ({
	name: "Howling Demon",
	style: 1,
	range: "Projectile",
	grade: 4,
	weaponType: "Shuriken",
	battleSprite: [
	Texture.fromFile('@/images/shurikenAlt-0.png'),
	Texture.fromFile('@/images/shurikenAlt-1.png'),
	],
});

const xtraSpear = new Weapon ({
	name: "Dual Spear",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Spear",
	battleSprite: [
	Texture.fromFile('@/images/tridentLv6-0.png'),
	Texture.fromFile('@/images/tridentLv6-1.png'),
	],
});

const xtraTrident = new Weapon ({
	name: "Converging Light",
	style: 1,
	range: "Melee",
	grade: 4,
	weaponType: "Trident",
	battleSprite: [
	Texture.fromFile('@/images/tridentAlt-0.png'),
	Texture.fromFile('@/images/tridentAlt-1.png'),
	],
});


export let skeletalWeapons = [ baseAxe, baseBlade, baseBow, baseDagger, baseMace, baseScythe, baseShield, baseShuriken, baseSpear, baseTrident];
//grade 1 - from shops
export let crimsonWeapons = [ crimsonAxe, crimsonBlade, crimsonBow, crimsonDagger, crimsonMace, crimsonScythe, crimsonShield, crimsonShuriken, crimsonSpear, crimsonTrident];
//grade 2 - From shops, bazaars or forges
export let chrysocollaWeapons = [ mistAxe, mistBlade, mistBow, mistDagger, mistMace, mistScythe, mistShield, mistShuriken, mistSpear, mistTrident];
//grade 3 - From forges and some bazaars
export let specialtyWeapons = [ xtraAxe, xtraBlade, xtraBow, xtraDagger, xtraMace, xtraScythe, xtraShuriken, xtraSpear, xtraTrident ];
//Some weapon types will have unique outliers - Also grade 4
export let masterWeapons = [ profAxe, profBlade, profBow, profDagger, profMace, profScythe, profShield, profShuriken, profSpear, profTrident];
//Grade 4 - For attaining the peak of a dojo, rarely found in bazaars, can be had in some cases by defeating masters
export let mythicalWeapons = [ reiAxe, reiBlade, reiBow, reiDagger, reiMace, reiScythe, reiShield, reiShuriken, reiSpear, reiTrident];
//Berserk class (grade 5) - acquisition TBD. Probably super boss fights. Maybe defeating a personal demon?
export let transcendentalWeapons = [ transAxe, transBlade, transBow, transDagger, transMace, transScythe, transShield, transShuriken, transSpear, transTrident];
//grade 6 - Mystery quest