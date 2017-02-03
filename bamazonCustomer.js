var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");

var inquirer = require("inquirer");
var connection = require("./connection.js");
var Table = require('cli-table');
// var placeOrder = require('./placeOrder.js');

var customerPortal = function(){


inquirer.prompt([
      {
 		type: 'list',
        name: "task",
        message: colors.yellow("Please choose:"),
        choices: ["Buy Stuff", "Exit"]
      },
]).then(function(answers) {
	  	var type=answers.task;

	  	switch(type){

     //basic card
      	case "Buy Stuff":
			  displayProducts();
		break;
		case "Exit":
			process.exit();
		break;

		default:
        return false;

		};

	});

};//end customerPortal


var displayProducts = function(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			var table = new Table({
    			head: ['ID', "Price", "Product Name"], 
    			colWidths: [11, 14, 75]
			});



		for (var i = 0; i<res.length; i++) {
			table.push([res[i].item_id, "$"+res[i].retail, res[i].product_name]);
			//console.log("ID: "+res[i].item_id+" | Price: $"+res[i].price+" | Product Name: "+res[i].product_name);
		};//end for loop
		console.log(table.toString());
		placeOrder();
	};//end else
	}); //end connection
};// end displayProducts




var placeOrder = function(){
  var schema = {
    properties: {
      ProductID: {
      	description: 'Please enter the Product ID',
        pattern: /^[0-9]+$/,
        message: 'Please enter only the number of the Product ID.',
        required: true
      },
      Quantity: {
      	description: 'How many would you like to order?',
        pattern: /^[0-9]+$/,
        message: 'Please enter only the number of quantity you would like to order.',
        required: true
      }
    }
  };

  //prompt.message = colors.cyan("Please place your order:");
// Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: the item to buy and how many they want
  // 
  prompt.get(schema, function (err, result) {
  	var quantity=parseFloat(result.Quantity);
  	var product=result.ProductID;
  	var productDetails ="";

	var query = "SELECT * FROM products WHERE ?";

	connection.query(query, {item_id : product}, function(err, res){
		//console.log(res);
		//console.log(quantity);

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			productDetails = res;
			var description = res[0].product_name;
			var inventory = res[0].stock_quantity;
			//console.log(inventory);
			if (quantity <= inventory){
				//place order and adjust inventory

   					var newInventory = inventory-quantity;
   					var totalCost=res[0].retail*quantity;

					addToCart(product, newInventory, quantity, totalCost, description);
			} else if(quantity>inventory){

				if (inventory > 0){
					console.log(colors.yellow("We only have "+inventory+" unit(s) of this item in stock. Please adjust your order."));

				} else if (inventory === 0){
					console.log(colors.magenta("I'm sorry, we are currently out of stock."));
				} else {
					console.log("the comparisons aren't working");
					}; // end if else
				customerPortal(); //display inventory so they can adjust their order
				}//end not enough inventory
			}//end of product exists check
		}); //end connection
  });//end prompt
};//end placeOrder


var addToCart = function(product, newInventory, quantity, totalCost, description){

	//log sales transaction. Do this first so that there is a record of the sale. (If you change the inventory before logging the sale, you think people are stealing.)
	connection.query("INSERT INTO sales SET ?", {
    	item_id: product,
    	product_name: description,
    	order_quantity: quantity,
    	total: totalCost
	}, function(err, res){
		//console.log(res.insertId);

		//I want to be able to capture the order ID
			var orderID = res.insertId;
		// 	console.log(orderID);});
		//if sales transaction is logged, then update the inventory.
		var query = "UPDATE products SET ? WHERE ?";
			[{stock_quantity: newInventory},{item_id: product}]


		connection.query(query,[{stock_quantity: newInventory},{item_id: product}], function(err, res){
		if (err){
			console.log(err);
		} else {

			var table = new Table();

			table.push(
    			{'Your order number': colors.cyan(orderID)},
    			{'Product ID': colors.yellow(product) },
    			{'Product Name' : colors.yellow(description)},
    			{'Quantity': colors.yellow(quantity)},
    			{'Total': colors.green('$'+totalCost)}
				);


			console.log(table.toString());

			// //if inventory is changed, display order.
			// console.log('Your order number: '+ orderID);
   //  		console.log('  Product ID: ' + colors.yellow(product));
   //  		console.log('  Product Name: ' +colors.green( description));
   // 			console.log('  Quantity: ' +colors.green( quantity));
   // 			console.log('  Total: ' + colors.green(totalCost));

			customerPortal();
		}; //end if else
	});//end connection to products
});//end connection to sales

};//end addToCart



module.exports= customerPortal;