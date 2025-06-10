const http = require("http")
const fs = require("fs")

const port = 7000;

const handleRequest = (req,res) =>{

    let filename = ""

    switch(req.url){
        case '/' : filename = "./index.html"
        break;
        case '/contact' : filename = "./contact.html"
        break;
        case '/about' : filename = "./about.html"
        break;
    }

    fs.readFile(filename,(err,result)=>{
        res.end(result)
    })
}


const server = http.createServer(handleRequest)

server.listen(port,(err)=>{
    if(err){
         console.log("server is not running...")
         return false
    }

    console.log("server is runing at port : " + port)

})