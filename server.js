const mysql = require('mysql2');
const inquirer = require('express');
const consoleTable = require('console.table');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'process.env.DB_USER',
        password: 'process.env.DB_PASSWORD',
        database: 'process.env.DB_NAME'
    },
    console.log(`Connected to the company_db database.`)
);



const mainMenuOptions = [
    {
        type: 'list',
        name: 'mainMenuList',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    },
];

