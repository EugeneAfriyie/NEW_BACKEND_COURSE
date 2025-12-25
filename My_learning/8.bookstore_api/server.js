    require("dotenv").config();
const express = require("express")
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express()
 const PORT  = process.env.PORT || 5000


//  connect to our database
connectToDB();

// Middleware
app.use(express.json());



// router here
app.use("/api/books" , bookRoutes)

app.listen(PORT, () =>{
    console.log("Server is running at port "  , PORT)
})