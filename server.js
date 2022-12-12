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
// job title, role id, department that role belongs to, salary for that role
function viewRoles() {
  db.query(
    `
  SELECT
  roles.title AS 'Job Title',
  roles.id AS 'Role ID',
  departments.name AS "Department Name",
  roles.salary AS 'Salary'
  FROM roles
  LEFT JOIN departments
      ON roles.department_id = departments.id
  `,
    function (err, results) {
      console.table(results);
      mainMenu();
    }
  );
}
// employee id, first name, last name, job title, department, salary, manager
function viewEmployees() {
  db.query(
    `
    SELECT
    employees.id AS 'Employee ID',
    employees.first_name AS "First Name",
    employees.last_name AS "Last Name",
    roles.title AS "Job Title",
    departments.name AS "Department",
    roles.salary AS "Salary",
    employees.manager_id AS "Manager"
    FROM employees
    LEFT JOIN roles
        ON roles.id = employees.role_id
    LEFT JOIN departments
        ON departments.id = roles.department_id
    `,
    function (err, results) {
      console.table(results);
      mainMenu();
    }
  );
}

function addDepartment() {
  db.query(`INSERT INTO departments`);
}

mainMenu();
