const connection = require('./connection');

class DB {
  // Keeping a reference to the connection on the class in case need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    // prepared statement for finding all employees
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee 
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      ORDER BY employee.id`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
    };

  // Create a new employee
  createEmployee(employee) {
    // prepared statement
    // add to DB
  };

  // sql commands/prepared statements

  // updating an employee role



  // finding all roles
  findAllRoles() {
    // prepared statement for finding all roles
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT ...`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
  };

  // creating a new role
  createRole(role) {

  };

  // finding all depts
  findAllDepts() {
    // prepared statement for finding all departments
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM department`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
  };

  // creating a new dept
  createDept(department) {

  };



};

module.exports = new DB(connection);