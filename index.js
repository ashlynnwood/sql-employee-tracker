// Require inquirer, db, console table
const inquirer = require('inquirer');
const db = require('./db/index');
require('console.table');

// Initialize app
init();

function init() {
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
      // .then to call the appropriate function depending on what the user chose
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
  // goes to the db required and uses find all employees method
    const results = await db.findAllEmployees()
       console.table(results);
       // .catch(err =>console.error(err));
    
    // call the prompts again
    mainPrompt();
};

// Update an employee's role
async function updateEmployeeRole() {
  // 1. find all employees
  let employees = await db.findAllEmployees();
  // 2. take that data that comes back and pass into question- put those employees into inquirer prompt (answer choices will be all employees data)
  
  // find all roles
  let roles = await db.findAllRoles();
    // remove duplicates
  let uniqueRoles = Array.from(new Set(roles))
  
  // put those into a inquirer prompt
  inquirer.prompt([
    {
       type: 'list',
       name: 'upRole',
       message: `Which employee's role do you want to update?` ,
       choices: employees.map((employee) => {
        // return dept info as array of objects
        // user sees name as answer choices but inquirer records value 
        return {
            name: employee.first_name + ' ' + employee.last_name, 
            value: employee.id
        }
    })
    },
    {
       type: 'list',
       name: 'updateRole',
       message: `Which role do you want to assign to the selected employee?`,
       choices: uniqueRoles.map((role) => {
        // return role info as array of objects
        // user sees title as answer choices but inquirer records value 
        return {
            name: role.title, 
            value: role.id
        }
    })
    },
  ]).then(async answer => {
      // set up a variable for the employee that user selects
       const employee = { id: parseInt(answer.upRole) }; 
       const results = await db.updateEmployee(employee, answer.updateRole);
        // .then - use update employee method passing in the employee user selected and role user chose to assign to them (in that class, use data that's coming in inside prepared statements to interact with the db)
        if (results) {
          console.log(`Updated employee's role.`)
        }

      mainPrompt();
    });
      
};

// View all roles function
async function viewRoles() {
    // goes to the db and uses find all roles method
    const results = await db.findAllRoles();
    console.table(results);
    // .catch(err =>console.error(err));

    // call the prompts again
    mainPrompt();
};

// Add a role
async function addRole() {
  // use method to find all depts
  // use in inquirer prompt questions (what dept does the role belong to)
  let depts = await db.findAllDepts();
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
        // map over departments
        choices: depts.map((dept) => {
            // return dept info as array of objects
            // user sees name as answer choices but inquirer records value 
            return {
                name: dept.name, 
                value: dept.id
            }
        })
    },
  ]).then(async answer => {
    // .then creates the role with method from db class
    const results = await db.createRole(answer.newRole, answer.newSalary, answer.roleDept);
        // make sure it worked
        if (results) {
           console.log(`Added ${answer.newRole} to the database.`);
        };

    // call main prompts here so it doesn't get called too early
    mainPrompt();
    });

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
    // get all roles
    let roles = await db.findAllRoles();
    // get all employees
    let employees = await db.findAllEmployees();
    // set employee list to empty array
    let employeeList = [];
    // create array to include all employess + null option
    employees.map((employee) => {
        employeeList.push ({
            name: employee.first_name + ' ' + employee.last_name, 
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
            // map over all roles
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
        // actually add the employee to db
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

