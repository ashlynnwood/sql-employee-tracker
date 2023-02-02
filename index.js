// require inquirer, logo, db
const inquirer = require('inquirer');
const { init } = require('../13-ORM/01-Activities/04-Stu_Models/Unsolved/models/Book');
const db = require('./db/incex');

init();

// Display logo text, load main prompts
function init() {
  // show logo

  // load the main prompts
}

function loadMainPrompts() {
  // prompt to see what the user wants to do
    // What would you like to do? (list)
        // view all employees, add employee, update employee role, view all roles, add role, view all depts, add dept, quit

        // Bonus: view all employees by manager, view all employees by dept, remove dept, remove role,  remove employee, view total utilized budget by dept, update employee manager 

    // .then that calls the appropriate function depending on what the user chose - use a switch case or if statements

}

// View all employees
function viewEmployees() {
  // goes to the db that you required and uses your find all employees method
  // db.findAllEmployees
      // .then that console.table the results
      // call the prompts again
}

// Update an employee's role
function updateEmployeeRole() {
  // 1. find all employees
  // 2. take that data that comes back and pass into one of your questions- put those employees into an inquirer prompt (answer choices will b e all employees data)
  // set up a variable for the employee that user selects
  // find all roles
  // put those into a inquirer prompt

      // .then - use your update employee method (set up in class), passing in the employee they selected, and the role they chose to assign to them (in that class, use data that's coming in inside prepared statements to interact with the db)
}

// View all roles function

// Add a role
  // find all depts
  // use those in one of your inquirer prompt's quesyions (what dept does the role belong to)
  // .then creates the role with a method from your db class

// View all depts func

// Add a dept func

// Add an employee func
function addEmployee() {
  // What is the employee's first name?
  // What is the employee's last name?
  // What is the employee's role? (list)
      // sales lead, salesperson, lead engineer, software engineer, account manager, account, legal team lead
  // Who is the employee's manager? (list)
      // list of names + none
  // 
  

}

// Exit the application
function quit(){
  console.log("byebye");
  process.exit();
}