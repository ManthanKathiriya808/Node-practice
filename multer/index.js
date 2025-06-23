const express = require("express")
const db = require("./config/db")
const adminTbl = require("./model/adminTbl")
const multer = require("multer")
const port = 3000;
const path = require("path")
const fs = require("fs")

const app = express();
app.set("view engine","ejs")
app.use(express.urlencoded())


const newImage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})


app.use("/uploads", express.static(path.join(__dirname, "uploads")))


const images = multer({storage:newImage}).single("image")

app.post("/insert",images,(req,res)=>{
    // console.log(req.body)
    const {name,email,phone,password} = req.body


    let image = req.file.path

    adminTbl.create({
        name,
        email,
        phone,
        image,
        password,
    })
    .then((data)=>{
        console.log(" Data inserted successfull")
        return false
    })
    .catch((err)=>{
           console.log(err)
        return false
    })

    res.redirect("/")

})




app.post("/editData", images, (req, res)=>{
    const {id, name, email, phone, password} = req.body;

 

    // console.log(req.file)

    if(req.file)
    {
        const image = req.file.path
            adminTbl.findById(id).then((oldRecord)=>{
            fs.unlinkSync(oldRecord.image)
            })
            .catch((err)=>{
                console.log(err)
                return false
            })

            adminTbl.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                password,
                image
            })
            .then((data)=>{
                    res.redirect('/')
                    return false
                })
                .catch((err)=>{
                    console.log(err)
                    return false
                }) 
    }
    else{
           adminTbl.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                password
            })
            .then((data)=>{
                    res.redirect('/')
                    return false
                })
                .catch((err)=>{
                    console.log(err)
                    return false
                }) 
    }
  
})





app.get("/edit/:id",(req,res)=>{
    const id = req.params.id    
    adminTbl.findById(id)
    .then((data)=>{

        res.render("edit",{
            data
        })
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })



})

app.get("/delete/:id",(req,res)=>{
    const id = req.params.id
    // console.log(id)
    adminTbl.findByIdAndDelete(id)
     .then((data)=>{
     console.log("deleted successfull")
     fs.unlinkSync(data.image)
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

    res.redirect("/")
    
})

app.get("/",(req,res)=>{
   

    adminTbl.find()
    .then((data)=>{
        res.render("index",{
            data
        })
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })
})


app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }

    console.log("server is running at port : " + port)
})