const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true, useNewUrlParser: true })
        // console.log("\nsuccesfull connection")

    } catch (error) {
        console.log(error)
    }
}
connection();