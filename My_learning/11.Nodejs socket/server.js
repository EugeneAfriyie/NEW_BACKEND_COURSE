 const { Socket } = require("dgram")
const express = require("express")
 const http = require("http")

 const socketio = require("socket.io")


 const app = express()
 const server = http.createServer(app)

//  initiate socket io  NAD ATTACH TO THE HTTP SERVER
 const io = socketio(server)
 app.use(express.json())

 app.use(express.static("public"))

 const users = new Set()
    io.on("connection", (socket) =>{
        console.log("New client connected", socket.id) 

            // handle us er when they will join the chat room
            socket.on("join", (userName) =>{
                users.add(userName)
                socket.userName = userName

                // Broadcast to all client/users that new user has join

                io.emit("userJoin",userName)


                // send the updated user list to all users

                io.emit("userList",Array.from(users))
            })


            // handle incoming chat messages
            socket.on("chatMessage", (message) =>{
                // broadcast he recent message to all users
                io.emit("chatMessage", message)
            })


            // handle user disconnection

            socket.on("disconnect", () =>{
              console.log("User id disconnected", socket.id)

              users.forEach(user => {
                if(user === socket.userName){
                    users.delete(user)

                    io.emit("userLeft", user)

                    // send the updated user list to all users
                    io.emit("userList", Array.from(users))
                }

              });
              })

                







    })

    const PORT = process.env.PORT || 3000

    server.listen(PORT, () =>{
        console.log("Server is runnig on port " + PORT)
    })