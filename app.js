const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { create } = require("domain");

let role = "manager";
let newEmployee = "";
const employees = [];

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
]

const managerQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        // The users input must be numeric
        validate: val => /^\d+$/.test(val)
    }
]

const engineerQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "github",
        message: "What is your engineer's github username?",
    }
]

const internQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        // The users input must be alphabetic
        validate: val => /^[A-Za-z\s]+$/.test(val)
    }
]

const selectEmployeeType = [
    {
        type: "list",
        name: "add",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
        ]
    }
]

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
    inquirer.prompt(managerQuestions).then(function (data) {
        newEmployee = new Manager(data.name, data.id, data.email, data.officeNumber)
        employees.push(newEmployee);
        NewEmployee();
    })

}

// function to create new Emgineer
function newEngineer() {
    role = "Engineer";
    inquirer.prompt(engineerQuestions).then(function (data) {
        newEmployee = new Engineer(data.name, data.id, data.email, data.github)
        employees.push(newEmployee);
        NewEmployee();
    })
}

// function to create new Intern
function newIntern() {
    role = "Intern";
    inquirer.prompt(internQuestions).then(function (data) {
        newEmployee = new Intern(data.name, data.id, data.email, data.school)
        employees.push(newEmployee);
        NewEmployee();
    })
}

// function to define Employee type
function NewEmployee() {
    inquirer.prompt(selectEmployeeType).then(function (data) {
        switch (data.add) {
            case "Engineer":
                newEngineer();
                break;
            case "Intern":
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