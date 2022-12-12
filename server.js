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

// array to pass to inquirer prompt for main menu
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

// Main menu for CLI
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

// views departments in the database
function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
    mainMenu();
  });
}

// views roles in the database
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
// views employees in the database
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
// adds department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What department would you like to add?",
      },
    ])
    .then((deptAnswer) => {
      db.query(`INSERT INTO departments (name)
        VALUES ('${deptAnswer.deptName}')`);
        mainMenu();
    });
}


// enter the name, salary, and department for the role and that role is added to the database
function addRoles() {
    db.query(`SELECT * FROM departments`, function (err, results) {
    var departmentList = results.map(departments => departments.id)
    console.log(departmentList)
    inquirer
    .prompt([
        {
            type: "input",
            name: "roleAddInput",
            message: "What role would you like to add?",  
        },
        {
            type: "input",
            name: "roleSalaryInput",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "deptRoleList",
            message: "To which department will this role be added?",
            choices: departmentList
        },
    ])
    .then((responses) => {
        db.query(`INSERT INTO roles (title, salary, department_id)
        VALUES ('${responses.roleAddInput}', '${responses.roleSalaryInput}', '${responses.deptRoleList}')`);
    })
})
// .then((deptAnswer) => {
//     db.query(`INSERT INTO departments (name)
//       VALUES ('${deptAnswer.deptName}')`);
}

function addEmployee() {

}

function updateEmpRole() {
    
}

mainMenu();
