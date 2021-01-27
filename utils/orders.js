const fs = require("fs");
const chalk = require("chalk");
require("../src/db/connection");
const {Order} = require("../src/models/Order")


const addOrder = (customername,myOrder) => {
    const order = new Order({customer: customername, coffee: myOrder})
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


const listOrders = async  () => {
    const orders = await Order.find({});
    orders.map((order) => {
        console.log(`\n${order.customer} is having ${order.coffee}`)
    })
};


const removeOrder = orderToDelete => {
    const allOrders = loadOrders();

    try {
        const removedItem = allOrders.splice(orderToDelete - 1, 1);
        console.log(`Succesfully removed ${removedItem[0].order}`)
    } catch (error) {
        console.log("Number out of range, probably.")
    }
}
module.exports = {
    addOrder,
    listOrders,
    removeOrder,
}
