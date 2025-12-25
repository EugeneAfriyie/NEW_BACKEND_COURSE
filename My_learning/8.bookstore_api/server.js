    require("dotenv").config();
const express = require("express")
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express()
const PORT  = process.env.PORT || 5000




// Middleware
app.use(express.json());

// router here
app.use("/api/books" , bookRoutes)

async function startServer() {
    try {
        await connectToDB();  // Await the database connection
        app.listen(PORT, () => console.log("Server is running at port ", PORT));
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}
startServer();