const connection = require('./connection');

class DB {
  // Keeping a reference to the connection on the class in case need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    // prepared statement for finding all employees
  }

  // Create a new employee
  createEmployee(employee) {
    // prepared statement
    // add to DB
  }

  // sql commands/prepared statements

  // updating an employee role

  // finding all roles

  // creating a new role

  // finding all depts

  // creating a new dept



}

module.exports = new DB(connection);