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

		$("#shoppingList").append("<li class='columnList'><ul class='listComplete'><li class='checkCol'><li class='removeCol'></li><li class='quantityCol'>" + enteredQuantity + "</li><li class='nameCol'>" + enteredName + "</li><li class='priceCol'>" + priceRound + "</li></ul></li>");
		$(".checkCol").addClass("uncheckImage");
		$(".removeCol").addClass("xImage");
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

	$("#shoppingList").on("click", ".uncheckImage", function() {
		$(this).closest(".checkCol").removeClass("uncheckImage").addClass("checkImage");
		$(this).closest(".listComplete").find(".quantityCol").addClass("gotit");
		$(this).closest(".listComplete").find(".nameCol").addClass("gotit");
		$(this).closest(".listComplete").find(".priceCol").addClass("gotit");
	});

	$("#shoppingList").on("click", ".checkImage", function() {
		$(this).closest(".checkCol").removeClass("checkImage").addClass("uncheckImage");
		$(this).closest(".listComplete").find(".quantityCol").removeClass("gotit");
		$(this).closest(".listComplete").find(".nameCol").removeClass("gotit");
		$(this).closest(".listComplete").find(".priceCol").removeClass("gotit");
	});
});