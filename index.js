const http=require('http');
const app=require("./src/config/express.config")
const {Server}=require("socket.io")
const server=http.createServer(app)
//     (request,response)=>{
//     // console.log(request)
// //response.end("Hello world")
// });

//127.0.0.1, ::1
const io=new Server(server)

io.emit("event",{})
io.on("connection",(socket)=>{
    //socket
})
server.listen(process.env.PORT || 80,(err)=>{
    if(!err){
        console.log("Server is runnning on port 443/80")
        console.log("Press CTRL+C to disconnect your server")
        console.log("User http://localhost:3005/ to browse your server")
    }
})
