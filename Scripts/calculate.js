$(document).ready(function(){
	var chacaterSpecies = $('#chacaterSpecies').val(),
		chacaterLevel = $('#chacaterLevel').val()
		$stats = $('.stat'),
		currentTagCount = 0,
		maxTags = 0,
		totalStats = 40,
		statMin = 1,
		statMax = 10,
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
		outdoorsman = 0;

		initializeValues();

	$stats.on('change', function(e){
		changeStats(this);
	});

	$('#calculator').on('submit', function(e){
		e.preventDefault();
	});

	function initializeValues() {
		cacluateInitialStatPoints();
		setTotalStats();
		setStatPointsFromDom();
	}

	function setTotalStats() {
		if (chacaterSpecies == "human") {
			totalStats = 40;
			statMin = 1;
			statMax = 10;
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

	function logStats() {
		console.log('str ' + statSt);
		console.log('per ' + statPe);
		console.log('end ' + statEn);
		console.log('cha ' + statCh);
		console.log('int ' + statIn);
		console.log('agi ' + statAg);
		console.log('luk ' + statLk);
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
	}

	function calcSmallGuns() {
		smallGuns = 5 + (4 * statAg);
	}

	function calcBigGuns() {
		bigGuns = 0 + (2 * statAg);
	}

	function calcEnergyWeapons {
		energyWeapons = 0 + (2 * statAg);
	}

});