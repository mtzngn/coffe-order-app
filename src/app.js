const figlet = require('figlet');
var inquirer = require('inquirer');
const { addOrder, removeOrder, listOrders } = require('../utils/orders');
const chalk = require("chalk");

const topLevelQuestion = [
    { type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: ["order", "choose", "list", "cancel", "exit"]}
]

const addQuestion = [
    {type: "input", name:"add", message:"what would you like to order?"}
]
const coffeQuestion = [
    {type: "list", name:"options", message: "Which coffe would you like to get?",
    choices: ["latte", "cappucino", "americano", "espresso", "mocha"]}
]
const removeQuestion = [
    {type: "input", name:"cancel", message:"what would you like to cancel?"}
]

const main = () => {
    console.log(chalk.blue(figlet.textSync("Coffe Order App", {font:'big'})));
    app()
}
const app = async() => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "order") {
        const answer = await inquirer.prompt(addQuestion)
        addOrder(answer.add)
        console.log("Adding a coffe order...")
        app();
    } else if (answers.options == "choose") {
        const answer = await inquirer.prompt(coffeQuestion)
        console.log(`Adding a coffe order... enjoy our ${answer.options}!`)
        addOrder(answer.options)
        app();
    } 
    else if (answers.options == "list") {
        listOrders()
        console.log("listing coffer orders...")
        app();
    } else if (answers.options == "cancel") {
        const answer = await inquirer.prompt(removeQuestion)
        removeOrder(answer.cancel)
        console.log("cancelling a coffe order...")
        app();
    } else if (answers.options == "exit") {
        console.log("see you later...")
    } else {console.log("Invlaid command...")}

}
main()