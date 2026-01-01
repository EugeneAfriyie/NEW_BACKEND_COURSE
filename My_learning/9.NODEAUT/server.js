require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth_routes")
const homeRoutes = require("./routes/homeRoute")
const adminRoutes = require("./routes/adminRoutes")
const {uploadImageRoutes} = require("./routes/imageRoutes")

const app = express()
const PORT = process.env.PORT || 5000



// middleware
app.use(express.json());

// connect db 
connectToDb();

app.use("/api/auth",authRoutes)
app.use("/api/home",homeRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/image",uploadImageRoutes)




app.listen(PORT, () => {
    console.log("Server is running On Port", PORT)
})