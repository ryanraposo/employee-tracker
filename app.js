const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


function promptAddDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a name: (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the department!');
                    return false;
                }
            }
        }
    ])
}


function promptAddRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a title: (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter a title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter a salary: (Required)',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter a salary!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter a department ID: (Required)',
            validate: departmentIdInput => {
                if (departmentIdInput) {
                    return true;
                } else {
                    console.log('Please enter a department ID!');
                    return false;
                }
            }
        }
    ]);
}


function promptAddEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter a first name: (Required)',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter a last name: (Required)',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter a role ID: (Required)',
            validate: roleIdInput => {
                if (roleIdInput) {
                    return true;
                } else {
                    console.log('Please enter a role ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter a manager ID:',
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log('Please enter a manager ID!');
                    return false;
                }
            }
        }
    ]);
}


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
                'Update an employee'
            ]
        }
    ])
};


function promptUpdateEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: `Enter the employee's ID: (Required)`
        },
        {
            type: 'input',
            name: 'roleId',
            message: `Enter the employee's new role ID: (Required)`
        }
    ]);
}

//  Departments
function viewAllDepartments() {
    const sql = `SELECT * FROM departments;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('\n')
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
        console.log('\n')
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
        console.log('\n')
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
    });
};


function updateEmployee(employeeId, roleId) {
    const sql = `UPDATE employees 
                 SET role_id = ?
                 WHERE id = ?`;
    const params = [roleId, employeeId];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
}


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});


async function main() {
    const { action } = await promptAction();

    switch (action) {
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            const department = await promptAddDepartment();
            addDepartment(department.name);
            break;
        case 'Add a role':
            const role = await promptAddRole();
            addRole(role.title, role.salary, role.department_id);
            break;
        case 'Add an employee':
            const employee = await promptAddEmployee();
            addEmployee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id);
            break;
        case 'Update an employee':
            const response = await promptUpdateEmployee();
            updateEmployee(response.employeeId, response.roleId);
            break;
    };

    main();
};

main();

