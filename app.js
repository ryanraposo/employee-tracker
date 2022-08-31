const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

function promptAction() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]);
};

//  Departments
function viewAllDepartments() {
    const sql = `SELECT * FROM departments;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
};

// Roles
function viewAllRoles() {
    const sql = `SELECT * FROM roles;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
};

// Employees
function viewAllEmployees() {
    const sql = `SELECT * FROM employees;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
};


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});
