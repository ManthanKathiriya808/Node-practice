const { name } = require("ejs");
const express = require("express")

const app = express()

const port = 8000;

app.set("view engine","ejs")
app.use(express.urlencoded())
let data = [
    {
        id:1,
        name:"manthan",
        email:"manthan@123",
        password:"manthan"

    },
    {
        id:2,
        name:"one",
        email:"one@123",
        password:"one"

    },
    {
        id:3,
        name:"two",
        email:"two@123",
        password:"two"

    },
]

// app.get("/update",(req,res)=>{
//     data  = data.map((ele)=>{
//         if(ele.id == req.body.id){
//             ele = req.body
//         }
//         return ele
//     })
// })

app.post("/updateData",(req,res)=>{
    console.log(req.body)
    data.map((ele)=>{
        if(ele.id == req.body.id){
            ele.name = req.body.name,
            ele.email = req.body.email
            ele.password = req.body.password
        }
        return ele
    })

    return res.redirect("/")
})

app.get("/edit",(req,res)=>{
    let user = data.find((ele)=> ele.id == req.query.id)
    res.render("update",{
        user
    })
})

app.get("/delete",(req,res)=>{
    let userId = req.query.id
    // console.log(userId)
        data = data.filter((ele)=> ele.id != userId)
        res.redirect("/")
})

app.post("/insert",(req,res)=>{
    data.push(req.body)
    res.redirect("/")
})

app.get("/",(req,res)=>{
    res.render("form",{
        data
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("this is an error")
        return false
    }

    console.log("Runned successfully on port : " + port)
})