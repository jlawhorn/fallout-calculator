$(document).ready(function(){
	var chacaterSpecies = $('#chacaterSpecies').val(),
		chacaterLevel = $('#chacaterLevel').val()
		$stats = $('.stat'),
		currentTagCount = 0,
		maxTags = 0,
		totalStats = 40,
		statSt = 5,
		statPe = 5,
		statEn = 5,
		statCh = 5,
		statIn = 5,
		statAg = 5,
		statLk = 5,
		statPool = 5;

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
		var currentTotalStats = 0,
		statSt = $('#strength');
		statPe = $('#perception');
		statEn = $('#endurance');
		statCh = $('#charisma');
		statIn = $('#intellegence');
		statAg = $('#agility');
		statLk = $('#luck');
		statPool = $('#statPool');
		currentTotalStats = statSt + statPe + statEn + statCh + statIn + statAg + statLk + statPool;
		if (validateStats(currentTotalStats)) {

		}
	}

	function validateStats(currentTotalStats) {
		if (currentTotalStats == totalStats) {
			return true;
		} else {
			return false;
		}
		
	}

	function changeStats (target) {
		var $target = $(target);
		var newStatVal = $target.val();
		if (newStatVal > 10 || newStatVal < 1) {
			$target.addClass('error');
		}
	}
});