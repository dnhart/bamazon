var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");
var inquirer = require("inquirer");
var connection = require("./connection.js");


var Table = require('cli-table');
// var displayProducts = require('./displayProducts.js');
var departmentNames=[];


var supervisorPortal = function(){


inquirer.prompt([
      {
 		type: 'list',
        name: "report",
        message: colors.yellow("Choose a Report to run."),
        choices: ["View Products for Sale","View Sales Order Totals", "View Wholesale Order Totals", "View P&L by Department", "Exit"]
      },
]).then(function(answers) {
	  	var report=answers.report;

	  	switch(report){

        case "View Products for Sale":
			  displayProducts();
		break;
      	case "View Sales Order Totals":
			  totalSales();
		break;
		case "View Wholesale Order Totals":
			wholesaleOrderTotal();
		break;
		case "View P&L by Department":
			departmentSummary();
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

};

var createDepartmentList = function (){
    var query =  "SELECT DISTINCT department_name FROM products";
    connection.query(query, function(err, res){

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {
			for (var i = 0; i<res.length; i++) {

				departmentNames.push(res[i].department_name);
				};

			//console.log(departmentNames);
		
		};//end else
		
	}); //end connection
}; //createDepartmentList


var displayProducts = function(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){

		if (err){
			console.log(err);
			//console.log("Product does not exist.");
		} else {

			createProductTable(res);
			supervisorPortal();
		};//end else
		
	}); //end connection
};// end displayProducts

var totalSales = function(){
	

	var query = "SELECT products.department_name, SUM(sales.total) AS Total FROM products LEFT JOIN sales on sales.item_id=products.item_id GROUP BY products.department_name";

	// var query = "SELECT SUM(total) FROM sales RIGHT JOIN products on sales.item_id=products.item_id AS ? WHERE ?";


				connection.query(query, function(err, res){

				var table = new Table({
    			head: ['Department', 'Total Sales'], colWidths: [25,15]
    				});


				if (err){
					console.log(err);
					//console.log("Product does not exist.");
				} else {

				for (var i = 0; i<res.length; i++) {
					// var department = res[i].department_name;
					var total = res[i].Total;
					if (total===null){
						total=0;
					};

				table.push([res[i].department_name, "$"+total]);
					// console.log(department, total);


						};
					console.log("\r\n"+table.toString());
					supervisorPortal();
		};//end else
	}); //end connection
};//end totalSales


var wholesaleOrderTotal = function(){

	var query = "SELECT products.department_name, SUM(wholesale.wholesale_total) AS Total FROM products LEFT JOIN wholesale on wholesale.item_id=products.item_id LEFT JOIN sales ON sales.item_id=products.item_id GROUP BY products.department_name";

	connection.query(query, function(err, res){

				var table = new Table({
    			head: ['Department', 'Total Wholesale Orders'], colWidths: [25,25]
    				});


				if (err){
					console.log(err);
					//console.log("Product does not exist.");
				} else {

				for (var i = 0; i<res.length; i++) {
					// var department = res[i].department_name;
					var total = res[i].Total;
					if (total===null){
						total=0;
					};

				table.push([res[i].department_name, "$"+total]);
					// console.log(department, total);


						};
					console.log("\r\n"+table.toString());
					supervisorPortal();
		};//end else
	}); //end connection

};//end wholesaleOrderTotal


var departmentSummary = function(){
	var query = "SELECT products.department_name, SUM(wholesale.wholesale_total) AS wholeTotal, SUM(sales.total) AS salesTotal FROM products LEFT JOIN sales ON products.item_id=sales.item_id LEFT JOIN wholesale ON products.item_id=wholesale.item_id GROUP BY products.department_name";

connection.query(query, function(err, res){

				var table = new Table({
    			head: ['Department', 'Total Wholesale Orders', 'Total Retail Orders', 'Net Profit/Loss'], colWidths: [25,25,25,25]
    				});


				if (err){
					console.log(err);
					//console.log("Product does not exist.");
				} else {
					//console.log(res);

				for (var i = 0; i<res.length; i++) {
					// var department = res[i].department_name;
					var wholeTotal = res[i].wholeTotal;
					var salesTotal = res[i].salesTotal;
					if (wholeTotal===null){
						wholeTotal=0;
					};
					if (salesTotal===null){
						salesTotal=0;
					};

					var net = salesTotal-wholeTotal;

				table.push([res[i].department_name, "$"+wholeTotal, "$"+salesTotal, "$"+net]);
					// console.log(department, total);


						};
					console.log("\r\n"+table.toString());
					supervisorPortal();
		};//end else
	}); //end connection

};//end departmentsummary






//createDepartmentList();
module.exports= supervisorPortal; //inital prompt