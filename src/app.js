const figlet = require('figlet');
var inquirer = require('inquirer');
const { addOrder, removeOrder, listOrders } = require('../utils/orders');
const chalk = require("chalk");
require("../src/db/connection");
const {Order} = require("../src/models/Order");


const topLevelQuestion = [
    { type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: ["type your order", "choose from menu", "list", "cancel", "exit"]}
]
const customerQuestion = [
    {type: "input", name:"customer", message:"Please type your name"}
]
const milkQuestion = [
    {type: "confirm", name:"milk", message:"Would you like some milk on the side?"}

]
const addQuestion = [
    {type: "input", name:"add", message:"what would you like to order?"}
]
const coffeQuestion = [
    {type: "list", name:"options", message: "Which coffe would you like to get?",
    choices: ["latte", "cappucino", "americano", "espresso", "mocha"]}
]
const removeQuestion = [
    {type: "input", name:"remove", message:"what would you like to remove?"}
]

const main = () => {
    console.log(chalk.blue(figlet.textSync("Coffe Order App", {font:'big'})));
    app()
}
const app = async() => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "type your order") {
        const customerName = await inquirer.prompt(customerQuestion)
        const answer = await inquirer.prompt(addQuestion)
        addOrder(customerName.customer, answer.add)
        console.log("Adding a coffe order...")
        app();
    } else if (answers.options == "choose from menu") {
        const customerName = await inquirer.prompt(customerQuestion)
        const answer = await inquirer.prompt(coffeQuestion)
        if(answer.options == "espresso" || answer.options == "americano") {
            const addMilk = await inquirer.prompt(milkQuestion)
            addOrder(customerName.customer, answer.options, addMilk.milk)

        } else {
            addOrder(customerName.customer, answer.options)
        }
        console.log(`Adding a coffe order... enjoy our ${answer.options}!`)
        app();
    } 
    else if (answers.options == "list") {
        listOrders()
        console.log("listing coffer orders...")
        app();
    } else if (answers.options == "remove") {
        const answer = await inquirer.prompt(removeQuestion)
        removeOrder(answer.remove)
        console.log("removeling a coffe order...")
        app();
    } else if (answers.options == "exit") {
        console.log("see you later...")
    } else {console.log("Invlaid command...")}

}
main()