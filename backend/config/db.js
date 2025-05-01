const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
        process.exit(1);
    }
}

module.exports = connectDB;