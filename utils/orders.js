const fs = require("fs");
const chalk = require("chalk");
require("../src/db/connection");
const {Order} = require("../src/models/Order")


const addOrder = (customername,myOrder) => {
    const order = new Order({customer: customername, coffee: myOrder, milk: false})
    order.save()
    
}

const loadOrders = () =>{
    try {
        const dataBuffer = fs.readFileSync("src/orders.json");
        const ordersJson  = dataBuffer.toString();
        return JSON.parse(ordersJson);
    } catch (error){
        return [];
    }
};

const saveOrders = allOrders => {
    const ordersJson = JSON.stringify(allOrders);
    fs.writeFileSync("src/orders.json", ordersJson);
}

const listOrders = () => {
    const allOrders = loadOrders();
    allOrders.map((order,i) =>{
        console.log(chalk.red(`${i + 1}. ${order.order}\n`));
    });
};


const removeOrder = orderToDelete => {
    const allOrders = loadOrders();

    try {
        const removedItem = allOrders.splice(orderToDelete - 1, 1);
        console.log(`Succesfully removed ${removedItem[0].order}`)
    } catch (error) {
        console.log("Number out of range, probably.")
    }
    saveOrders(allOrders);
}
module.exports = {
    addOrder,
    listOrders,
    removeOrder,
}
