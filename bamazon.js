var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");
var inquirer = require("inquirer");
var connection = require("./connection.js");
var customerPortal = require('./bamazonCustomer.js');
var managerPortal = require('./bamazonManager.js');
var supervisorPortal = require('./bamazonSupervisor.js');



var promptRole = function(){

inquirer.prompt([
      {
 		type: 'list',
        name: "task",
        message: colors.yellow("Please choose:"),
        choices: ["I am a Customer", "I am a Manager", "I am a Supervisor"]
      },
]).then(function(answers) {
	  	var type=answers.task;

	  	switch(type){

     //basic card
      	case "I am a Customer":
			 customerPortal();
		break;
		case "I am a Manager":
			managerPortal();
		break;
		case "I am a Supervisor":
			// console.log("This functionality is coming soon.");
			supervisorPortal();
		break;

		default:
        return false;

		};

	});

};//end promptTask

promptRole();



