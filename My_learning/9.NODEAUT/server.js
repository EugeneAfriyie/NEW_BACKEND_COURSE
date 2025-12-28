require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth_routes")

const app = express()
const PORT = process.env.PORT || 5000



// middleware
app.use(express.json());

// connect db 
connectToDb();

app.use("/api/auth",authRoutes)




app.listen(PORT, () => {
    console.log("Server is running On Port", PORT)
})