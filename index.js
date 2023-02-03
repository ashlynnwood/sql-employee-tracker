// Require inquirer, logo, db
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db/index');

init();

// Display logo text, load main prompts
function init() {
  // show logo

  // load the main prompts
  mainPrompt();
}
// Prompt to see what the user wants to do
function mainPrompt() {
    // Bonus: view all employees by manager, view all employees by dept, remove dept, remove role,  remove employee, view total utilized budget by dept, update employee manager 
    inquirer.prompt([
      {
          type: 'list',
          name: 'mainPrompt',
          message: "What would you like to do?",
          choices : ['View All Employees', 'Update Employee Role', 'View Departments', 'Add Employee', 'View All Roles', 'Add Role', 'Add Department', 'Quit']
      }
      // .then that calls the appropriate function depending on what the user chose
  ]).then(answer => {
      switch (answer.mainPrompt) {
          case 'View All Employees':
              viewEmployees()
              break;
          case 'Update Employee Role':
              updateEmployeeRole()
              break;
          case 'Add Employee':
            addEmployee()
              break;
          case 'View Departments':
            viewDepts()
              break;
          case 'Add Department':
            addDept()
              break;
          case 'View All Roles':
            viewRoles()
              break;
          case 'Add Role':
            addRole()
              break;
          default:
              quit()
      }
  })

}

// View all employees
function viewEmployees() {
  // goes to the db that you required and uses your find all employees method
  console.log("View employees table only");
  // db.findAllEmployees
  
      // .then that console.table the results
      console.table(results);
    
      // call the prompts again
      mainPrompt();
};

// Update an employee's role
function updateEmployeeRole() {
  // 1. find all employees
  // 2. take that data that comes back and pass into one of your questions- put those employees into an inquirer prompt (answer choices will be all employees data)
  // set up a variable for the employee that user selects
  // find all roles
  // put those into a inquirer prompt

      // .then - use your update employee method (set up in class), passing in the employee they selected, and the role they chose to assign to them (in that class, use data that's coming in inside prepared statements to interact with the db)
      mainPrompt();
};

// View all roles function
function viewRoles() {

    mainPrompt();
};

// Add a role
function addRole() {
  // find all depts
  // use those in one of your inquirer prompt's quesyions (what dept does the role belong to)
  // .then creates the role with a method from your db class

  mainPrompt();
};

// View all depts func
function viewDepts() {

    mainPrompt();
};

// Add a dept func
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: "What is the name of the Department?"
        },
        
    ]).then(answer => {
        
    })

    mainPrompt();
};

// Add an employee func
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'emRole',
            message: "What is the employee's role?"
            // list?
            // sales lead, salesperson, lead engineer, software engineer, account manager, account, legal team lead
        },
        {
            type: 'input',
            name: 'emManager',
            message: "Who is the employee's manager?"
            // list?
            // list of names + none
        },
    ]).then(answer => {
  
    })
  mainPrompt();

};

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
};



