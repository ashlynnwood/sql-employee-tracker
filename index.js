// Require inquirer, logo, db
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db/index');
require('console.table');

init();

// Display logo text, load main prompts
function init() {
  // show logo

  // load the main prompts
  mainPrompt();
};

// Prompt to see what the user wants to do
function mainPrompt() {
    inquirer.prompt([
      {
          type: 'list',
          name: 'mainPrompt',
          message: "What would you like to do?",
          choices: ['View All Employees', 'Update Employee Role', 'View Departments', 'Add Employee', 'View All Roles', 'Add Role', 'Add Department', 'Quit']
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
  });

};

// View all employees
async function viewEmployees() {
  // goes to the db that you required and uses find all employees method
    const results = await db.findAllEmployees()
       //.then that console.table the results
    //    .then(results => )
       console.table(results);
    //    .catch(err =>console.error(err));
    
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
  inquirer.prompt([
    {
       type: 'list',
       name: 'newRole',
       message: `Which employee's role do you want to update?` ,
       choices: ["employee name list"]
    },
    {
       type: 'list',
       name: 'updateRole',
       message: `Which role do you want to assign to the selected employee?` ,
       choices: ["role list"]
    },
  ]).then(answers => {
        // .then - use your update employee method (set up in class), passing in the employee they selected, and the role they chose to assign to them (in that class, use data that's coming in inside prepared statements to interact with the db)

        console.log(`Updated ${employee.name}'s role.`)
    });
      mainPrompt();
};

// View all roles function
async function viewRoles() {
    // goes to the db and uses find all roles method
    const results = await db.findAllRoles()
    console.table(results);
    // .catch(err =>console.error(err));

    // call the prompts again
    mainPrompt();
};

// Add a role
async function addRole() {
  // find all depts
  // use those in one of your inquirer prompt's questions (what dept does the role belong to)
  var depts = await db.findAllDepts();
  inquirer.prompt([
    {
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'roleDept',
        message: 'Which department does the role belong to?',
        choices: depts.map((dept) => {
            return {
                name: dept.name, 
                value: dept.id
            }
        })
    },
  ]).then(async answer => {
    // .then creates the role with a method from your db class
    const results = await db.createRole(answer.newRole, answer.newSalary, answer.roleDept);

    if (results) {
        console.log(`Added ${answer.newRole} to the database.`);
        };

    mainPrompt();
    })

  
};

// View all depts func
async function viewDepts() {
    // goes to the db and uses find all depts method
    const results = await db.findAllDepts()
    console.table(results);
    //.catch(err =>console.error(err));

// call the prompts again
    mainPrompt();
};

// Add a dept func
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: "What is the name of the department?"
        },
        
    ]).then(async answer => {
        const results = await db.createDept(answer.newDept)
        if (results) {
          console.log(`${answer.newDept} added to Departments.`)
        }
        mainPrompt();
    })


};

// Add an employee func
async function addEmployee() {
    var roles = await db.findAllRoles();
    var employees = await db.findAllEmployees();

    let employeeList = [];

    employees.map((employee) => {
        employeeList.push ({
            name: employee.first_name + employee.last_name, 
            value: employee.id
        })
    })
    employeeList.push({
        name: 'None', value: null,
    })
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
            type: 'list',
            name: 'emRole',
            message: "What is the employee's role?",
            choices: roles.map((role) => {
                return {
                    name: role.title, 
                    value: role.id
                }
            })
        },
        {
            type: 'list',
            name: 'emManager',
            message: "Who is the employee's manager?",
            choices: employeeList,
           
        },
    ]).then( async answer => {
        const results = await db.createEmployee(answer.firstName, answer.lastName, answer.emRole, answer.emManager)

        if (results) {
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database.`)
        }
        mainPrompt();
    })
  

};

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
};



// Bonus: view all employees by manager, view all employees by dept, remove dept, remove role,  remove employee, view total utilized budget by dept, update employee manager 