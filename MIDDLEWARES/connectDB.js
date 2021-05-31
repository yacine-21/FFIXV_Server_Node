const mongoose            = require("mongoose");

const mongoDB = () => {
    mongoose.connect(
        process.env.DB_CONNECT,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },console.log("CONNECTED TO DB"));

}

module.exports = mongoDB;