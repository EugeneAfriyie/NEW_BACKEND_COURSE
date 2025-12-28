const mongoose = require("mongoose")

const connectToDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.error("MongoDb connection failed ")
        process.exit(1)
    }
}


module.exports = connectToDb;