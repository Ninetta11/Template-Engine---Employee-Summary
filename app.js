const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const { create } = require("domain");

let newEmployee = "";
const employees = [];

// questions for all new employee types
const constructEmployeeQuestions = (role) => {
    const employeeQuestions = [
        {
            type: "input",
            message: `What is your ${role}'s name?`,
            name: "name",
            // The users input must be alphabetic
            validate: val => /^[A-Za-z\s]+$/.test(val)
        },
        {
            type: "input",
            message: `What is your ${role}'s id?`,
            name: "id",
            // The users input must be numeric
            validate: val => /^\d+$/.test(val)
        },
        {
            type: "input",
            message: `What is your ${role}'s email address?`,
            name: "email",
            // The users input must be an email address
            validate: val => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val)
        }
    ];
    return employeeQuestions;
}

// function to write data to team.html
function writeToFile() {
    let team = render(employees);
    fs.writeFile(outputPath, team, function (error) {
        if (error) {
            return console.log(error)
        }
        console.log('success')
    });
}

// function to create new Manager
function newManager() {
    const role = "manager";
    // questions for adding new Manager
    const managerQuestions = [
        ...constructEmployeeQuestions(role),
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
            // The users input must be numeric
            validate: val => /^\d+$/.test(val)
        }
    ];
    // prompts for adding new Manager
    inquirer.prompt(managerQuestions).then(function (data) {
        newEmployee = new Manager(data.name, data.id, data.email, data.officeNumber)
        employees.push(newEmployee);
        NewEmployee();
    })
}

// function to create new Emgineer
function newEngineer() {
    const role = "engineer";
    // questions for adding new Engineer
    const engineerQuestions = [
        ...constructEmployeeQuestions(role),
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github username?",
        }
    ];
    // prompts for adding new Engineer
    inquirer.prompt(engineerQuestions).then(function (data) {
        newEmployee = new Engineer(data.name, data.id, data.email, data.github)
        employees.push(newEmployee);
        NewEmployee();
    })
}

// function to create new Intern
function newIntern() {
    const role = "intern";
    // questions for adding new Intern
    const internQuestions = [
        ...constructEmployeeQuestions(role),
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
            // The users input must be alphabetic
            validate: val => /^[A-Za-z\s]+$/.test(val)
        }
    ];
    // prompts for adding new Intern
    inquirer.prompt(internQuestions).then(function (data) {
        newEmployee = new Intern(data.name, data.id, data.email, data.school)
        employees.push(newEmployee);
        NewEmployee();
    })
}

// function to define Employee type
function NewEmployee() {
    // question & options for selecting new employee type
    const selectEmployeeType = [
        {
            type: "list",
            name: "add",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ],
            filter: function (val) {
                return role = val.toLowerCase();
            }
        }
    ];
    // prompt for selecting new employee type
    inquirer.prompt(selectEmployeeType).then(function (data) {
        switch (data.add) {
            case "engineer":
                newEngineer();
                break;
            case "intern":
                newIntern();
                break;
            default:
                writeToFile();
                break;
        }
    })
}

// function to initialize program
function init() {
    console.log("Please build your team");
    newManager();
}

// function call to initialize program
init();