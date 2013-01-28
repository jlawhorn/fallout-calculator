(function ($) {
	var character,
	defaults = {
		species : 'human',
		level : 1,
		currentTagCount : 0,
		maxTags : 3,
		totalStats : 40,
		stMin : 0,
		stMax : 0,
		peMin : 0,
		peMax : 0,
		enMin : 0,
		enMax : 0,
		chMin : 0,
		chMax : 0,
		inMin : 0,
		inMax : 0,
		agMin : 0,
		agMax : 0,
		lkMin : 0,
		lkMax : 0,
		statSt : 0,
		statPe : 0,
		statEn : 0,
		statCh : 0,
		statIn : 0,
		statAg : 0,
		statLk : 0,
		statPool : 0,
		smallGuns : 0,
		bigGuns : 0,
		energyWeapons : 0,
		unarmed : 0,
		meleeWeapons : 0,
		throwing : 0,
		firstAid : 0,
		doctor : 0,
		sneak : 0,
		lockpick : 0,
		steal : 0,
		traps : 0,
		science : 0,
		repair : 0,
		pilot : 0,
		speech : 0,
		barter : 0,
		gambling : 0,
		outdoorsman : 0,
		taggedSkills: [],
		skillPool : 0,
		actionPoints : 0,
		carryWeight : 0,
		baseMeleeDamage : 0,
		poisonResist : 0,
		radiationResist : 0,
		gasResist : 0,
		electricResist : 0,
		sequence : 0,
		healingRate : 0,
		criticalChance : 0,
		baseAc : 0,
		maxHp : 0,
		baseDr : 0,
		racialElectricResistance : 0,
		racialRadiationResistance : 0,
		racialPosionResistance : 0,
		racialGasResistance : 0,
		racialHpMod : 0,
		racialPerkRate : 0,
		racialDamageResistance : 0
	};
	var options = {};
	var $stats = $('.stat');

	character = $.extend({}, defaults, options);

	initializeValues();

	$stats.on('change', function(e){
		changeStats(this);
	});

	$('#chacaterSpecies').on('change', function(e){
		var newSpecies = $(this).val();
		updateSpecies(newSpecies);
		calculateAndUpdateDom();
	});

	$('#calculator').on('submit', function(e){
		e.preventDefault();
	});

	$('.tag').on('click', function(e){
		if(processTags(this) == false){
			e.preventDefault();
		};
		calculateSkills();
	});

	function initializeValues() {
		updateSpecies(character.species);
		calculateAndUpdateDom();
	}

	function calculateAndUpdateDom(){
		setStatPointsFromVars();
		calculateSkills();
		calculateDerives();
		console.log(character);
	}

	function updateSpecies(newSpecies) {
		character.species = newSpecies;
		switch(newSpecies) {
			case "human":
				character.stMin = 1;
				character.stMax = 10;
				character.peMin = 1;
				character.peMax = 10;
				character.enMin = 1;
				character.enMax = 10;
				character.chMin = 1;
				character.chMax = 10;
				character.inMin = 1;
				character.inMax = 10;
				character.agMin = 1;
				character.agMax = 10;
				character.lkMin = 1;
				character.lkMax = 10;
				character.statSt = 5;
				character.statPe = 5;
				character.statEn = 5;
				character.statCh = 5;
				character.statIn = 5;
				character.statAg = 5;
				character.statLk = 5;
				character.statPool = 5;
				character.racialElectricResistance = 10;
				character.racialRadiationResistance = 0;
				character.racialPosionResistance = 0;
				character.racialGasResistance = 0;
				character.racialHpMod = 0;
				character.racialPerkRate = 3;
				character.racialDamageResistance = 0;
				console.log("set human");
			break;
			case "ghoul":
				character.stMin = 1;
				character.stMax = 8;
				character.peMin = 4;
				character.peMax = 13;
				character.enMin = 1;
				character.enMax = 10;
				character.chMin = 1;
				character.chMax = 10;
				character.inMin = 2;
				character.inMax = 10;
				character.agMin = 1;
				character.agMax = 6;
				character.lkMin = 5;
				character.lkMax = 12;
				character.statSt = 5;
				character.statPe = 5;
				character.statEn = 5;
				character.statCh = 5;
				character.statIn = 5;
				character.statAg = 5;
				character.statLk = 5;
				character.statPool = 5;
				character.racialElectricResistance = 0;
				character.racialRadiationResistance = 80;
				character.racialPosionResistance = 30;
				character.racialGasResistance = 0;
				character.racialHpMod = 0;
				character.racialPerkRate = 4;
				character.racialDamageResistance = 0;
				console.log("set ghoul");
			break;
			case "mutant":
				character.stMin = 5;
				character.stMax = 13;
				character.peMin = 1;
				character.peMax = 11;
				character.enMin = 4;
				character.enMax = 11;
				character.chMin = 1;
				character.chMax = 7;
				character.inMin = 1;
				character.inMax = 11;
				character.agMin = 1;
				character.agMax = 8;
				character.lkMin = 1;
				character.lkMax = 10;
				character.statSt = 5;
				character.statPe = 5;
				character.statEn = 5;
				character.statCh = 5;
				character.statIn = 5;
				character.statAg = 5;
				character.statLk = 5;
				character.statPool = 5;
				character.racialElectricResistance = 0;
				character.racialRadiationResistance = 50;
				character.racialPosionResistance = 20;
				character.racialGasResistance = 0;
				character.racialHpMod = 2;
				character.racialPerkRate = 4;
				character.racialDamageResistance = 25;
			break;
			case "dog":
				character.stMin = 1;
				character.stMax = 7;
				character.peMin = 4;
				character.peMax = 14;
				character.enMin = 1;
				character.enMax = 6;
				character.chMin = 1;
				character.chMax = 5;
				character.inMin = 1;
				character.inMax = 3;
				character.agMin = 1;
				character.agMax = 15;
				character.lkMin = 1;
				character.lkMax = 10;
				character.statSt = 5;
				character.statPe = 5;
				character.statEn = 5;
				character.statCh = 5;
				character.statIn = 5;
				character.statAg = 5;
				character.statLk = 5;
				character.statPool = 5;
				character.racialElectricResistance = 50;
				character.racialRadiationResistance = 0;
				character.racialPosionResistance = 0;
				character.racialGasResistance = 0;
				character.racialHpMod = 0;
				character.racialPerkRate = 2;
				character.racialDamageResistance = 0;
			break;
			case "robot":
				character.stMin = 7;
				character.stMax = 12;
				character.peMin = 7;
				character.peMax = 12;
				character.enMin = 7;
				character.enMax = 12;
				character.chMin = 1;
				character.chMax = 1;
				character.inMin = 1;
				character.inMax = 12;
				character.agMin = 1;
				character.agMax = 12;
				character.lkMin = 5;
				character.lkMax = 5;
				character.statSt = 7;
				character.statPe = 7;
				character.statEn = 7;
				character.statCh = 1;
				character.statIn = 5;
				character.statAg = 5;
				character.statLk = 5;
				character.statPool = 3;
				character.racialElectricResistance = -10;
				character.racialRadiationResistance = 100;
				character.racialPosionResistance = 100;
				character.racialGasResistance = 100;
				character.racialHpMod = 0;
				character.racialPerkRate = 0;
				character.racialDamageResistance = 40;
			break;
			case "deathclaw":
				character.stMin = 6;
				character.stMax = 14;
				character.peMin = 4;
				character.peMax = 12;
				character.enMin = 1;
				character.enMax = 13;
				character.chMin = 1;
				character.chMax = 3;
				character.inMin = 1;
				character.inMax = 4;
				character.agMin = 6;
				character.agMax = 16;
				character.lkMin = 1;
				character.lkMax = 10;
				character.statSt = 6;
				character.statPe = 5;
				character.statEn = 5;
				character.statCh = 3;
				character.statIn = 4;
				character.statAg = 6;
				character.statLk = 5;
				character.statPool = 6;
				character.racialElectricResistance = 0;
				character.racialRadiationResistance = 50;
				character.racialPosionResistance = 20;
				character.racialGasResistance = 0;
				character.racialHpMod = 2;
				character.racialPerkRate = 4;
				character.racialDamageResistance = 25;
			break;
		}
		calculateAndUpdateDom()
	}

	function setStatPointsFromDom() {
		character.statSt = parseInt($('#strength').val());
		character.statPe = parseInt($('#perception').val());
		character.statEn = parseInt($('#endurance').val());
		character.statCh = parseInt($('#charisma').val());
		character.statIn = parseInt($('#intellegence').val());
		character.statAg = parseInt($('#agility').val());
		character.statLk = parseInt($('#luck').val());
		balanceStatPool();
	}

	function setStatPointsFromVars() {
		$('#strength').val(character.statSt);
		$('#perception').val(character.statPe);
		$('#endurance').val(character.statEn);
		$('#charisma').val(character.statCh);
		$('#intellegence').val(character.statIn);
		$('#agility').val(character.statAg);
		$('#luck').val(character.statLk);
		balanceStatPool();
	}

	function validateStats() {
		var currentTotalStats = character.statSt + 
								character.statPe + 
								character.statEn + 
								character.statCh + 
								character.statIn + 
								character.statAg + 
								character.statLk + 
								character.statPool;
		if (currentTotalStats == totalStats) {
			return true;
		} else {
			return false;
		}
	}

	function balanceStatPool() {
		character.statPool = character.totalStats - (	character.statSt + 
											character.statPe + 
											character.statEn + 
											character.statCh + 
											character.statIn + 
											character.statAg + 
											character.statLk);
		if (character.statPool < 0) {
			$('#statPool').val(character.statPool);
			return false;
		} else {
			$('#statPool').val(character.statPool);
			return true;
		}
	}

	function changeStats(target) {
		var $target = $(target);
		var newStatVal = $target.val(),
			attributeName = $target.data('attrib');
		if (attributeName == "statSt" && newStatVal >= character.stMin && newStatVal <= character.stMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statPe" && newStatVal >= character.peMin && newStatVal <= character.peMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statEn" && newStatVal >= character.enMin && newStatVal <= character.enMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statCh" && newStatVal >= character.chMin && newStatVal <= character.chMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statIn" && newStatVal >= character.inMin && newStatVal <= character.inMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statAg" && newStatVal >= character.agMin && newStatVal <= character.agMax) {
			setStatPointsFromDom();
		} else if (attributeName == "statLk" && newStatVal >= character.lkMin && newStatVal <= character.lkMax) {
			setStatPointsFromDom();
		} else {
			setStatPointsFromVars();
		}
		calculateAndUpdateDom();
	}

	function updateSkillsToDom() {
		$('#smallGuns').val(character.smallGuns);
		$('#bigGuns').val(character.bigGuns);
		$('#energyWeapons').val(character.energyWeapons);
		$('#unarmed').val(character.unarmed);
		$('#meleeWeapons').val(character.meleeWeapons);
		$('#throwing').val(character.throwing);
		$('#firstAid').val(character.firstAid);
		$('#doctor').val(character.doctor);
		$('#sneak').val(character.sneak);
		$('#lockpick').val(character.lockpick);
		$('#steal').val(character.steal);
		$('#traps').val(character.traps);
		$('#science').val(character.science);
		$('#repair').val(character.repair);
		$('#pilot').val(character.pilot);
		$('#speech').val(character.speech);
		$('#barter').val(character.barter);
		$('#gambling').val(character.gambling);
		$('#outdoorsman').val(character.outdoorsman);
		$('#skillPool').val(character.skillPool);
	}

	function updateDerivesToDom() {
		$('#actionPoints').val(character.actionPoints);
		$('#carryWeight').val(character.carryWeight);
		$('#baseMeleeDamage').val(character.baseMeleeDamage);
		$('#poisonResist').val(character.poisonResist);
		$('#radiationResist').val(character.radiationResist);
		$('#gasResist').val(character.gasResist);
		$('#electricResist').val(character.electricResist);
		$('#sequence').val(character.sequence);
		$('#healingRate').val(character.healingRate);
		$('#criticalChance').val(character.criticalChance);
		$('#baseAc').val(character.baseAc);
		$('#baseDr').val(character.baseDr);
		$('#maxHp').val(character.maxHp);
	}

	function calculateSkills() {
		calcSmallGuns();
		calcBigGuns();
		calcEnergyWeapons();
		calcUnarmed();
		calcMeleeWeapons();
		calcThrowing();
		calcFirstAid();
		calcDoctor();
		calcSneak();
		calcLockpick();
		calcSteal();
		calcTraps();
		calcScience();
		calcRepair();
		calcPilot();
		calcSpeech();
		calcBarter();
		calcGambling();
		calcOutdoorsman();
		calcSkillPool();
		updateSkillsToDom();
	}

	function calculateDerives() {
		calcActionPoints();
		calcCarryWeight();
		calcBaseMeleeDamage();
		calcPoisonResist();
		calcRadiationResist();
		calcGasResist();
		calcElectricResist();
		calcSequence();
		calcHealingRate();
		calcCriticalChance();
		calcBaseAc();
		calcMaxHp();
		calcBaseDr();
		updateDerivesToDom();
	}

	function processTags(target) {
		var $tags = $('.tag');
			$checkedTags = $('.tag:checked');

		character.currentTagCount = $checkedTags.length;

		if (character.currentTagCount > character.maxTags ){
			return false;
		} else {
			$tags.each(function(index, element){
				var currentTag = $(element).data('tag'),
					elementChecked = $(element).attr('checked');
					currentPositionInArray = character.taggedSkills.indexOf(currentTag);

				if (elementChecked) {
					if (!currentPositionInArray >= 0) {
						character.taggedSkills[index] = currentTag;
					}
				} else {
					if (currentPositionInArray >= 0) {
						delete character.taggedSkills[currentPositionInArray];
					}
				}
			});
			return true;
		}
	}

	function calcSmallGuns() {
		character.smallGuns = 5 + (4 * character.statAg);
		if (character.taggedSkills.indexOf("smallGuns") >= 0) {
			character.smallGuns += 20;
		}
	}

	function calcBigGuns() {
		character.bigGuns = 0 + (2 * character.statAg);
		if (character.taggedSkills.indexOf("bigGuns") >= 0) {
			character.bigGuns += 20;
		}
	}

	function calcEnergyWeapons() {
		character.energyWeapons = 0 + (2 * character.statAg);
		if (character.taggedSkills.indexOf("energyWeapons") >= 0) {
			character.energyWeapons += 20;
		}
	}

	function calcUnarmed() {
		character.unarmed = 30 + (2 * (character.statAg + character.statSt));
		if (character.taggedSkills.indexOf("unarmed") >= 0) {
			character.unarmed += 20;
		}
	}

	function calcMeleeWeapons() {
		character.meleeWeapons = 20 + (2 * (character.statAg + character.statSt));
		if (character.taggedSkills.indexOf("meleeWeapons") >= 0) {
			character.meleeWeapons += 20;
		}
	}

	function calcThrowing() {
		character.throwing = 0 + (4 * character.statAg);
		if (character.taggedSkills.indexOf("throwing") >= 0) {
			character.throwing += 20;
		}
	}

	function calcFirstAid() {
		character.firstAid = 2 * (character.statPe + character.statIn);
		if (character.taggedSkills.indexOf("firstAid") >= 0) {
			character.firstAid += 20;
		}
	}

	function calcDoctor() {
		character.doctor = 5 + (character.statPe + character.statIn);
		if (character.taggedSkills.indexOf("doctor") >= 0) {
			character.doctor += 20;
		}
	}

	function calcSneak() {
		character.sneak = 5 + (3 * character.statAg);
		if (character.taggedSkills.indexOf("sneak") >= 0) {
			character.sneak += 20;
		}
	}

	function calcLockpick() {
		character.lockpick = 10 + (character.statPe + character.statAg);
		if (character.taggedSkills.indexOf("lockpick") >= 0) {
			character.lockpick += 20;
		}
	}

	function calcSteal() {
		character.steal = 0 + (3 * character.statAg);
		if (character.taggedSkills.indexOf("steal") >= 0) {
			character.steal += 20;
		}
	}
	
	function calcTraps() {
		character.traps = 10 + (character.statPe + character.statAg);
		if (character.taggedSkills.indexOf("traps") >= 0) {
			character.traps += 20;
		}
	}
	
	function calcScience() {
		character.science = 0 + (4 * character.statIn);
		if (character.taggedSkills.indexOf("science") >= 0) {
			character.science += 20;
		}
	}
	
	function calcRepair() {
		character.repair = 0 + (3 * character.statIn);
		if (character.taggedSkills.indexOf("repair") >= 0) {
			character.repair += 20;
		}
	}
	
	function calcPilot() {
		character.pilot = 0 + (2 * (character.statAg + character.statPe));
		if (character.taggedSkills.indexOf("pilot") >= 0) {
			character.pilot += 20;
		}
	}
	
	function calcSpeech() {
		character.speech = 0 + (5 * character.statCh);
		if (character.taggedSkills.indexOf("speech") >= 0) {
			character.speech += 20;
		}
	}
	
	function calcBarter() {
		character.barter = 0 + (4 * character.statCh);
		if (character.taggedSkills.indexOf("barter") >= 0) {
			character.barter += 20;
		}
	}
	
	function calcGambling() {
		character.gambling = 0 + (5 * character.statLk);
		if (character.taggedSkills.indexOf("gambling") >= 0) {
			character.gambling += 20;
		}
	}

	function calcOutdoorsman() {
		character.outdoorsman = 0 + (2 * (character.statEn + character.statIn));
		if (character.taggedSkills.indexOf("outdoorsman") >= 0) {
			character.outdoorsman += 20;
		}
	}

	function calcSkillPool() {
		character.skillPool = 5 + (2 * character.statIn);
	}

	function calcActionPoints() {
		character.actionPoints = Math.floor(5 + (character.statAg / 2));
	}

	function calcCarryWeight() {
		character.carryWeight = 25 + (25 * character.statSt);
	}

	function calcBaseMeleeDamage() {
		character.baseMeleeDamage = character.statSt - 5;
		if (character.baseMeleeDamage < 1 ) {
			character.baseMeleeDamage = 1;
		}
	}

	function calcPoisonResist() {
		character.poisonResist = 0;
		character.poisonResist = 5 * character.statEn + character.racialPosionResistance;
	}

	function calcRadiationResist() {
		character.radiationResist = 0;
		character.radiationResist = 2 * character.statEn + character.racialPosionResistance;
	}

	function calcGasResist() {
		character.gasResist = 0;
		character.gasResist = character.gasResist + character.racialGasResistance;
	}

	function calcElectricResist() {
		character.electricResist = 0;
		character.electricResist = character.electricResist + character.racialElectricResistance;
	}

	function calcSequence() {
		character.sequence = (2 * character.statPe) + character.level;
	}

	function calcHealingRate() {
		character.healingRate = Math.floor(character.statEn / 3);
		if (character.healingRate < 1) {
			character.healingRate = 1;
		}
	}

	function calcCriticalChance() {
		character.criticalChance = character.statLk;	
	}

	function calcBaseAc() {
		character.baseAc = character.statAg;
	}

	function calcBaseDr() {
		character.baseDr = 0;
		character.baseDr + character.racialDamageResistance;
	}

	function calcMaxHp() {
		character.maxHp = Math.floor(
							15 + (character.statSt + (2 * character.statEn)) + 
							(character.level * (3 + (character.statEn / 2) + character.racialHpMod))
						);
	}

})( jQuery );