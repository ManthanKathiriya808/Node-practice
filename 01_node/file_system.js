const fs = require('fs')

fs.readFile('core.js','utf8',(err,data)=>{
    console.log(data)
})


fs.writeFile('./file.txt',"this is it...",(err)=>{
    if(err){
        console.log(err)
    }
})