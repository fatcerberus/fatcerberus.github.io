//The actual techniques


 export class assaultSkill
 {
	constructor(kill) {
		this.name = kill.name;
		this.power = kill.power; //1-100 scale for now
		this.techType = kill.techType; //Item or attack
		this.accuracy = kill.accuracy;
		this.ohkoodds = kill.ohkoodds; //Give a OHKO chance
		this.comboOutput = kill.comboOutput; //1 = strategy, 2 = punishment, 3 = universal
		this.comboKey = kill.comboKey; //if the last move's output equals this number, it adds combo damage
		this.selfAim = kill.selfAim; //Move auto-aims at user if true
		this.targetRegion = kill.targetRegion; //where the move lands on the opponent
		this.rank = kill.rank; //1-5 scale, in half-point increments
		this.giveStatus = kill.giveStatus; //indicates if the move inflicts a status and which one
	};
};

//Declaring some moves -- Status moves tied to personas, not weapons

export let doNothing = new assaultSkill({
	name: "Do Nothing",
	power: 0,
	techType: 7,
	comboOutput: null,
	comboKey: null,
	rank: 0.5,
	giveStatus: false,
})

export let weapSwap = new assaultSkill({ //dummy for swapping weapons
	name: "Weapon Swap",
	power: 0,
	techType: 6,
	accuracy: 1,
	ohkoodds: 0,
	comboOutput: null,
	comboKey: null,
	rank: 1,
	giveStatus: false,
});

export let runAway = new assaultSkill({ //for negotiating out of battles
	name: "Negotiate Out",
	power: 0,
	techType: 8,
	accuracy: 1,
	ohkoodds: 0,
	comboOutput: null,
	comboKey: null,
	rank: 1,
	giveStatus: false,
});

let Afflict = new assaultSkill({ //inflicts Worried status
	name: "Afflict",
	power: 5,
	techType: 0,
	accuracy: .80,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 1,
	rank: 2,
	giveStatus: 48,
});

let Bash = new assaultSkill({ //
	name: "Bash",
	power: 31,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false,
});

var Batter = new assaultSkill({ //
	name: "Batter",
	power: 50,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 2,
	rank: 3,
	giveStatus: false,
});

var Carnival = new assaultSkill({ //iflicts Demon status
	name: "Carnival",
	power: 18,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 11,
});

var Chip = new assaultSkill({ //next move is a combo
	name: "Chip Away",
	power: 15,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 2.5,
	giveStatus: false,
});

const chrysocollaShrine = new assaultSkill({ //Level 3 weapon move
	name: "Chrysocolla Shrine",
	power: 41,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0075,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 1,
	rank: 3,
	giveStatus: false,
});

var Corrode = new assaultSkill({ //inflicts Snakebit
	name: "Corrode",
	power: 7,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: 1,
	targetRegion: 1,
	rank: 2,
	giveStatus: 39,
});

const crimsonLight = new assaultSkill({ //Level 2 weapon move
	name: "Crimson Light",
	power: 23,
	techType: 0,
	accuracy: 1,
	ohkoodds: .005,
	comboOutput: 3,
	comboKey: 2,
	targetRegion: 3,
	rank: 2,
	giveStatus: false,
});

var Decapitate = new assaultSkill({ //attempt to behead
	name: "Decapitate",
	power: 85,
	techType: 0,
	accuracy: .42,
	ohkoodds: .075,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 0,
	rank: 4.5,
	giveStatus: false,
});

var Decimate = new assaultSkill({ //powerful slash
	name: "Decimate",
	power: 65,
	techType: 0,
	accuracy: .85,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 2,
	rank: 4,
	giveStatus: false,
});

var Defend = new assaultSkill({ //Turtle!
	name: "Defend",
	power: 0,
	techType: 0,
	accuracy: 1,
	ohkoodds: 0,
	comboOutput: null,
	comboKey: null,
	targetRegion: 4,
	rank: .5,
	giveStatus: false,
});

var Depletion = new assaultSkill({ //inflict Leech status
	name: "Depletion",
	power: 7,
	techType: 0,
	accuracy: .80,
	ohkoodds: 0,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 3,
	rank: 2,
	giveStatus: 26,
});

var doubleShot = new assaultSkill({ //double the fun!
	name: "Double Shot",
	power: 70,
	techType: 0,
	accuracy: .90,
	ohkoodds: 0,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 1,
	rank: 4,
	giveStatus: false,
});

var Efficacy = new assaultSkill({ //imparts Immune status
	name: "Efficacy",
	power: 7,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 3,
	giveStatus: 22,
});

var Enfeeble = new assaultSkill({ //inflicts Insidious status
	name: "Enfeeble",
	power: 3,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: 1,
	targetRegion: 3,
	rank: 2,
	giveStatus: 23,
});

var Engulf = new assaultSkill({ //inflicts Ablaze status
	name: "Engulf",
	power: 13,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false, //0,
});

var Fascinate = new assaultSkill({ //inflicts Enslaved status
	name: "Fascinate",
	power: 7,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: 2,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 13,
});

var Finisher = new assaultSkill({ //increases OHKO odds as foe's HP drops
	name: "Finisher",
	power: 95,
	techType: 0,
	accuracy: .95,
	ohkoodds: .15,
	comboOutput: null,
	comboKey: 2,
	targetRegion: 2,
	rank: 3.5,
	giveStatus: false,
});

var Fireball = new assaultSkill({ //increases OHKO odds as foe's HP drops
	name: "Fireball",
	power: 80,
	techType: 0,
	accuracy: .95,
	ohkoodds: .1,
	comboOutput: null,
	comboKey: null,
	targetRegion: 2,
	rank: 4.5,
	giveStatus: false,
});

var Fling = new assaultSkill({ //Throw some stars
	name: "Fling",
	power: 13.5,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 3,
	rank: 2,
	giveStatus: false,
});

var HariKari = new assaultSkill({ //self-damage - can only target user
	name: "Hari Kari",
	power: 87,
	techType: 0,
	accuracy: 1,
	ohkoodds: .25,
	comboOutput: 3,
	comboKey: null,
	selfAim: true,
	targetRegion: 2,
	rank: 5,
	giveStatus: false,
});

var Illusion = new assaultSkill({ //inflicts Distorted status
	name: "Illusion",
	power: 11,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 12,
});

var Inspire = new assaultSkill({ //imparts Fearless status
	name: "Inspire",
	power: 1,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2,
	giveStatus: 16,
});

var Jam = new assaultSkill({ //inflicts Vanilla status
	name: "Jam",
	power: 8,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 1,
	rank: 2,
	giveStatus: 45,
});

var Kick = new assaultSkill({ //
	name: "Kick",
	power: 5,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: 1,
	targetRegion: 3,
	rank: 1,
	giveStatus: false,
});

var knockOut = new assaultSkill({ //inflicts Comatose status
	name: "Knock Out",
	power: 2,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: 2,
	targetRegion: 0,
	rank: 2,
	giveStatus: 7,
});

var Maraud = new assaultSkill({ //
	name: "Maraud",
	power: 40,
	techType: 0,
	accuracy: 1,
	ohkoodds: 0,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false,
});

const masterDevotion = new assaultSkill({ //Level 4 weapon move
	name: "Masterful Devotion",
	power: 59,
	techType: 0,
	accuracy: 1,
	ohkoodds: .01,
	comboOutput: 3,
	comboKey: 2,
	targetRegion: 1,
	rank: 3.5,
	giveStatus: false,
});

var Mislead = new assaultSkill({ //imparts Chaos status
	name: "Mislead",
	power: 2,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 3,
	rank: 2,
	giveStatus: 6,
});

const mythicalRevelation = new assaultSkill({ //Level 5 weapon move
	name: "Mythical Revelation",
	power: 73,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0125,
	comboOutput: 2,
	comboKey: 3,
	targetRegion: 0,
	rank: 4,
	giveStatus: false,
});

var Nascent = new assaultSkill({ //imparts Float status
	name: "Nascent",
	power: 6,
	techType: 0,
	accuracy: .75,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 2.5,
	giveStatus: 17,
});

var Obfuscate = new assaultSkill({ //inflicts Baffled status
	name: "Obfuscate",
	power: 11,
	techType: 0,
	accuracy: .9,
	ohkoodds: 0,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 2,
});

var Oxidize = new assaultSkill({ //inflicts Rust status
	name: "Oxidize",
	power: 3,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 1,
	rank: 2,
	giveStatus: 37,
});

var Parry = new assaultSkill({ //Endows Wary status
	name: "Parry",
	power: 12,
	techType: 0,
	accuracy: .93,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 1,
	rank: 2.5,
	giveStatus: 47,
});

var Pierce = new assaultSkill({ //Bow
	name: "Pierce",
	power: 35,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false,
});

var Ploy = new assaultSkill({ //inflicts Kickback status
	name: "Ploy",
	power: 7,
	techType: 0,
	accuracy: .8,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 2,
	giveStatus: 25,
});

var Plunder = new assaultSkill({ //
	name: "Plunder",
	power: 20,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 2,
	rank: 1.5,
	giveStatus: false,
});

var Plunge = new assaultSkill({ //heavy damage
	name: "Plunge",
	power: 45,
	techType: 0,
	accuracy: .8,
	ohkoodds: .0025,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false,
});

var Pummel = new assaultSkill({ //
	name: "Pummel",
	power: 10,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 0,
	rank: 1.5,
	giveStatus: false,
});

var Punch = new assaultSkill({ //basic punch
	name: "Punch",
	power: 3,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: 2,
	targetRegion: 1,
	rank: 1,
	giveStatus: false,
});

var Puncture = new assaultSkill({ //Dagger
	name: "Puncture",
	power: 40,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: false,
});

var Punish = new assaultSkill({ //
	name: "Punish",
	power: 10,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 2,
	rank: 1,
	giveStatus: false,
});

var Regroup = new assaultSkill({ //imparts Patience status
	name: "Regroup",
	power: 6,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2,
	giveStatus: 33,
});

var Reinforce = new assaultSkill({ //imparts Resilient status
	name: "Reinforce",
	power: 2,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 2,
	rank: 2,
	giveStatus: 35,
});

var Rouse = new assaultSkill({ //imparts Zen status
	name: "Rouse",
	power: 6,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 49,
});

var Scout = new assaultSkill({ //inflicts Tagged status
	name: "Scout",
	power: 15,
	techType: 0,
	accuracy: .95,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 3,
	rank: 2.5,
	giveStatus: 41,
});

var skeletalGrace = new assaultSkill({ //Level 1 weapon attack
	name: "Skeletal Grace",
	power: 9,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0025,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 1,
	rank: 1.5,
	giveStatus: false,
});

var Slay = new assaultSkill({ //
	name: "Slay",
	power: 25,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0025,
	comboOutput: 2,
	comboKey: null,
	targetRegion: 2,
	rank: 2,
	giveStatus: false,
});

var Slice = new assaultSkill({ //basic sword attack
	name: "Slice",
	power: 25,
	techType: 0,
	accuracy: .90,
	ohkoodds: .0015,
	comboOutput: 2,
	comboKey: 1,
	targetRegion: 3,
	rank: 1.5,
	giveStatus: false,
});

var Stab = new assaultSkill({ //default sword attack
	name: "Stab",
	power: 10,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0015,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 2,
	rank: 1,
	giveStatus: false,
});

var Strangle = new assaultSkill({ //inflicts Asphyxiation status
	name: "Strangle",
	power: 3,
	techType: 0,
	accuracy: .99,
	ohkoodds: .005,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2,
	giveStatus: 1,
});

var Supernatural = new assaultSkill({ //magical move
	name: "Supernatural",
	power: 55,
	techType: 0,
	accuracy: 1,
	ohkoodds: .005,
	comboOutput: 2,
	comboKey: 2,
	targetRegion: 2,
	rank: 3,
	giveStatus: false,
});

const transcendentalScourge = new assaultSkill({ //Level 6 weapon move
	name: "Transcendental Scourge",
	power: 96,
	techType: 0,
	accuracy: 1,
	ohkoodds: .05,
	comboOutput: 3,
	comboKey: 3,
	targetRegion: 0,
	rank: 5,
	giveStatus: false,
});

var Trickle = new assaultSkill({ //inflicts Bottleneck status
	name: "Trickle",
	power: 3,
	techType: 0,
	accuracy: .99,
	ohkoodds: .005,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 1,
	rank: 2,
	giveStatus: 5,
});

var Unburden = new assaultSkill({ //imparts Excel status
	name: "Unburden",
	power: 12,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0002,
	comboOutput: 1,
	comboKey: 1,
	targetRegion: 3,
	rank: 2.5,
	giveStatus: 14,
});

var Undercut = new assaultSkill({ //
	name: "Undercut",
	power: 20,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0002,
	comboOutput: null,
	comboKey: 1,
	targetRegion: 3,
	rank: 2,
	giveStatus: false,
});

var Unlimit = new assaultSkill({ //imparts Prescience status
	name: "Unlimit",
	power: 15,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 0,
	rank: 2.5,
	giveStatus: 34,
});

var Vale = new assaultSkill({ //inflicts Bedeviled status
	name: "Vale",
	power: 11,
	techType: 0,
	accuracy: .85,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 2,
	rank: 2.5,
	giveStatus: 3,
});

var Veneer = new assaultSkill({ //inflicts Unaware status
	name: "Veneer",
	power: 6,
	techType: 0,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2,
	giveStatus: 43,
});

var Whisper = new assaultSkill({ //inflicts Paranoid status
	name: "Whisper",
	power: 2,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 1,
	comboKey: null,
	targetRegion: 0,
	rank: 2,
	giveStatus: 32,
});

var Zenith = new assaultSkill({ //imparts Gambit status
	name: "Zenith",
	power: 5,
	techType: 0,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: 3,
	comboKey: null,
	targetRegion: 3,
	rank: 2.5,
	giveStatus: 18,
});


//Crafting them into movepools

export const allMoves = [
	Afflict, //0
	Bash, //1
	Batter, //2
	Carnival, //3
	Chip, //4
	Corrode, //5
	Decapitate, //6
	Decimate, //7
	Defend, //8
	Depletion, //9
	doubleShot, //10
	Enfeeble, //11
	Engulf, //12
	Finisher, //13
	Fireball, //14
	HariKari, //15
	Illusion, //16
	Inspire, //17
	Jam, //18
	Kick, //19
	Maraud, //20
	Mislead, //21
	Nascent, //22
	Obfuscate, //23
	Oxidize, // 24
	Pierce, //25
	Ploy, //26
	Plunder, //27
	Plunge, //28
	Pummel, //29
	Punch, //30
	Punish, //31
	Reinforce, //32
	Regroup, //33
	Scout, //34
	Slay, //35
	Slice, //36
	Stab, //37
	Strangle, //38
	Supernatural, //39
	Trickle, //40
	Unburden, //41
	Undercut, //42
	Unlimit, //43
	Vale, //44
	Veneer, //45
	Whisper, //46
	Zenith, //47
];

const asceticMoves = [
Efficacy,
Parry,
];

let axeMoves = Array.of(
Slay,
);

let bladeMoves = Array.of(
Slice,
);

let bowMoves = Array.of(
doubleShot,
);

const cowardMoves = [
Ploy,
Strangle,
];

let daggerMoves = Array.of(
Chip,
Puncture,
);

const divinerMoves = [
Depletion,
Mislead,
];

const deceiverMoves = [
Jam,
Vale,
];

const empathistMoves = [
Regroup,
Unburden,
];

const fistMoves = [
Kick,
Punch,
Pummel,
];

export const generalMoves = [
//Turtle
];

const hunterMoves = [
Finisher,
Scout,
];

const jesterMoves = [
Carnival,
Nascent,
];

var maceMoves = Array.of(
Bash,
Batter,
Maraud,
);

const masochistMoves = [
HariKari,
Rouse,
];

const nihilistMoves = [
Veneer,
Whisper,
];

const nostalgicMoves = [
Inspire,
Veneer,
];

const occultistMoves = [
Engulf,
Fireball,
Supernatural,
];

const renegadeMoves = [
Illusion,
Obfuscate,
Undercut,
];

const sadistMoves = [
Afflict,
Corrode,
Reinforce,
];

const schemerMoves = [
Unlimit,
Zenith,
];

let scytheMoves = Array.of(
Decapitate,
Decimate,
);

let shieldMoves = Array.of(
Defend,
);

let shurikenMoves = Array.of(
Fling,
);

let spearMoves = Array.of(
Plunge,
);

let tridentMoves = Array.of(
Plunder,
);

const usurperMoves = [
Fascinate,
Trickle,
Enfeeble,
];

const vengeancerMoves = [
knockOut,
Oxidize,
Punish,
];

const absolvedMoves = [
Plunder,
];

export let classMoves = [
	asceticMoves, //0
	cowardMoves, //1
	deceiverMoves, //2
	divinerMoves, //3
	empathistMoves, //4
	hunterMoves, //5
	jesterMoves, //6
	masochistMoves, //7
	nihilistMoves, //8
	nostalgicMoves, //9
	occultistMoves, //10
	renegadeMoves, //11
	sadistMoves, //12
	schemerMoves, //13
	usurperMoves, //14
	vengeancerMoves, //15
	absolvedMoves, //16
];

export let gradientMoves = [
	skeletalGrace, //0
	crimsonLight, //1
	chrysocollaShrine, //2
	masterDevotion, //3
	mythicalRevelation, //4
	transcendentalScourge, //5
];

export let weaponMoves = [
	axeMoves, //0
	bladeMoves, //1
	bowMoves, //2
	daggerMoves, //3
	fistMoves, //4
	maceMoves, //5
	scytheMoves, //6
	shieldMoves, //7
	shurikenMoves, //8
	spearMoves, //9
	tridentMoves, //10
];

export let extraTechs = [ weapSwap, doNothing, runAway ];

var Insinuate = new assaultSkill({ //inflicts Paranoid
	name: "Insinuate",
	power: 53,
	techType: 1,
	accuracy: 1,
	ohkoodds: .0001,
	comboOutput: null,
	comboKey: null,
	targetRegion: 0,
	rank: 3,
	giveStatus: 32,
});

var Obliterate = new assaultSkill({ //offensive firepower
	name: "Obliterate",
	power: 71,
	techType: 0,
	accuracy: .97,
	ohkoodds: .0001,
	comboOutput: null,
	comboKey: null,
	targetRegion: 2,
	rank: 3.5,
	giveStatus: false,
});

var Dominate = new assaultSkill({ //inflicts Enslaved
	name: "Dominate",
	power: 32,
	techType: 1,
	accuracy: .99,
	ohkoodds: .0001,
	comboOutput: null,
	comboKey: null,
	targetRegion: 1,
	rank: 2.5,
	giveStatus: 13,
});

export let demonMoves = [
Array.of(Dominate, Insinuate), //Status moves
Array.of(Obliterate) //Attack moves
];

export let superPool = [ allMoves, gradientMoves, demonMoves ];