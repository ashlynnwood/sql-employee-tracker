const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees'
  },
  console.log(`Connected to the employees database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;