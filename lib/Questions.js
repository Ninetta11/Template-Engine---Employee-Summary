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
        ],
        filter: function (val) {
            return role = val.toLowerCase();
        }
    }
]

module.exports = [selectEmployeeType, managerQuestions, internQuestions, engineerQuestions];