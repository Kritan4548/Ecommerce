const http=require('http');
const app=require("./src/config/express.config")
const server=http.createServer(app)
//     (request,response)=>{
//     // console.log(request)
// //response.end("Hello world")
// });

//127.0.0.1, ::1

server.listen('3005','localhost',(err)=>{
    if(!err){
        console.log("Server is runnning on port 3005")
        console.log("Press CTRL+C to disconnect your server")
        console.log("User http://localhost:3005/ to browse your server")
    }
})
