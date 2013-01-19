$(document).ready(function(){
	var chacaterSpecies = $('#chacaterSpecies').val(),
		chacaterLevel = $('#chacaterLevel').val()
		$stats = $('.stat'),
		currentTagCount = 0,
		maxTags = 0;

		initializeValues();


	function initializeValues() {
		cacluateTotalStatPoints();
	}

	function cacluateTotalStatPoints() {
		if (chacaterSpecies == "human"){
			$stats.each(function(index, element){
				$(element).val(5);
			});
		}
	}
});