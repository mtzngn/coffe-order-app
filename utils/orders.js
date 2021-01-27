const fs = require("fs");
const chalk = require("chalk");
require("../src/db/connection");
const {Order} = require("../src/models/Order")


const addOrder = (customername,myOrder) => {
    const order = new Order({customer: customername, coffee: myOrder})
    order.save()
    
}

const listOrders = async  () => {
    const orders = await Order.find({});
    orders.map((order) => {
        console.log(`\n${order.customer} is having ${order.coffee}`)
    })
};

const removeOrder = async (orderToDelete) => {
    await Order.deleteOne({ customer: `${orderToDelete}` });
    console.log(`\nsuccesfully deleted ${orderToDelete}`)
}
module.exports = {
    addOrder,
    listOrders,
    removeOrder,
}
