var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");
var inquirer = require("inquirer");
var connection = require("./connection.js");


var Table = require('cli-table');




var managerPortal = function(){


inquirer.prompt([
      {
 		type: 'list',
        name: "task",
        message: colors.yellow("Would you like to do?"),
        choices: ["View Products for Sale", "View Low Inventory", "Adjust Inventory", "Add New Product", "Exit"]
      },
]).then(function(answers) {
	  	var type=answers.task;

	  	switch(type){

 
      	case "View Products for Sale":
			  displayProducts();
		break;
		case "View Low Inventory":
			lowInventory();
		break;
		case "Adjust Inventory":
			addInventory();
		break;
		case "Add New Product":
			newProduct();
		break;
		case "Exit":
			process.exit();
		break;

		default:
        return false;

		};

	});

};//end promptTask



var createProductTable = function(res){
	var table = new Table({
    			head: ['ID', 'Inventory','Wholesale', "Retail", "Product Name", "Department"], colWidths: [11,11,14,14, 75, 25]
	});
	for (var i = 0; i<res.length; i++) {

		table.push([res[i].item_id, res[i].stock_quantity, "$"+res[i].wholesale,"$"+res[i].retail, res[i].product_name, res[i].department_name]);

	}; //end for loop
	console.log("\r\n"+table.toString());

}



var displayProducts = function(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {

			createProductTable(res);
			managerPortal();
		};//end else
		
	}); //end connection
};// end displayProducts



var lowInventory = function(){

	var query = "SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 4";

	connection.query(query, function(err, res){
		//console.log(res);
		//console.log(quantity);
		var table = new Table({
    			head: ['ID', 'Inventory', "Wholesale","Retail", "Product Name", "Department"], colWidths: [11,11,14, 14, 75, 25]
    				});
		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			for (var i = 0; i<res.length; i++) {

				var retail=res[i].retail.toFixed(2);
				var wholesale = res[i].wholesale.toFixed(2);

				table.push([res[i].item_id, res[i].stock_quantity, "$"+wholesale,"$"+retail, res[i].product_name, res[i].department_name]);
				// console.log("ID: "+res[i].item_id+" | Inventory: "+res[i].stock_quantity+" | Price: $"+res[i].price+" | Product Name: "+res[i].product_name+" | Department: "+res[i].department_name);
			}; //end for loop
			console.log("\r\n"+table.toString());
			managerPortal();
		};//end else
	});//end connection
	//promptTask();
};// end low inventory


var addInventory = function (){

		var query = "SELECT * FROM products";
	connection.query(query, function(err, res){

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {

			createProductTable(res);
			promptAdd();
		};//end else
		
	}); //end connection

}; //end add inventory


var promptAdd = function (){
  var schema = {
    properties: {
      ProductID: {
      	description: 'Please enter the Product ID:',
        pattern: /^[0-9]+$/,
        message: 'Please enter only the number of the Product ID.',
        required: true
      },
      Quantity: {
      	description: 'Enter the amount you would like to adjust the inventory by:',
        pattern: /^[0-9\-\+]+$/,
        message: 'Please enter only the number of quantity you would like to order.',
        required: true
      }
    }
  };

  prompt.message = colors.cyan("Adjust Inventory:");
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

	if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			productDetails = res;
			var description = res[0].product_name;
			var inventory = res[0].stock_quantity;
			var newInventory = inventory+quantity;

   			var wholesaleCost=res[0].wholesale*quantity;
//addToCart(product, newInventory, quantity, totalCost, description);
			connection.query("INSERT INTO wholesale SET ?", {
		    	item_id: product,
		    	product_name: description,
		    	wholesale_quantity: quantity,
		    	wholesale_total: wholesaleCost
			}, function(err, res){
				//console.log(res.insertId);

		//I want to be able to capture the order ID
			var orderID = res.insertId;


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
		    			{'Previous Inventory': colors.yellow(quantity)},
		    			{'New Inventory': colors.yellow(newInventory)},
    					{'Order Total': colors.green('$'+wholesaleCost)}	
						);


					console.log(table.toString());

				};//end else
				managerPortal(); //inital prompt

				});//end connection to update products
		});//edn wholesale connection
		}; //end else
	}); //end connection o select products

}); //end prompt
}; //end promptAdd


var newProduct = function () {
	  // Start the prompt 
 
  	var schema = {
	    properties: {
	      productName: {
	      	description: "Enter the Product Name:",
	        pattern: /^[a-zA-Z0-9\s\&\-]+$/,
	        message: 'Name must be only letters, spaces, letters, or dashes.',
	        required: true
	      },
	      department: {
	      	description: "Enter the Product Department:",
	        pattern: /^[a-zA-Z0-9\s\-]+$/,
	        message: 'Department must be only letters, spaces, letters, or dashes.',
	        required: true
	      },
	      retailPrice: {
	      	description: "Enter the Product Retail Price:",
	        pattern: /^[0-9\.]+$/,
	        message: 'Prices must be only numbers and a decimal.',
	        required: true
	      },    
	      wholesalePrice: {
	      	description: "Enter the Product Wholesale Price:",
	        pattern: /^[0-9\.]+$/,
	        message: 'Prices must be only numbers and a decimal.',
	        required: true
	      }, 	       
	      startInventory: {
	      	description: "Enter the amount you have in stock:",
	        pattern: /^[0-9]+$/,
	        message: 'Inventory must be only numbers.',
	        required: true
	      }        
	    } //end properties
  	};//end schema
 	prompt.start();
  	 prompt.get(schema, function (err, results) {
		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			//console.log(results);
			var productName=results.productName;
			var department=results.department;
			var retailPrice=results.retailPrice
			retailPrice=Number(retailPrice).toFixed(2);
			var wholesalePrice=results.wholesalePrice
			wholesalePrice=Number(wholesalePrice).toFixed(2);
			var startInventory=results.startInventory;
			startInventory=Number(startInventory);
			var wholesaleTotal=wholesalePrice*startInventory;

			connection.query("INSERT INTO products SET ?",{
				product_name: productName,
				department_name: department, 
   				retail: retailPrice,
   				wholesale: wholesalePrice,
    			stock_quantity: startInventory,


			}, function (err, results){
					if (err){
						console.log(err);
					} else {

						var table = new Table(  {head: ['','New Product Summary']});

						table.push(
			    			{'Product Name' : colors.yellow(productName)},
			    			{'Department' : colors.yellow(department)},
			    			{'Retail Price': colors.yellow(retailPrice)},
			    			{'Wholesale Price': colors.yellow(wholesalePrice)},
			    			{'Starting Inventory': colors.yellow(startInventory)}
							);
						console.log(table.toString());
				

			var itemID = results.insertId;
			connection.query("INSERT INTO wholesale SET ?",{
				item_id: itemID,
				product_name: productName,
    			wholesale_quantity: startInventory,
    			wholesale_total: wholesaleTotal

			}, function (err, results){
					if (err){
						console.log(err);
					} else { 
						console.log("Your new inventory order has been logged.");
						managerPortal();
					}; //end else
			});//END connection into wholesale

		};//end else

	});//end connection into products
	}; //end else
	}); //end prompt

};//end newProduct

module.exports= managerPortal; //inital prompt