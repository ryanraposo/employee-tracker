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


function addDepartment(name) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [name];

    db.query(sql, params, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Success! Added department: ${name}`);
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


function addRole(title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [title, salary, department_id];

    db.query(sql, params, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Success! Added role: ${title}`);
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


function addEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [first_name, last_name, role_id, manager_id];

    db.query(sql, params, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Success! Added employee: ${first_name} ${last_name}`);
    });
};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});
