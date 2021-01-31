//For ready acquisition of healing and battle items


import { from, Scene } from '/lib/sphere-runtime.js';


export class Dealer {
	
		constructor(seller) {
			
			this.name = seller.name;
			this.itemSale = seller.itemSale;
			this.isMainstream = seller.isMainstream;
			this.tileLock = seller.tileLock;
			this.wares = seller.wares;
			this.sprite = seller.sprite;
		}
		
		async dispense(idCard) {
			
			let customer = partyList.length > 1 ? partyList[idCard] : mainChar;
			let cannabis = this.itemSale ? makeShift[2][0] : makeShift[3][0]; //battle
			let cache = this.itemSale ? customer.agent.stock : customer.agent.stash;
			let chillPill;
			if (this.wares.length == 0 || ilapsian[1] + ilapse[1] < Date.now()) { //5mins
				let concomitant = [ ];
				while (concomitant.length < 6) {
					let cynthetic = from(cannabis)
						.where(it => !concomitant.includes(it))
						.where(it => it.rarity <= gambler.next().value + 0.1)
						.descending(it => it.rarity)
						.toArray();
					let cymbalic = from(cynthetic)	
						.where(it => it.rarity >= cynthetic[0].rarity - 0.33)
						.sample(1)
						.toArray();
					concomitant.push(cymbalic[0]);
				};
				this.wares = from(concomitant)	
					.ascending(it => cannabis.indexOf(it))
					.toArray();
				ilapsian[1] = Date.now();
			};
			chillPill = this.wares;
			let conditionality = this.isMainstream ? 1 : this.itemSale ? 1.15 : 1.30;
			let contactless = from(bluePrints[styleMap][currentMap].contents)
				.where(it => makeShift[5][0].includes(it))
				.where(it => it.isMainstream)
				.toArray();
			conditionality = contactless.length == 1 || !this.isMainstream ? conditionality : conditionality - ((contactless.length - 1) * 0.035);
			let credence = !this.isMainstream ? true : customer.reputation >= 4.8 ? true : false;
			
			await new Scene()
				.pezPopping(customer, cannabis, chillPill, conditionality, credence, cache)
				.run();
		};
}

export let dealerShops = [
Array.of(),
[ ],
Dealer,
];