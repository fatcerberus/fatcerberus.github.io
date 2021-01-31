//I guess I should have some in-battle use items?

import { from, Random, Scene } from '/lib/sphere-runtime.js';


export class Item
{
	constructor(potion)	{
		this.name = potion.name;
		this.techType = potion.techType;
		this.amount = potion.amount; //The percentage of maximum HP recovered
		this.potency = potion.potency; //How much variance there is -- Armor slot for berries
		this.rarity = potion.rarity;
		this.rank = potion.rank;
		this.tileLock = potion.tileLock;
		this.sprite = potion.sprite;
	};
	
	async chew(vic) {
		
		if (vic.target.alteredState.length > 0) {
			await new Scene()
				.tempMenu(Array.of("Alterations"), vic.target, Array.of(vic.target.alteredState), 295)
				.run();
			if (tempMenuOutput != null) {
				vic.target.alteredState[tempMenuOutput][0].redact(vic.target);
				vic.target.alteredState.splice(tempMenuOutput, 1);
				tempMenuOutput = null;
			};
		};
	};
	
	async gnaw(vic) {
		
		let i = vic.moveChoice.amount * vic.target.healthMax;
		let q = Math.trunc(Random.normal(i, (vic.moveChoice.potency * i)));
		vic.target.heal(q);
		
		switch(this.name) {
			
			case "Borshch":
				vic.target.kelpTape();
			break;
			case "Ancient Herb":
				if (vic.isProtag && vic.target.alteredState.length > 0) {
					await new Scene()
						.tempMenu(Array.of("Alterations"), vic.target, Array.of(vic.target.alteredState), 295)
						.run();
					if (tempMenuOutput != null) {
						vic.target.alteredState[tempMenuOutput][0].redact(vic.target);
						vic.target.alteredState.splice(tempMenuOutput, 1);
						tempMenuOutput = null;
					};
				}
			break;
			case "Mythic Acorn":
				vic.addStatus(44);
			break;
		};
	};
	
	nibble(vic) {
		
		if (vic.berserkSuit[this.potency] != null) {
			vic.berserkSuit[this.potency].vim += this.amount;
		};
	};
};

const ancientHerb = new Item ({ //Restores ~5% of HP and removes a specified status
	name: "Ancient Herb",
	techType: 4,
	amount: .05,
	potency: .07,
	rarity: 0.82,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const boiledLeaves = new Item ({ //Restore ~9% of HP
	name: "Boiled Leaves",
	techType: 4,
	amount: .09,
	potency: .04,
	rarity: 0.14,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const Borshch = new Item ({ //Restores ~3% of HP and removes the most recent negative (removable) status received
	name: "Borshch",
	techType: 4,
	amount: .03,
	potency: .02,
	rarity: 0.52,
	rank: 2,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const instaClot = new Item ({ //Restore ~11% of HP
	name: "Insta-clot",
	techType: 4,
	amount: .11,
	potency: .07,
	rarity: 0.31,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const mythicAcorn = new Item ({ //Restores ~2% of HP and endows Unyielding status
	name: "Mythic Acorn",
	techType: 4,
	amount: .02,
	potency: .04,
	rarity: 0.4,
	rank: 2,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const Salve = new Item ({ //Restores ~3% of HP
	name: "Salve",
	techType: 4,
	amount: .03,
	potency: .02,
	rarity: 0.02,
	rank: 1.5,
	sprite: Texture.fromFile('@/images/berry1.png'),
});

const blizzardBerry = new Item ({ //Restores vim to comrade boot armor
	name: "Blizzard Berry",
	techType: 5,
	amount: 5,
	potency: 3,
	rarity: 0.12,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/ferris1.png'),
});

const lavaBerry = new Item ({ //Restores vim to comrade gauntlets armor
	name: "Lava Berry",
	techType: 5,
	amount: 5,
	potency: 2,
	rarity: 0.12,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/ferris1.png'),
});

const mudBerry = new Item ({ //Restores vim to comrade chest armor
	name: "Mud Berry",
	techType: 5,
	amount: 5,
	potency: 1,
	rarity: 0.12,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/ferris1.png'),
});

const zephyrBerry = new Item ({ //Restores vim to comrade helm armor
	name: "Zephyr Berry",
	techType: 5,
	amount: 5,
	potency: 0,
	rarity: 0.12,
	rank: 2.5,
	sprite: Texture.fromFile('@/images/ferris1.png'),
});

export const healList = [
Array.of(
ancientHerb, //0
boiledLeaves, //1
Borshch, //2
instaClot, //3
mythicAcorn, //4
Salve, //5
blizzardBerry, //6
lavaBerry, //7
mudBerry, //8
zephyrBerry, //9
),
[ ],
];