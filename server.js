require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the company_db database.`)
);

const mainMenuOptions = [
  {
    type: "list",
    name: "mainMenuList",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  },
];

function mainMenu() {
  inquirer.prompt(mainMenuOptions).then((res) => {
    switch (res.mainMenuList) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRoles();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmpRole();
        break;
    }
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, results) {
    console.table(results);
    mainMenu();
  });
}

function viewEmployees() {
    db.query(`SELECT * FROM employees`, function (err, results) {
        console.table(results);
        mainMenu();
    })
}

mainMenu();
