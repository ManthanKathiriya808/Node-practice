const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/multer")


let db = mongoose.connection

db.on("connected",(err)=>{
    if(err){
              console.log(err)
        return false
    }
    console.log("Connected to MongoDB")
})

module.exports = db