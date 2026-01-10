 const express = require("express")
 const http = require("http")

 const socketio = require("socket.io")


 const app = express()
 const server = http.createServer(app)

//  initiate socket io
 const io = socketio(server)
 app.use(express.json())

 app.use(express.static("public"))

 const users = new Set()
    io.on("connection", (socket) =>{
        console.log("New client connected", socket.id) 

            // handle us er when they will join the chat room
            socket.on("join", (userName) =>{
                users.add(userName)

                // Broadcast to all client/users that new user has join

                io.emit("userJoin",userName)


                // send the updated user list to all users

                oi.emit("userList",Array.from(users))
            })


            // handle incoming chat messages


            // handle user disconnection







    })

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () =>{
        console.log("Server is runnig on port " + PORT)
    })