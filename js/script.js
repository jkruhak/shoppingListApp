var addItems = function() {
	var enteredQuantity = $("#productQuantity").val();
	var enteredName = $("#productName").val();
	var enteredPrice = $("#productPrice").val();
	

	if(enteredName === "") {
		alert("Please enter an item in Item field");
	} 
	else if (!enteredQuantity.match(/^\d+$/)){
		alert("Please enter a number in Quantity field");
	}
	else if (!enteredPrice.match(/^\d+(\.\d{0,2})?$/)){
		alert("Please enter a number in Price field");
	}
	else {
		var enteredTotal = enteredPrice*enteredQuantity;
		var priceRound = enteredTotal.toFixed(2);

		$("#shoppingList").append("<li class='columnList'><ul class='listComplete'><li class='imageCol'><img src='images/checkMark.png' class='checkImage'>" + " " + "<img src='images/xMark.png' class='xImage'></li><li class='quantityCol'>" + enteredQuantity + "</li><li class='nameCol'>" + enteredName + "</li><li class='priceCol'>" + priceRound + "</li></ul></li>");


	}
};

var shoppingTotals = function() {
	var quantitySum = 0;
	var totalPrice = 0;

	//quantity total
		$(".listComplete").children(".quantityCol").each(function() {
			quantitySum += parseInt($(this).html());
		});

		$("#quantityOutput").text(quantitySum);

	//price total
		$(".listComplete").children(".priceCol").each(function() {
			totalPrice += parseFloat($(this).html());
		});

		var priceSum = totalPrice.toFixed(2);

		$("#priceOutput").text("$ " + priceSum);
};

/*--- jQuery ---*/
$(document).ready(function() {
	$("#add").on("click", "#addButton", function() {
		addItems();
		$("#productQuantity").val("1");
		$("#productName").val("");
		$("#productPrice").val("0.00");

		shoppingTotals();
	});

	$("body").on("keypress", function(event) {
		if(event.which == '13') {
			event.preventDefault();
			addItems();
			$("#productQuantity").val("1");
			$("#productName").val("");
			$("#productPrice").val("0.00");

			shoppingTotals();
		}
	});

	$("#shoppingList").on("click", ".xImage", function() {
		$(this).closest(".columnList").remove();
		shoppingTotals();
	});

	$("#listFields").on("click", ".checkImage", function() {
		$(this).closest(".columnList").toggleClass("gotit");
	});
});