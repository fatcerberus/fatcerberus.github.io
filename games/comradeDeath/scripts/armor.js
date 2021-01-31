//Creating the armor class (helmets, gauntlets, body armor, leggings)


export class Armor
{
	constructor(dense) {
		this.name = dense.name;
		this.grade = dense.grade;
		this.defense1 = dense.defense1;
		this.defense2 = dense.defense2;
		this.defense3 = dense.defense3;
		this.defense4 = dense.defense4;
		this.vim = dense.vim; //will they deteriorate?
	};
};

export const baseArmor = new Armor ({
	name: "Standard Armor",
	grade: 1,
	defense1: 20,
	defense2: 20,
	defense3: 20,
	defense4: 20,
	vim: Infinity,
});

export const jadeArmor = new Armor ({
	name: "Jade Armor",
	grade: 2,
	defense1: 35,
	defense2: 30,
	defense3: 20,
	defense4: 25,
	vim: Infinity,
});

export const ghoulArmor = new Armor ({
	name: "Ghoul Armor",
	grade: 3,
	defense1: 45,
	defense2: 35,
	defense3: 45,
	defense4: 30,
	vim: Infinity,
});

export const chainArmor = new Armor ({
	name: "Chainlink Armor",
	grade: 3,
	defense1: 65,
	defense2: 70,
	defense3: 50,
	defense4: 65,
	vim: Infinity,
});

export const qingXuArmor = new Armor ({
	name: "Qing Xu Hide",
	grade: 5,
	defense1: 89,
	defense2: 85,
	defense3: 87,
	defense4: 83,
	vim: Infinity,
});

export const preservationArmor = new Armor ({
	name: "Amnesty Armor",
	grade: 5,
	defense1: 92,
	defense2: 87,
	defense3: 90,
	defense4: 91,
	vim: Infinity,
});

export const renewalArmor = new Armor ({
	name: "Rewind Armor",
	grade: 5,
	defense1: 84,
	defense2: 93,
	defense3: 95,
	defense4: 88,
	vim: Infinity,
});

export const creationArmor = new Armor ({
	name: "Rainbow Armor",
	grade: 5,
	defense1: 94,
	defense2: 86,
	defense3: 89,
	defense4: 91,
	vim: Infinity,
});

export const destructionArmor = new Armor ({
	name: "Tempest Armor",
	grade: 5,
	defense1: 88,
	defense2: 93,
	defense3: 83,
	defense4: 96,
	vim: Infinity,
});