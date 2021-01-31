import { Random } from '/lib/sphere-runtime.js';

export class Forgeable
{
	constructor(resource) {
		this.name = resource.name;
		this.grade = resource.grade;
		this.rarity = resource.rarity;
		this.purity = resource.purity; //determines std dev
		this.onField = resource.onField; //naturally occurring or drop item only
		this.sprite = resource.sprite;
	}
};

export let intrinsicAlloy = new Forgeable ({
	name: "IntrinsicAlloy",
	grade: 5,
	rarity: 0.99,
	purity: 0.05,
	tileLock: null,
	onField: true,
	sprite: Texture.fromFile('@/images/forgeable0.png'),
});

export let cuttleFish = new Forgeable ({
	name: "Cuttlefish",
	grade: 1,
	rarity: 0.17,
	purity: 0.31,
	tileLock: null,
	onField: true,
	sprite: Texture.fromFile('@/images/forgeable0.png'),
});

export let qingXuHide = new Forgeable ({
	name: "Qing Xu Hide",
	grade: 5,
	rarity: 0.99,
	purity: 0.02,
	tileLock: null,
	onField: false,
	sprite: Texture.fromFile('@/images/forgeable0.png'),
});


export const rawMaterials = [
Array.of(
cuttleFish, //0
intrinsicAlloy //1
),
Array.of(),
];