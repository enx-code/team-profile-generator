const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamMembers = [];

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Please choose the role of the team member:",
      choices: ["Manager", "Engineer", "Intern", "Finish building the team"],
    },
    {
      type: "input",
      name: "name",
      message: "Enter the team member's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the team member's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the team member's email:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
      when: (answers) => answers.role === "Manager",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's GitHub username:",
      when: (answers) => answers.role === "Engineer",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
      when: (answers) => answers.role === "Intern",
    },
  ]);
};
const init = async () => {
  console.log("Welcome to the Team Profile Generator!");
  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }
  while (true) {
    const answers = await promptUser();
    console.log(answers);
    switch (answers.role) {
      case "Manager":
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        teamMembers.push(manager);
        break;
      case "Engineer":
        const engineer = new Engineer(
            answers.name, answers.id, answers.email, answers.github
        )
        teamMembers.push(engineer);
        break;
      case "Intern":
        const intern = new Intern (
            answers.name, answers.id, answers.email, answers.school
        );
        teamMembers.push(intern);
        break;
      case "Finish building the team":
        const html = render(teamMembers);
        fs.writeFileSync(outputPath, html)
        console.log(`Team profile generated successfully at ${outputPath}`);
        return;
    }
  }
};

init();
