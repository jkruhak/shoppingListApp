var addItems = function() {
	var enteredQuantity = $("#productQuantity").val();
	var enteredName = $("#productName").val();
	var enteredPrice = ($("#productPrice").val())*(enteredQuantity);
	var priceRound = enteredPrice.toFixed(2);

	if(enteredName === "") {
		alert("Please enter an item in Item field");
	} 
	else if (!enteredQuantity.match(/^\d+$/)){
		alert("Please enter a number in Quantity field");
	}
	else {
		$("table").append("<tr><td class='imageCol'><img src='images/checkMark.png' class='checkImage'><img src='images/xMark.png' class='xImage'></td><td class='quantityCol'>"+enteredQuantity+"</td><td class='nameCol'>"+enteredName+"</td><td class='priceCol'>"+priceRound+"</td></tr>");
	}
};

var shoppingTotals = function() {
	var quantitySum = 0;
	var totalPrice = 0;

	//quantity total
		$("table tr").children("td:nth-child(2)").each(function() {
			quantitySum += parseInt($(this).html());
		});

		$("#quantityOutput").text(quantitySum);

	//price total
		$("table tr").children("td:nth-child(4)").each(function() {
			totalPrice += parseFloat($(this).html());
		});

		var priceSum = totalPrice.toFixed(2);

		$("#priceOutput").text("$ " + priceSum);
};

/*--- jQuery ---*/
$(document).ready(function() {
	$("#add").on("click", "#addButton", function() {
		addItems();
		$("#productName").val("");

		shoppingTotals();
	});

	$("body").on("keypress", function(event) {
		if(event.which == '13') {
			event.preventDefault();
			addItems();
			$("#productName").val("");

			shoppingTotals();
		}
	});

	$("table").on("click", ".xImage", function() {
		$(this).closest("tr").remove();
		shoppingTotals();
	});

	$("table").on("click", ".checkImage", function() {
		$(this).closest("tr").toggleClass("gotit");
		
		if($("table tr").hasClass("gotit")) {
			shoppingTotals();
		}
	});
});