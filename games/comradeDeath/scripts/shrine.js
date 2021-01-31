//House of the gods?

export class Shrine {
	
	constructor(praise) {
		this.name = praise.name;
		this.tileLock = praise.tileLock;
		this.sprite = praise.sprite;
	};
};

const Shui = new Shrine({
	name: "Shui",
	tileLock: 171,
	sprite: Texture.fromFile('@/images/quantumEnigma1.png'),
});

export let shrineList = [
Array.of(Shui),
[ ],
];