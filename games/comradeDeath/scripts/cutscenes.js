//Cutscene Test

import { Easing, from, Music, Prim, Random, Scene, Tween } from '/lib/sphere-runtime.js';
import { drawFieldSprite, drawMenu, drawMenuSorter, hitchHike, npcApproach2, quickPaint, randoFoe } from './functions.js';
import { statusList } from './statuses.js';


Scene.defineOp('confront', {
	
	start(scene, act, npc, banTiles) {
		
		this.act = act;
		this.npc = npc;
		this.lava = banTiles;
		universeGalaxy[2].timer = Infinity;
		scrollLock = true;
	},
	
	render(scene) {
		
		//drawFeldSprite(this.npc, this.npc.activeSprite);
	},
	
	async update(scene) {
		
		let vputi = npcApproach2(this.act, this.npc, this.lava);
		if (vputi !== false) {
			for (let x = 0; x < vputi.length; x++) {
				this.npc.moveMent(vputi[x]);
				await Sphere.sleep(30);
			};
		};
		
		//if (this.npc.isFacing == this.act.tileLock) {
			universeGalaxy[2].timer = (Sphere.now() - timeCheck) + 250;
			Keyboard.Default.clearQueue();
			scrollLock = false;
			return false;
		/*}
		else {
			return true;
		};*/
	},
});


Scene.defineOp('enlighten', {
	
	start(scene) {
	
		this.color = Color.Black;
		this.catacomb = Nomad.fatigue ? true : false;
		this.text = Nomad.fatigue ? "Why are you still bothering me?" : "I am a mirthful minstrel. Do you seek knowledge?";
		this.spillOver = knowledgeBank[0].length > 0 ? 0 : 1;
		this.num = knowledgeBank[0].length > 0 ? Random.discrete(0, knowledgeBank[0].length - 1) : Random.discrete(0, knowledgeBank[1].length - 1);
		this.insight = Font.Default.wordWrap(this.text, 150);
		this.keepOn = true;
		this.x = Surface.Screen.width / 2 - 25;
		this.y = Surface.Screen.height / 1.5;
		this.typo = null;
		scrollLock = true;
	},
	
	render(scene) {
	
		Prim.drawSolidRectangle(Surface.Screen, this.x, this.y, 165, this.insight.length * 25 + 10, Color.DeepPink)
		for (let j = 0; j < this.insight.length; j++) {
			let adj = 10 + (j * 20);
			let adv = Math.round((165 - Font.Default.widthOf(this.insight[j])) / 2);
			Font.Default.drawText(Surface.Screen, this.x + adv, this.y + adj, this.insight[j], this.color);
		};
	},
	
	async update(scene) {
		
		if (this.typo == Key.Enter || this.typo == Key.Y) {
			if (!this.catacomb) {
				this.catacomb = true;
				this.text = knowledgeBank[this.spillOver].length > 0 ? knowledgeBank[this.spillOver][this.num] : "All I have I have given. Honk.";
				this.insight = Font.Default.wordWrap(this.text, 150);
				if (knowledgeBank[this.spillOver].includes(this.text)) {
					knowledgeBase.push(knowledgeBank[this.spillOver][this.num]);
					knowledgeBank[this.spillOver].splice(this.num, 1);
				};
				Nomad.fatigue = true;
			}
			else {
				this.keepOn = false;
			};
		};
			
		if (this.typo == Key.Escape || this.typo == Key.N) {
			this.keepOn = false;
		};
		
		if (this.keepOn) {
			return true;
		}
		else {
			scrollLock = false;
			return false;
		};
	},
	
	getInput(scene) {
	
		this.typo = Keyboard.Default.getKey();
	},
});

Scene.defineOp('hammerOut', {
	
	start(scene, sinner, indulgences, extravagance, penalty, manna) {
	
		this.sinner = sinner;
		this.hailMary = [ ];
		this.indulgences = indulgences;
		//this.temptation = [ ];
		this.penance = true;
		this.vestments = 0;
		this.purgatory = false;
		this.sacrament = null;
		this.temptation = manna.includes(allArmorList[0]) ? true : false;
		this.donation = [ ];
		memo = "What do you want me to make?";
		this.typo = null;
		scrollLock = true;
		for (let j = 0; j < this.indulgences[0].length; j++) {
			this.donation.push(Math.round(extravagance * this.indulgences[0][j].grade * penalty));
			//this.temptation.push(this.indulgences[0][j][1]);
			this.hailMary.push(this.indulgences[0][j].name + " (grade: " + this.indulgences[0][j].grade + ")" + " zh^" + this.donation[j] + "  " + this.indulgences[1][j]);
		};
	},
	
	render(scene) {
		
		Prim.drawSolidRectangle(Surface.Screen, 0, 0, 250, 29, Color.Chartreuse, Color.DarkGreen);
		Prim.drawRectangle(Surface.Screen, 0, 0, 250, 29, 2, Color.Black);
		Font.Default.drawText(Surface.Screen, 10, 10, memo, Color.MidnightBlue);
		drawMenu(0, 29, Font.Default.widthOf(" zh^100,000"), 30, this.hailMary, 6, null, Color.DarkMaroon);
		if (this.hailMary.length > 0) {
			Prim.drawSolidCircle(Surface.Screen, 1, 29 * (menuScroll + 1), 2, Color.Lime);
		};
	},
	
	async update() { 
		
		if (this.hailMary.length == 0) {
			memo = "Where are your raw materials?";
			this.purgatory = true;
			this.penance = false;
		};
		
		if (this.typo == Key.Up) {
			if (menuScroll > 0) {
				menuScroll--;
			};
		};
		if (this.typo == Key.Down) {
			if (menuScroll < this.hailMary.length - 1) {
				++menuScroll;
			};
		};
		
		if (this.typo == Key.Enter) {
			if (this.sinner.credit < this.donation[menuScroll] && this.sacrament == null) {
				memo = "I don't work for free, chump.";
				this.purgatory = true;
				this.penance = false;
			}
			else {
				if (this.sacrament == null && !this.temptation) {
					this.sinner.credit -= this.donation[menuScroll];
					this.vestments = menuScroll;
					this.hailMary = [ "Axe", "Blade", "Bow", "Dagger", "Mace", "Scythe", "Shield", "Shuriken", "Spear", "Trident" ];
					this.sacrament = true;
					menuScroll = 0;
				}
				else {
					zangetsu = this.indulgences[0][this.vestments];
					tempMenuOutput = this.hailMary[menuScroll];
					this.indulgences[1][this.vestments] -= 1;
					if (this.indulgences[1][this.vestments] == 0) {
						this.indulgences[0].splice(this.vestments, 1);
						this.indulgences[1].splice(this.vestments, 1);
					};
					this.penance = false;
				};
			};
		};
		
		if (this.typo == Key.Escape) {
			this.penance = false;
		};
		
		if (this.penance) {
			return true;
		}
		else {
			if (this.purgatory) {
				await Sphere.sleep(35);
			};
			scrollLock = false;
			menuScroll = 0;
			return false;
		}
	},
	
	getInput() {
		
		this.typo = Keyboard.Default.getKey();
	},
});

Scene.defineOp('intro', {
	
	start(scene, tyrantrum) {
	
		this.text = "Comrade Death awaits you in an endless spiral of despair.";
		this.text += zombie ? " Continue your doomed quest?" : " Will you enter this twilight world?";
		this.color = Color.Black;
		this.opt = tyrantrum;
		this.cleanText = Font.Default.wordWrap(this.text, 225);
		this.x = Surface.Screen.width / 2 - 125;
		this.y = Surface.Screen.height / 2 - 35;
		this.egg = false;
		this.choose = false;
		this.sprawl = [ ];
		this.subHeader = "Game Mode: " + gameMode;
		this.cycleSaves = false;
		this.modality = [ "Standard", "Classic", "Dynamic" ];
		this.modelo = [ Key.S, Key.C, Key.D ];
		//this.select = [ Key.D0, Key.D1, Key.D2 ];
		//this.select.length = this.opt.length;
		this.typo = null;
		this.overWrite = false;
	},

	render(scene) {
	
		Prim.blit(Surface.Screen, 0, 0, backImage[gameImage]);
		Prim.drawSolidRectangle(Surface.Screen, this.x, this.y, 250, 35 * this.cleanText.length, Color.DeepPink)
		if (this.egg) {
			Prim.blit(Surface.Screen, 50, 50, easterEgg);
		};
		for (let j = 0; j < this.cleanText.length; j++) {
			let adj = this.text.includes("Incompatible") ? 10 + (j * 15) : 35 + (j * 15);
			let adv = Math.round((250 - Font.Default.widthOf(this.cleanText[j])) / 2);
			Font.Default.drawText(Surface.Screen, this.x + adv, this.y + adj, this.cleanText[j], this.color);
		};
		
		Prim.drawSolidRectangle(Surface.Screen, 0, 0, 50, 15, Color.Black)
		Font.Default.drawText(Surface.Screen, 5, 2, this.subHeader, Color.Teal);
	},
	
	async update(scene) {
	
		if (this.modelo.includes(this.typo)) {
			gameMode = this.modality[this.modelo.indexOf(this.typo)];
			this.subHeader = "Game Mode: " + gameMode;
		};
		
		if (this.opt.length > 0) {			
			if (this.typo == Key.F6 && !this.choose) {
				this.cycleSaves = this.cycleSaves ? false : true;
				this.text = "Comrade Death awaits you in an endless spiral of despair.";
				this.text += this.cycleSaves ? " Continue another doomed quest?" : " Continue your doomed quest?";
				this.cleanText = Font.Default.wordWrap(this.text, 225);
			};
					
			if (this.cycleSaves) {
				if (this.typo == Key.Enter || this.typo == Key.Y ) {
					if (!zombie) {
						if (this.overWrite) {
							FS.deleteFile(saveFace);
							retroLancer = null;
						};
						if (this.opt.length === 0) {
							hitchHike(this.opt.length);
						};
						gameImage = 0;
						Music.play('@/music/Downfall.ogg');
						firstLaunch = false;
					}
					else {
						if (!this.choose) {
							this.choose = true;
							this.text += "\n";
							for (let j = 0; j < this.opt.length; j++) {
								let bullion;
								if (this.opt[j] !== null) {
									bullion = j;
									this.sprawl.push(null);
								}
								else if (this.text.includes("New (W)")) {
									bullion = "New (E)";
									this.sprawl.push(Key.E);
								}
								else {
									bullion = "New (W)";
									this.sprawl.push(Key.W);
								};
								this.text += "[ " + bullion + " ]"
								this.text = j === this.opt.length - 1 ? this.text : this.text + "   ";
							};
							this.cleanText = Font.Default.wordWrap(this.text, 225);
						};
					};	
				}
				else if (this.choose && this.typo != null && this.opt.includes(Keyboard.Default.charOf(this.typo))) {
					hitchHike(this.opt.indexOf(Keyboard.Default.charOf(this.typo)));
					if (!this.overWrite) {
						retroLancer = await JSON.fromFile(saveFace);
						if (retroLancer[11] == saveVersion) {
							firstLaunch = false;
						}
						else {
							this.text = "Incompatible save file. \nOverwrite file and start new game?";
							this.cleanText = Font.Default.wordWrap(this.text, 225);
							zombie = false;
							this.overWrite = true;
						};
					}
					else {
						this.text = "Are you sure you want to permanently delete this save file?";
						this.cleanText = Font.Default.wordWrap(this.text, 225);
						zombie = false;
						this.overWrite = true;
					};
				}
				else if (this.choose && (this.typo != null && this.sprawl.includes(this.typo))) {
					hitchHike(this.sprawl.indexOf(this.typo));
					zombie = false;
					gameImage = 0;
					Music.play('@/music/Downfall.ogg');
					firstLaunch = false;
				}
				else if (this.typo == Key.F1) {
					this.egg = this.egg == false ? true : false;
				}
				else if (this.typo == Key.N) {
					if (this.opt.length === 3) {
						if (this.opt.includes(null)) {
							hitchHike(this.opt.indexOf(null));
							zombie = false;
							gameImage = 0;
							Music.play('@/music/Twilight-World.ogg');
							firstLaunch = false;
						}
						else if (!this.choose) {
							this.choose = true;
							this.overWrite = true;
							this.text = "Choose which file to overwrite. \n";
							for (let j = 0; j < this.opt.length; j++) {
								this.text += " [ " + j + " ]    ";
							};
							this.cleanText = Font.Default.wordWrap(this.text, 225);
						}
						else if (this.overWrite) {
							this.text = "Choose which pointless mission to continue. \n";
							for (let j = 0; j < this.opt.length; j++) {
								this.text += " [ " + j + " ]    ";
							};
							this.cleanText = Font.Default.wordWrap(this.text, 225);
							zombie = true;
							this.overWrite = false;
						};
					}
					else {
						hitchHike(this.opt.length);
						zombie = false;
						gameImage = 0;
						Music.play('@/music/Twilight-World.ogg');
						firstLaunch = false;
					};
				};
			}
			else {
				if (this.typo == Key.Enter || this.typo == Key.Y ) {
					if (zombie) {
						let litmus = from(this.opt)
							.first(it => it !== null)
						hitchHike(this.opt.indexOf(litmus));
						retroLancer = await JSON.fromFile(saveFace);
						if (retroLancer[11] === saveVersion) {
							gameImage = 0;
							Music.play('@/music/Twilight-World.ogg');
							firstLaunch = false;
						}
						else {
							this.text = "Incompatible save file. \nOverwrite file and start new game?";
							this.cleanText = Font.Default.wordWrap(this.text, 225);
							zombie = false;
							this.overWrite = true;
						};
					};
				}
			};
		}
		else {
			if (this.typo == Key.Enter || this.typo == Key.Y ) {
				if (!Sphere.Engine.includes("Oozaru")) {
					hitchHike(0);
				};
				gameImage = 0;
				Music.play('@/music/Twilight-World.ogg');
				firstLaunch = false;
			};
		};
		
		if (this.typo == Key.Escape || (this.typo == Key.N && !this.cycleSaves)) {
			zombie = false;
			tovarishch.crypt = null;
			return false;
		};
		
		if (firstLaunch) {
			return true;
		}
		else {
			gameMode = gameMode === "Default" ? "Standard" : gameMode;
			menuScroll = 0;
			return false;
		};
	},
	
	getInput(scene) {
	
		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('invite', {
	
	start(scene, act, guest, num, listy, abs, deny, elite, horde, satchel) {
	
		this.color = Color.Black;
		this.abstract = abs;
		this.num = num;
		this.act = act;
		this.weary = deny;
		this.clickety = 0;
		this.creditDue = satchel;
		this.feeder = guest;
		this.listy = listy
		this.defer = false;
		this.keepOn = true;
		this.x = Surface.Screen.width / 2 - 25;
		this.y = Surface.Screen.height / 1.5;
		this.bossy = elite;
		this.gang = horde;
		this.typo = null;
		scrollLock = true;
	},

	render(scene) {
	
		Prim.drawSolidRectangle(Surface.Screen, this.x, this.y, 165, this.wrappedText.length * 25, Color.DeepPink)
		for (let j = 0; j < this.wrappedText.length; j++) {
			let adj = 10 + (j * 15);
			let adv = Math.round((165 - Font.Default.widthOf(this.wrappedText[j])) / 2);
			Font.Default.drawText(Surface.Screen, this.x + adv, this.y + adj, this.wrappedText[j], this.color);
		};
		
	},
	
	async update(scene) {
	
		this.trial = this.feeder.persona[0] == this.listy[this.num] ? false : true;
		this.text = this.overRide ? this.text : this.bossy && this.clickety == 0 ? "Are you here for a test?" : this.bossy && this.clickety >= 1 ? "Interested in learning a skill?" : this.weary ? "I'm exhausted, leave me be." : !this.trial && !this.abstract ? "Wise choice. Want to spar?" : !this.trial && this.abstract ? "The goddess blesses your choice." : "Care to join the " + this.listy[this.num].name + " tuan ti?"; 
		this.wrappedText = Font.Default.wordWrap(this.text, 150);
		
		if (!this.weary) {
			if ((this.trial) && (this.typo == Key.Enter || this.typo == Key.Y)) {
				if (!this.bossy) {
					if (this.abstract) {
						universalDynamicLevel = 5;
						this.feeder.morph(this.num, true);
						this.feeder.credit = this.creditDue ? this.feeder.credit + 10000 : this.feeder.credit;
					}
					else {
						if (this.feeder.persona.length < 2) {
							universalDynamicLevel = 5;
							this.feeder.morph(this.num, true);
							this.feeder.credit += 10000;
						}
						else {
							this.text = "We don't want a turncoat like you in the tuan ti."
							this.wrappedText = Font.Default.wordWrap(this.text, 150);
							this.defer = true;
							doubleTeam = true;
							this.act.morph(this.num);
							battleActive = true;
						};
						//let headstrong = this.feeder.reputation;
						this.feeder.reputation = this.feeder.persona.length > 1 ? this.feeder.reputation - (0.75 * this.feeder.persona.length)
							: this.feeder.reputation + 0.75;
					};
					this.keepOn = false;
				}
				else if (this.bossy && this.gang) {
					enduranceTest = true;
					this.keepOn = false;
				}
				else {
					this.act.morph(this.num);
					this.keepOn = false;
					battleActive = true;
				};
			}
			else if (this.trial && this.typo == Key.N) {
				if (this.abstract) {
					this.keepOn = false;
				}
				else {
					this.act.morph(this.num);
					this.keepOn = false;
					if (!this.bossy) {
						doubleTeam = true;
					};
					battleActive = true;
				};
			}
			else if ((!this.trial) && (this.typo == Key.Enter || this.typo == Key.Y || this.typo == Key.D2)) {
				if (!this.abstract) {
					if (!this.bossy) {
						practiceFight = true;
						doubleTeam = this.typo == Key.D2 ? true : false;
						this.act.morph(this.num);
						this.keepOn = false;
						battleActive = true;
					}
					else if (this.bossy && this.clickety == 0) {
						enduranceTest = true;
						this.keepOn = false;
					}
					else if (this.bossy && this.clickety >= 1) { //Learn a new skill
						//this.bossy = false;
						let ruin = 0;
						if (this.feeder.persona[0].moves !== undefined) {
							for (let r = 0; ruin === 0; r++) {
								if (r >= this.feeder.persona[0].moves.length) {
									ruin = 1;
								}
								else if (this.feeder.justWait + ilapse[0] >= Date.now()) { //5mins
									ruin = 2;
								}
								else if (!this.feeder.agent.movePoolBase.includes(this.feeder.persona[0].moves[r])) {
									this.feeder.agent.movePoolBase.push(this.feeder.persona[0].moves[r]);
									ruin = 3;
									this.feeder.justWait = Date.now();
								};
							};
						}
						else {
							this.text = "You've never even fought before!";
							this.wrappedText = Font.Default.wordWrap(this.text, 150);
							this.defer = true;
						};
						if (ruin !== 0) {
							this.text = ruin == 3 ? "You learned: " + this.feeder.agent.movePoolBase[this.feeder.agent.movePoolBase.length - 1].name : ruin === 1 ? "I have nothing to teach you." : "You've barely even started mastering the last one. Be patient.";
							this.wrappedText = Font.Default.wordWrap(this.text, 150);
							this.defer = true;
						};
						this.keepOn = false;
					};
				}
				else {
					this.keepOn = false;
				};
			}
			else if (!this.trial && this.typo == Key.N) {
				this.clickety++;
				this.keepOn = !this.bossy ? false : this.clickety > 1 ? false : true;
			};
		}
		else {
			let tippyTap = [Key.Enter, Key.Y, Key.N, Key.Escape];
			if (tippyTap.includes(this.typo)) {
				this.keepOn = false;
			};
		};
		
		if (this.keepOn) {
			return true;
		}
		else {
			if (this.defer) {
				Prim.drawSolidRectangle(Surface.Screen, this.x, this.y, 165, 45, Color.DeepPink)
				for (let j = 0; j < this.wrappedText.length; j++) {
					let adj = 10 + (j * 15);
					let adv = Math.round((165 - Font.Default.widthOf(this.wrappedText[j])) / 2);
					Font.Default.drawText(Surface.Screen, this.x + adv, this.y + adj, this.wrappedText[j], this.color);
				};
				await Sphere.sleep(35);
			};
			scrollLock = false;
			return false;
		};
	},
	
	getInput(scene) {
	
		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('pezPopping', {
	
	start(scene, shopper, supplier, selection, steppeness, stellar, stocking) {
		
		scrollLock = true;
		memo = !stellar ? "Get out of here, cretin." : steppeness > 1 ? "Did anyone see you enter?" : "What can I get for you?";
		this.keepOn = true;
		this.count = selection.length - 1;
		this.extravaganza = stellar;
		this.stocking = stocking;
		this.steppeness = steppeness;
		this.shopper = shopper;
		this.supplier = supplier;
		this.selection = selection;
		this.typo = null;
		let filterMarked = from(this.selection)
			.descending(it => Font.Default.widthOf(it.name))
			.toArray();
		this.span = Font.Default.widthOf(filterMarked[0].name) + Font.Default.widthOf(" zh^100,000");
		this.weeklyShopper = [ ];
		this.msrp = this.selection[0].techType === 1 ? 974 : this.selection[0].name.includes("Berry") ? 575 : 750;
		this.retailPrice = [ ];
		for (var j = 0; j < this.selection.length; j++) {
			let subtotal = 25 * (this.selection[j].rarity * 10); //this.msrp === 974 ? 25 * this.selection[j].rarity : this.selection[j].potency >= 1 ? 25 * this.selection[j].amount : 25 * (this.selection[j].amount * 10);
			this.weeklyShopper.push(Math.round((this.msrp + subtotal)* steppeness));
			if (this.selection[j].potency != null) {
				this.retailPrice.push("zh^" + this.weeklyShopper[j]);
			}
			else {
				this.retailPrice.push("zh^" + this.weeklyShopper[j] + " (" + statusList[this.selection[j].giveStatus].name + ")");
			};
		};
	},
	
	render(scene) {	
		
		Prim.drawSolidRectangle(Surface.Screen, 0, 0, 250, 29, Color.Chartreuse, Color.DarkGreen);
		Prim.drawRectangle(Surface.Screen, 0, 0, 250, 29, 2, Color.Black);
		Font.Default.drawText(Surface.Screen, 10, 10, memo, Color.MidnightBlue);
		if (this.extravaganza) {
			drawMenu(0, 29, this.span, 30, this.selection, 0, this.retailPrice, Color.PurwarBlue);
			Prim.drawSolidCircle(Surface.Screen, 1, 29 * (menuScroll + 1), 2, Color.Lime);
		};
	},
	
	async update(scene) {
		
		if (!this.extravaganza) {
			await Sphere.sleep(25);
			this.keepOn = false;
		};
		
		if (this.typo == Key.Up) {
			if (menuScroll > 0) {
				menuScroll--;
			};
		};
		if (this.typo == Key.Down) {
			if (menuScroll < this.count) {
				++menuScroll;
			};
		};
		
		if (this.typo == Key.Enter) {
			if (this.shopper.credit >= this.weeklyShopper[menuScroll]) {
				let commission = from(this.supplier)
					.where(it => it == this.selection[menuScroll])
					.toArray();
				if (!this.stocking[0].includes(commission[0])) {
					this.stocking[0].push(commission[0]);
					this.stocking[1].push(1);
				}
				else {
					let receipt = this.stocking[0].indexOf(commission[0]);
					this.stocking[1][receipt] += 1;
				};
				this.shopper.credit -= this.weeklyShopper[menuScroll];
				this.keepOn = false;
			}
			else {
				memo = "You'll need more credit for that."
				this.shopper.reputation -= 0.01;
			};
		};
		
		if (this.typo == Key.Escape) {
			this.keepOn = false;
		};
		
		if (this.keepOn) {
			return true
		}
		else {
			scrollLock = false;
			menuScroll = 0;
			return false
		};
	},
	
	getInput(scene) {

		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('remedy', {

	start(scene) {
		
		this.keepOn = true;
		this.typo = null;
		this.text = Font.Default.wordWrap("I can heal you once or twice now, but then I'll need to rest for a while. \nDo you want me to heal you?", 150);
		this.x = Surface.Screen.width / 2 - 25;
		this.y = Surface.Screen.height / 1.5;
	},
	
	render(scene) {
		
		Prim.drawSolidRectangle(Surface.Screen, this.x, this.y, 165, this.text.length * 25, Color.DeepPink)
		for (let j = 0; j < this.text.length; j++) {
			let adj = 10 + (j * 15);
			let adv = Math.round((165 - Font.Default.widthOf(this.text[j])) / 2);
			Font.Default.drawText(Surface.Screen, this.x + adv, this.y + adj, this.text[j], Color.Black);
		};
	},
	
	async update(scene) {
		
		if (Oracle.fatigue) {
			this.text = Font.Default.wordWrap("I'm too worn out, deal with it yourself.", 150);
		};
		
		if (this.typo == Key.Enter || this.typo == Key.Y) {		
			for (let j = 0; j < partyList.length; j++) {
				partyList[j].rejuvenate();
			};
			universeGalaxy[1].enough++;
			this.keepOn = false;
		};
		
		if (this.typo == Key.Escape || this.typo == Key.N) {
			this.keepOn = false;
		};
		
		if (this.keepOn) {
			return true;
		}
		else {
			return false;
		};
	},
	
	getInput(scene) {
		
		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('rename', {
	
	start(scene, num) {
	
		this.text = [ ];
		this.typo = null;
		this.num = num;
		this.gateKeep = false;
		this.keepOn = true;
		this.cursive = "";
		this.gabby;
		this.total = 0;
		this.capsLock = true;
		scrollLock = true;
		memo = "Enter a name";
	},
		
	render(scene) {
	
		Prim.drawSolidRectangle(Surface.Screen, 305, 287, 400, 87, Color.RebeccaPurple, Color.Gray, Color.Orange)
		Font.Default.drawText(Surface.Screen, 305 + 200 - (Font.Default.widthOf(memo) / 2), Surface.Screen.height / 2 + 10, memo, Color.Black);
		let oval = Surface.Screen.height / 2 + 40;
		let rhombus = 305 + 200 - (Font.Default.widthOf(this.cursive / 2));
		Font.Default.drawText(Surface.Screen, rhombus, oval, this.cursive, Color.Black);
	},
	
	async update(scene) {
		
		this.capsLock = this.cursive.length > 0 ? false : true;
		
		if (this.typo != null && Keyboard.Default.isPressed(this.typo)) {
			if (Keyboard.Default.charOf(this.typo) !== "" && this.cursive.length < 8) {
				this.gabby = Keyboard.Default.charOf(this.typo, this.capsLock);
				this.cursive += this.gabby;
				this.total++;
			}
		};
		
		
		if (this.typo == Key.Backspace) {
			Keyboard.Default.clearQueue();
			let mishap = "";
			for (let j = 0; j < this.cursive.length - 1; j++) {
				mishap += this.cursive[j];
			};
			this.cursive = mishap;
			this.total--;
		};
			
		if (this.typo == Key.Delete) {
			this.text = [ ];
			this.cursive = "";
			this.total = 0;
			this.cursive = "";
		};
		
		if (this.cursive.length >= 5 && this.cursive.length <= 8) {
			this.gateKeep = true;
		};
		
		if (this.typo == Key.Enter) {
			if (this.gateKeep) {
				NPC.createNew(this.cursive);
				let doubleDip = from(charList)
					.where(it => it.name == this.cursive)
					.toArray();
				if (this.num === 0) {
					mainChar = doubleDip[0];
				};
				doubleDip[0].joinParty("x");
				let buyTheDips = charList.indexOf(doubleDip[0]);
				charList.splice(buyTheDips, 1);
				this.keepOn = false;
			}
			else {
				memo = "Maybe look at other names for inspiration.";
			};
		};
		
		if (this.keepOn == true) {
			return true;
		}
		else {
			scrollLock = false;
			return false;
		};
	},
	
	getInput(scene) {

		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('showAttack', {
	
	start(scene) {
	
		this.tint = sourceFeed === 2 ? Color.DarkViolet : Color.Black;
		//this.finePrint = finePrint;
		this.resultative = Font.Default.wordWrap(attackName, 385);
		scrollLock = true;
	},
		
	render(scene) {
	
		for (let j = 0; j < this.resultative.length; j++) {
			let oval = Surface.Screen.height / 2 + 40 + (j * 17);
			let rhombus = 305 + 200 - (Font.Default.widthOf(this.resultative[j]) / 2);
			Font.Default.drawText(Surface.Screen, rhombus, oval, this.resultative[j], this.tint);
		};
	},
	
	async update(scene) {
		
		await Sphere.sleep(30);
		scrollLock = false;
		//retalTrigger = false;
		return false;
	},
});


Scene.defineOp('tempMenu', {
	
	start(scene, menuID, vic, what, clock) {
	
		tempMenuOutput = null;
		menuScroll = 0;
		scrollLock = true;
		this.keepOn = true;
		this.keyPad = [ "t", "w", "m", "r", "b", "u", "c", "a", "s", ];
		this.meinu = menuID;
		this.swagger = 0;
		this.reThink = false;
		this.useful = what;
		this.vic = vic;
		this.timing = clock;
		this.timeBot = Sphere.now();
		this.typo = null;
	},
	
	render(scene) {
	
		drawMenuSorter(this.vic, true);
	},
	
	update(scene) {
	
		if (this.typo != null && this.keyPad.includes(Keyboard.Default.charOf(this.typo))) {
				menuScroll = 0;
				menuNo = this.keyPad.indexOf(Keyboard.Default.charOf(this.typo))
				if (this.meinu.includes(menuList[menuNo])) {
					this.swagger = this.meinu.indexOf(menuList[menuNo]);
				};
		};
		
		menu = this.meinu[this.swagger];
		this.count = this.useful[this.swagger].length - 1;
		
		if (this.typo == Key.Up) {
			if (menuScroll > 0) {
				menuScroll--;
			};
		};
		if (this.typo == Key.Down) {
			if (menuScroll < this.count) {
				++menuScroll;
			};
		};
		if (this.typo == Key.Left && this.swagger > 0) { //this.meinu.length > 1) {
			this.swagger--;// = this.swagger == 0 ? this.meinu.length - 1 : this.swagger - 1;
			menuScroll = 0;
		};
		if (this.typo == Key.Right && this.meinu.length > 1 && this.swagger < this.meinu.length - 1) {
			this.swagger++;// = this.swagger == this.meinu.length - 1 ? 0 : this.swagger + 1;
			menuScroll = 0;
		};
		if (this.typo == Key.Z && menu == "Weapons") {
			tempMenuOutput = "Z";
			this.keepOn = false;
		};
		if (this.typo == Key.D0 && menu == "Weapons") {
			if (this.vic.weaponCurrent.name !== "Fists") {
				tempMenuOutput = -1;
				this.keepOn = false;
			};
		};
		if (this.typo == Key.Enter || (gameMode !== "Classic" && Sphere.now() > this.timeBot + this.timing)) {
			if (menu == "Alterations") {
				tempMenuOutput = this.vic.alteredState.length == 0 ? null : Sphere.now() > this.timeBot + this.timing ? this.vic.alteredState.length - 1 : menuScroll;
			}
			else {
				tempMenuOutput = Sphere.now() > this.timeBot + this.timing ? null : menu !== "Weapons" && this.useful[this.swagger].length > 0 ? menuScroll : this.vic.weapon.length > 0 ? this.vic.weapon[menuScroll] : -1;
			};
			this.keepOn = false;
		};
		if (this.typo == Key.Escape) {
			tempMenuOutput = null;
			this.reThink = true;
			this.keepOn = false;
		};
		
		if (this.keepOn === true) {
			return true;
		}
		else {
			//tempMenuOutput = tempMenuOutput == null && this.reThink !== true && menu == "Alterations" ;
			//if (menu == "Alterations") {
				//moveSeq = 0;
			//};
			menu = "";
			menuScroll = 0;
			menuNo = -1;
			scrollLock = false;
			return false;
		};
	},
	
	getInput(scene) {
	
		this.typo = Keyboard.Default.getKey();
	},
});


Scene.defineOp('weaponForge', {
	
	start(scene, act, rate, principle, listy, vend) {
		
		tempMenuOutput = null;
		scrollLock = true;
		menuScroll = 0;
		memo = "Available credit: " + Math.trunc(act.credit);
		this.vend = vend;
		this.smelt = false;
		this.act = act;
		this.rate = rate;
		this.num = principle;
		this.list = listy;
		this.count = listy.length - 1;
		this.typo = null;
		this.priceList = [ ];
		this.catalogue = [ ];
		for (var i = 0; i < this.list.length; i++) {
			this.priceList.push(Math.round(rate * this.list[i].grade * this.num));
			this.catalogue.push("zh^" + this.priceList[i]);
		};
	},
	
	render(scene) {
	
		Prim.drawSolidRectangle(Surface.Screen, 0, 0, 250, 29, Color.Chartreuse, Color.DarkGreen);
		Prim.drawRectangle(Surface.Screen, 0, 0, 250, 29, 2, Color.Black);
		Font.Default.drawText(Surface.Screen, 10, 10, memo, Color.MidnightBlue);
		if (this.vend) {
			drawMenu(0, 29, Font.Default.widthOf(" Shuriken") + Font.Default.widthOf(" zh^100,000"), 30, this.list, 0, this.catalogue, Color.PurwarBlue);
			drawMenu(0, 29 * (this.catalogue.length + 1), 50, 30, [ ], 5, "Forge (F)", Color.OrangeRed); 
			Prim.drawSolidCircle(Surface.Screen, 1, 29 * (menuScroll + 1), 2, Color.Lime);
		};
	},
	
	async update(scene) {
	
		if (!this.vend) {
			memo = "We don't sell to sketchy characters";
			await Sphere.sleep(25);
			scrollLock = false;
		};
		
		if (this.typo == Key.F) {
			scrollLock = false;
			this.smelt = true;
			menuScroll = 0;
		};
		
		if (this.typo == Key.Up) {
			if (menuScroll > 0) {
				menuScroll--;
			};
		};
		if (this.typo == Key.Down) {
			if (menuScroll < this.count) {
				++menuScroll;
			};
		};
		var keyCode = [ Key.Enter, Key.D1, Key.D2, Key.D3 ];
		if (keyCode.includes(this.typo)) {
			if (this.act.credit > this.priceList[menuScroll]) {
				tempMenuOutput = menuScroll;
				scrollLock = false;
				menu = "";
				menuScroll = 0;
				this.act.credit -= this.priceList[tempMenuOutput];
				if (this.list == allArmorList) {
					if (this.typo == Key.Enter) {
						this.act.agent.gear = allArmorList[tempMenuOutput];
					};
				}
				else {
					if (this.typo == Key.Enter) {
						this.slot = this.act.agent.weapon.length < 2 ? this.act.agent.weapon.length : this.act.agent.weapon.length == 3 ? 2 : this.act.agent.weapon.length == 2 && this.act.agent.weaponCurrent != null && this.act.agent.weaponCurrent.name !== "Fists" ? 1 : 2;
					}
					else { 
						this.slot = this.typo == Key.D1 ? 0 : this.act.agent.weapon.length == 3 ? 2 : this.typo == Key.D2 ? 1 : this.act.agent.weapon.length;
					};
					this.act.agent.seizeWeapon(this.slot, this.list[tempMenuOutput]);
				};
			}
			else {
				memo = "Trying to rip off a dealer, really?";
				this.act.reputation -= .02;
			}
		};
		
		if (this.list != allArmorList && this.typo == Key.Space) {
			tempMenuOutput = menuScroll;
			let stealIt = Math.random() < .0175 ? true : false;
			if (stealIt) {
				this.slot = this.act.agent.weapon.length < 2 ? this.act.agent.weapon.length : this.act.agent.weapon.length == 3 ? 2 : this.act.agent.weapon.length == 2 && this.act.agent.weaponCurrent != null && this.act.agent.weaponCurrent.name !== "Fists" ? 1 : 2;
				this.act.agent.seizeWeapon(this.slot, this.list[tempMenuOutput]);
				this.act.reputation -= .01;
				scrollLock = false;
				menu = "";
				menuScroll = 0;
			}
			else {
				memo = "ComradeDeath doesn't like your odds for a long life.";
				this.act.reputation -= 0.5;
				let squander = from(bluePrints[styleMap][currentMap].contents)
					.where(it => it.tileLock == mainChar.isFacing)
					.toArray();
				let waste = bluePrints[styleMap][currentMap].contents.indexOf(squander[0]);
				bluePrints[styleMap][currentMap].contents.splice(waste, 1);
				bluePrints[styleMap][currentMap].fieldLayout[mainChar.isFacing].isOccupied = false;
				aggro = true;
				makeShift[1][1].length = 0;
				charList[0].morph("x");
				charList[0].agent.assignRole(false);
				charList[0].agent.seizeWeapon(0, this.list[tempMenuOutput]);
				battlerList.push(charList[0].agent);
				bodyList.push(charList[0].agent);
				charList.splice(0, 1);
				battleActive = true;
				Music.override('@/music/Tower-of-Death.ogg');
				scrollLock = false;
				battleActive = true;
			};
		};
		
		if (this.typo == Key.Escape) {
			scrollLock = false;
		};
		
		if (scrollLock == true) {
			return true;
		}
		else {
			if (this.smelt) {
				scrollLock = true;
			};
			menuScroll = 0;
			return false;
		};
	},
	
	getInput(scene) {
	
		this.typo = Keyboard.Default.getKey();
	},
});