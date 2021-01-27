const mongoose = require("mongoose");
const validator = require("validator")

const orderSchema =new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    coffee: {
        type: String,
        required: true
    },
    milk: {
        type: Boolean
    },

    // email: {
    //     type: String,
    //     required: true,
    //     validate(value) {
    //         if (!validator.isEmail(value)) {
    //             throw new Error("invalid E-mail");
    //         }
    //     }
    // },

});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
    Order,
}