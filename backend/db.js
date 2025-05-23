const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useNewUrlParser:true,
        });
        console.log("✅ MongoDB Connected!");
    }catch(error){
        console.log("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
module.exports = connectDB;