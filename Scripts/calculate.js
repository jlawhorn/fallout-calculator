$(document).ready(function(){
	var defaults = {
		chacaterSpecies : 'human',
		chacaterLevel : 1
	};
	var options = {};
	var $stats = $('.stat'),
		currentTagCount = 0,
		maxTags = 0,
		totalStats = 40,
		stMin = 0,
		stMax = 0,
		peMin = 0,
		peMax = 0,
		enMin = 0,
		enMax = 0,
		chMin = 0,
		chMax = 0,
		inMin = 0,
		inMax = 0,
		agMin = 0,
		agMax = 0,
		lkMin = 0,
		lkMax = 0,
		statSt = 5,
		statPe = 5,
		statEn = 5,
		statCh = 5,
		statIn = 5,
		statAg = 5,
		statLk = 5,
		statPool = 5,
		smallGuns = 0,
		bigGuns = 0,
		energyWeapons = 0,
		unarmed = 0,
		meleeWeapons = 0,
		throwingWeapons = 0,
		firstAid = 0,
		doctor = 0,
		sneak = 0,
		lockpick = 0,
		steal = 0,
		traps = 0,
		science = 0,
		repair = 0,
		pilot = 0,
		speech = 0,
		barter = 0,
		gambling = 0,
		outdoorsman = 0,
		actionPoints = 0,
		carryWeight = 0,
		baseMeleeDamage = 0,
		poisonResist = 0,
		radiationResist = 0,
		gasResist = 0,
		electricResist = 0,
		sequence = 0,
		healingRate = 0,
		criticalChance = 0,
		baseAc = 0,
		maxHp = 0,
		racialElectricyResistance = 0,
		racialRadiationResistance = 0,
		racialPosionResistance = 0,
		racialHpMod = 0,
		racialPerkRate = 0,
		racialDamageResistance = 0;

	var character = $.extend({}, defaults, options);

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

	function initializeValues() {
		cacluateInitialStatPoints();
		updateSpecies("human");
		setStatPointsFromDom();
		calculateSkills();
		calculateDerives();
	}

	function calculateAndUpdateDom(){
		setStatPointsFromVars();
		calculateSkills();
		calculateDerives();
	}

	function updateSpecies(newSpecies) {
		chacaterSpecies = newSpecies;
		switch(newSpecies) {
			case "human":
				stMin = 1;
				stMax = 10;
				peMin = 1;
				peMax = 10;
				enMin = 1;
				enMax = 10;
				chMin = 1;
				chMax = 10;
				inMin = 1;
				inMax = 10;
				agMin = 1;
				agMax = 10;
				lkMin = 1;
				lkMax = 10;
				statSt = 5;
				statPe = 5;
				statEn = 5;
				statCh = 5;
				statIn = 5;
				statAg = 5;
				statLk = 5;
				statPool = 5;
				racialElectricyResistance = 10;
				racialRadiationResistance = 0;
				racialPosionResistance = 0;
				racialHpMod = 0;
				racialPerkRate = 3;
				racialDamageResistance = 0;
			break;
			case "ghoul":
				stMin = 1;
				stMax = 8;
				peMin = 4;
				peMax = 13;
				enMin = 1;
				enMax = 10;
				chMin = 1;
				chMax = 10;
				inMin = 2;
				inMax = 10;
				agMin = 1;
				agMax = 6;
				lkMin = 5;
				lkMax = 12;
				statSt = 5;
				statPe = 5;
				statEn = 5;
				statCh = 5;
				statIn = 5;
				statAg = 5;
				statLk = 5;
				statPool = 5;
				racialElectricyResistance = 0;
				racialRadiationResistance = 80;
				racialPosionResistance = 30;
				racialHpMod = 0;
				racialPerkRate = 4;
				racialDamageResistance = 0;
			break;
			case "mutant":
				stMin = 5;
				stMax = 13;
				peMin = 1;
				peMax = 11;
				enMin = 4;
				enMax = 11;
				chMin = 1;
				chMax = 7;
				inMin = 1;
				inMax = 11;
				agMin = 1;
				agMax = 8;
				lkMin = 1;
				lkMax = 10;
				statSt = 5;
				statPe = 5;
				statEn = 5;
				statCh = 5;
				statIn = 5;
				statAg = 5;
				statLk = 5;
				statPool = 5;
				racialElectricyResistance = 0;
				racialRadiationResistance = 50;
				racialPosionResistance = 20;
				racialHpMod = 2;
				racialPerkRate = 4;
				racialDamageResistance = 25;
			break;
			case "dog":
				stMin = 1;
				stMax = 7;
				peMin = 4;
				peMax = 14;
				enMin = 1;
				enMax = 6;
				chMin = 1;
				chMax = 5;
				inMin = 1;
				inMax = 3;
				agMin = 1;
				agMax = 15;
				lkMin = 1;
				lkMax = 10;
				statSt = 5;
				statPe = 5;
				statEn = 5;
				statCh = 5;
				statIn = 5;
				statAg = 5;
				statLk = 5;
				statPool = 5;
				racialElectricyResistance = 50;
				racialRadiationResistance = 0;
				racialPosionResistance = 0;
				racialHpMod = 0;
				racialPerkRate = 2;
				racialDamageResistance = 0;
			break;
			case "robot":
				stMin = 7;
				stMax = 12;
				peMin = 7;
				peMax = 12;
				enMin = 7;
				enMax = 12;
				chMin = 1;
				chMax = 1;
				inMin = 1;
				inMax = 12;
				agMin = 1;
				agMax = 12;
				lkMin = 5;
				lkMax = 5;
				statSt = 7;
				statPe = 7;
				statEn = 7;
				statCh = 1;
				statIn = 5;
				statAg = 5;
				statLk = 5;
				statPool = 3;
				racialElectricyResistance = 0;
				racialRadiationResistance = 100;
				racialPosionResistance = 100;
				racialHpMod = 0;
				racialPerkRate = 0;
				racialDamageResistance = 40;
			break;
			case "deathclaw":
				stMin = 6;
				stMax = 14;
				peMin = 4;
				peMax = 12;
				enMin = 1;
				enMax = 13;
				chMin = 1;
				chMax = 3;
				inMin = 1;
				inMax = 4;
				agMin = 6;
				agMax = 16;
				lkMin = 1;
				lkMax = 10;
				statSt = 6;
				statPe = 5;
				statEn = 5;
				statCh = 3;
				statIn = 4;
				statAg = 6;
				statLk = 5;
				statPool = 6;
				racialElectricyResistance = 0;
				racialRadiationResistance = 50;
				racialPosionResistance = 20;
				racialHpMod = 2;
				racialPerkRate = 4;
				racialDamageResistance = 25;
			break;
		}

	}

	function cacluateInitialStatPoints() {
		if (chacaterSpecies == "human"){
			$stats.each(function(index, element){
				$(element).val(5);
			});
			$('#statPool').val(5);
		}
	}

	function setStatPointsFromDom() {
		statSt = parseInt($('#strength').val());
		statPe = parseInt($('#perception').val());
		statEn = parseInt($('#endurance').val());
		statCh = parseInt($('#charisma').val());
		statIn = parseInt($('#intellegence').val());
		statAg = parseInt($('#agility').val());
		statLk = parseInt($('#luck').val());
		balanceStatPool();
	}

	function setStatPointsFromVars() {
		$('#strength').val(statSt);
		$('#perception').val(statPe);
		$('#endurance').val(statEn);
		$('#charisma').val(statCh);
		$('#intellegence').val(statIn);
		$('#agility').val(statAg);
		$('#luck').val(statLk);
		balanceStatPool();
	}

	function validateStats() {
		var currentTotalStats = statSt + statPe + statEn + statCh + statIn + statAg + statLk + statPool;
		if (currentTotalStats == totalStats) {
			return true;
		} else {
			return false;
		}
	}

	function balanceStatPool() {
		statPool = totalStats - (statSt + statPe + statEn + statCh + statIn + statAg + statLk);
		if (statPool < 0) {
			$('#statPool').val(statPool);
			return false;
		} else {
			$('#statPool').val(statPool);
			return true;
		}
	}

	function changeStats(target) {
		var $target = $(target);
		var newStatVal = $target.val(),
			attributeName = $target.data('attrib');
		if (newStatVal > statMax || newStatVal < statMin) {
			setStatPointsFromVars();
		} else {
			setStatPointsFromDom();
		}
		calculateSkills();
		calculateDerives();
	}

	function updateSkillsToDom() {
		$('#smallGuns').val(smallGuns);
		$('#bigGuns').val(bigGuns);
		$('#energyWeapons').val(energyWeapons);
		$('#unarmed').val(unarmed);
		$('#meleeWeapons').val(meleeWeapons);
		$('#throwing').val(throwing);
		$('#firstAid').val(firstAid);
		$('#doctor').val(doctor);
		$('#sneak').val(sneak);
		$('#lockpick').val(lockpick);
		$('#steal').val(steal);
		$('#traps').val(traps);
		$('#science').val(science);
		$('#repair').val(repair);
		$('#pilot').val(pilot);
		$('#speech').val(speech);
		$('#barter').val(barter);
		$('#gambling').val(gambling);
		$('#outdoorsman').val(outdoorsman);
	}

	function updateDerivesToDom() {
		$('#actionPoints').val(actionPoints);
		$('#carryWeight').val(carryWeight);
		$('#baseMeleeDamage').val(baseMeleeDamage);
		$('#poisonResist').val(poisonResist);
		$('#radiationResist').val(radiationResist);
		$('#gasResist').val(gasResist);
		$('#electricResist').val(electricResist);
		$('#sequence').val(sequence);
		$('#healingRate').val(healingRate);
		$('#criticalChance').val(criticalChance);
		$('#baseAc').val(baseAc);
		$('#maxHp').val(maxHp);
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
		updateDerivesToDom();
	}

	function calcSmallGuns() {
		smallGuns = 5 + (4 * statAg);
	}

	function calcBigGuns() {
		bigGuns = 0 + (2 * statAg);
	}

	function calcEnergyWeapons() {
		energyWeapons = 0 + (2 * statAg);
	}

	function calcUnarmed() {
		unarmed = 30 + 2 * (statAg * statSt);
	}

	function calcMeleeWeapons() {
		meleeWeapons = 20 + 2 * (statAg * statSt);
	}

	function calcThrowing() {
		throwing = 0 + (4 * statAg);
	}

	function calcFirstAid() {
		firstAid = 2 * (statPe + statIn);
	}

	function calcDoctor() {
		doctor = 5 + (statPe + statIn);
	}

	function calcSneak() {
		sneak = 5 + (3 * statAg);
	}

	function calcLockpick() {
		lockpick = 10 + (statPe + statAg);
	}

	function calcSteal() {
		steal = 0 + (3 * statAg);
	}
	
	function calcTraps() {
		traps = 0 + (statPe + statAg);
	}
	
	function calcScience() {
		science = 0 + (4 * statIn);
	}
	
	function calcRepair() {
		repair = 0 + (3 * statIn);
	}
	
	function calcPilot() {
		pilot = 0 + (2 * (statAg + statPe));
	}
	
	function calcSpeech() {
		speech = 0 + (5 * statCh);
	}
	
	function calcBarter() {
		barter = 0 + (4 * statCh);
	}
	
	function calcGambling() {
		gambling = 0 + (5 * statLk);
	}

	function calcOutdoorsman() {
		outdoorsman = 0 + (2 * (statEn + statIn));
	}

	function calcActionPoints() {
		actionPoints = 5 + (statAg / 2);
	}

	function calcCarryWeight() {
		carryWeight = 25 + (25 * statSt);
	}

	function calcBaseMeleeDamage() {
		baseMeleeDamage = statSt - 5;
		if (baseMeleeDamage > 1 ) {
			baseMeleeDamage = 1;
		}
	}

	function calcPoisonResist() {
		poisonResist = 5 * statEn;
	}

	function calcRadiationResist() {
		radiationResist = 2 * statEn;
	}

	function calcGasResist() {
		gasResist = 0;
	}

	function calcElectricResist() {
		if (chacaterSpecies == "human") {
			electricResist = 10;
		} else {
			electricResist = 0;
		}
	}

	function calcSequence() {
		sequence = 2 * statPe;
	}

	function calcHealingRate() {
		healingRate = 5 / statEn;
	}

	function calcCriticalChance() {
		criticalChance = statLk;	
	}

	function calcBaseAc() {
		baseAc = 0;
	}

	function calcMaxHp() {
		maxHp = 0;
	}

});