$(document).ready(function(){
	var chacaterSpecies = $('#chacaterSpecies').val(),
		chacaterLevel = $('#chacaterLevel').val()
		$stats = $('.stat');

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