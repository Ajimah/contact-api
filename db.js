const mongoose = require('mongoose');
const dotenv = require ("dotenv")

dotenv.config();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: , ${conn.connection.name}`);
    } catch (error) {
        console.error(`error connecting to MongoDB: ${error.message}`);
        process.exit(1);

    }
}

module.exports = connectDB;