const inquirer = require('inquirer');
const db = require('./db/connection');

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

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});