
const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");

        
    } catch(err){
        console.error("MongoDb connection failed:",err.message);
        process.exitO(1);
    }
};

module.exports = connectDB;
