 const express = require("express")
 const http = require("http")

 const socketio = require("socket.io")
const { init } = require("../10.Mongodb Intermediate/models/Product")
const { set } = require("mongoose")

 const app = express()
 const server = http.createServer(app)

//  initiate socket io
 const io = socketio(server)
 app.use(express.json())

 app.use(express.static("public"))

 const users = new Set()
    io.on("connection", (socket) =>{
        console.log("New client connected", socket.id) 

        // HANDLE http.IncomingMessage

    })

    const PORT = process.env.PORT || 3000