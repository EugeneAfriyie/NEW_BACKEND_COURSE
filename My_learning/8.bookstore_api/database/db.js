const mongoose = require("mongoose")

const connectToDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://groupeight00_db_user:I3XokqlQllR34ASt@cluster0.jqta10v.mongodb.net/")
        console.log("MongoDb connected sucessfully")
        
    } catch (error) {
        console.error("MongoDb connection  failed " , error)
        process.exit(1)
    }
}

module.exports = connectToDB