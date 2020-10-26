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

let role = "manager";
let newEmployee = "";
const employees = [];

employeeQuestions = [
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

managerQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        // The users input must be numeric
        validate: val => /^\d+$/.test(val)
    }
]

engineerQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "github",
        message: "What is your engineer's github username?",
    }
]

internQuestions = [
    ...employeeQuestions,
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        // The users input must be alphabetic
        validate: val => /^[A-Za-z\s]+$/.test(val)
    }
]

selectEmployeeType = [
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

function newManager() {
    inquirer.prompt(managerQuestions).then(function (data) {
        newEmployee = new Manager(data.name, data.id, data.email, data.officeNumber)
        employees.push(newEmployee);
        NewEmployee();
    })

}

function newEngineer() {
    role = "Engineer";
    inquirer.prompt(engineerQuestions).then(function (data) {
        newEmployee = new Engineer(data.name, data.id, data.email, data.github)
        employees.push(newEmployee);
        NewEmployee();
    })
}

function newIntern() {
    //role = "Intern";
    inquirer.prompt(internQuestions).then(function (data) {
        newEmployee = new Intern(data.name, data.id, data.email, data.school)
        employees.push(newEmployee);
        NewEmployee();
    })
}

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
                render(employees);
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
