const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Create empty array which will contain all employee objects for render function
let employeeArr = [];

//Create three arrays of questions for each instance

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your managers name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is your managers ID number?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your managers email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your managers office number?",
  },
  {
    type: "list",
    name: "employees",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your engineers name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is your engineers ID number?",
  },
  {
    type: "input",
    name: "email",
    message: "What is engineers email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your engineers github username?",
  },

  {
    type: "list",
    name: "employees",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your interns name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is your interns ID number?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your interns email address?",
  },
  {
    type: "input",
    name: "school",
    message: "What is your interns school?",
  },
  {
    type: "list",
    name: "employees",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];

//Inquirer prompt manager questions, then use callback function to loop over new employees
inquirer.prompt(managerQuestions).then((data) => {
  //Instantiate new manager
  const manObj = new Manager(data.name, data.id, data.email, data.officeNumber);
  //Push manager object to employee array
  employeeArr.push(manObj);
  //Create new variable that will dictate what kind of employee the user wants to create
  let newEmployee = data.employees;
  //Creates function that will create all engineer/intern objects and then writes new html file
  function getData(newEmployee) {
    //Conditional that will create a new engineer or intern depending on user input and push to employee array
    if (newEmployee === "Engineer") {
      inquirer.prompt(engineerQuestions).then((data) => {
        let newEmployee = data.employees;
        let engObj = new Engineer(data.name, data.id, data.email, data.github);
        employeeArr.push(engObj);
        getData(newEmployee);
      });
    } else if (newEmployee === "Intern") {
      inquirer.prompt(internQuestions).then((data) => {
        let newEmployee = data.employees;
        let intObj = new Intern(data.name, data.id, data.email, data.school);
        employeeArr.push(intObj);
        getData(newEmployee);
      });
    } else {
      console.log(employeeArr);
      //Once no new employees need to be created, html file is generated and passed through render function
      fs.writeFile(outputPath, render(employeeArr), (err) => {
        if (err) {
          return console.log(err);
        }
      });
    }
  }

  getData(newEmployee);
});
