const cors = require('cors')
const app = require('express')()
app.use(cors())
//imports
const httpServer = require('http').createServer(app) 
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*"
      }
})

io.on('connect', (socket) => {
  socket.on('sendMsg', data => {
    //need to emit back a response to all in the gc, for now will just emit to all
    io.emit('showMsg', data)
  })
})


httpServer.listen(process.env.PORT)

//import routers
const authRouter = require('./Routes/authRoutes')
const contactsRouter = require('./Routes/contactRoutes')
const chatsRouter = require('./Routes/chatRoutes')
const messageRouter = require('./Routes/messageRouter')


//connect to DB
mongoose.connect(process.env.URI)

//Global middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())






//routes
app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter)
app.use("/api/chats", chatsRouter)
app.use("/api/messages", messageRouter)

module.exports = app