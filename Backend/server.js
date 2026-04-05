import express from "express"
import { createServer, get } from "http"
import { Server } from "socket.io"
import { YSocketIO } from "y-socket.io/dist/server"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create an Express application
// This will be used to handle HTTP requests and serve any necessary files
const app = express()
app.use(express.static("../Frontend/dist"))
const httpServer = createServer(app)

const io = new Server(httpServer,{ // io === ??
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
}

)
// 

const ySocketIO = new YSocketIO(io)
ySocketIO.initialize() 
// this is for the 



app.use((req, res) => {
    res.sendFile("index.html", { root: __dirname + "/../Frontend/dist" })
})
app.get('/health',(req, res)=>{
    res.status(200).json({
        message:"ok",
        success:true
    })
})


httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})