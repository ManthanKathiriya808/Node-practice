const express = require("express")

const adminTbl = require("./model/adminTbl")
const db = require("./config/db")
const port = 3000;

const app = express();
let edit = {
    id:""
}
app.set("view engine", "ejs")

app.use(express.urlencoded())

app.use("/delete/:id",(req,res)=>{
    // console.log(req.params.id)
    let id = req.params.id

    adminTbl.findByIdAndDelete(id)
    .then((data)=>{
        console.log("data inserted successfull")
        res.redirect("/")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })

})


app.get("/edit/:id", (req, res)=>{
    let id = req.params.id;
    adminTbl.findById(id)
     .then((sing)=>{
        edit = sing;
        res.redirect("/")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })
    

    
})

app.post("/insert",(req,res)=>{

       console.log(req.body)
    let editId = req.body.id;

    const {name, email, number, password} = req.body

    if(editId)
    {
        adminTbl.findByIdAndUpdate(editId, {
            name: name,
            email: email,
            number:number,
            password:password
        })
        .then((data)=>{
            edit={}
            console.log("record edited successfully")
            console.log(data)
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err);
            return false;
        })

    } else {
        adminTbl.create({
            name,
            email,
            number,
            password
        })
        .then((oneRecord)=>{
            console.log("data inserted successfully...!")
            res.redirect('/')
            return false;
        })
        .catch((err)=>{
            console.log(err)
            return false;
        })
    }

 
})



app.get("/", (req, res)=>{

    adminTbl.find().then((allData)=>{
    //     console.log(allData)
       return res.render("index",{
        data:allData, 
        editData : edit
       })
        
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })

})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log("server  is connected to " + port)
})