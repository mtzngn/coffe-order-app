const fs = require("fs");
const chalk = require("chalk");
require("../src/db/connection");
const {Order} = require("../src/models/Order")


const addOrder = (customername,myOrder, myMilk) => {
    console.log(myMilk)
    const order = new Order({customer: customername, coffee: myOrder, milk: myMilk})
    order.save()
    
}

const listOrders = async  () => {
    const orders = await Order.find({});
    orders.map((order) => {
        console.log(chalk.green(`\n${order.customer} is having ${order.coffee}`))
    })
};

const removeOrder = async (orderToDelete) => {
    await Order.deleteOne({ customer: `${orderToDelete}` });
    console.log(chalk.red(`\nsuccesfully deleted ${orderToDelete}'s order`))
}
module.exports = {
    addOrder,
    listOrders,
    removeOrder,
}
