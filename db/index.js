const connection = require('./connection');

class DB {
  // Keeping a reference to the connection on the class
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
  createEmployee(first_name, last_name, role_id, manager_id) {
    // prepared statement
    // add to DB
    return new Promise((resolve, reject) => {
      this.connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
  };


  // updating an employee role
    // updateEmployee();


  // finding all roles
  findAllRoles() {
    // prepared statement for finding all roles
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT role.id, role.title, role.salary, department.name FROM role
      LEFT JOIN department ON role.department_id = department.id`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
  };

  // creating a new role
  createRole(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
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
    return new Promise((resolve, reject) => {
      this.connection.query(`INSERT INTO department (name) VALUES ("${department}")`, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        });
      });
    };


};

module.exports = new DB(connection);