
const express = require("express")

const port = 8000

const app = express()
app.use(express.urlencoded())

let data = [
    {
        id:1,
        name:"one",
        email:"one@gamil.com",
        password:"one"

    },
    {
        id:2,
        name:"two",
        email:"two@gamil.com",
        password:"two"

    },
    {
        id:3,
        name:"three",
        email:"three@gamil.com",
        password:"three"

    },
]

app.set("view engine","ejs") 


app.post('/insert',(req,res)=>{

    data.push(req.body)
    res.redirect('/')
})

app.get('/delete',(req,res)=>{
    let userid = req.query.id
    data = data.filter((ele)=> ele.id !=userid)
    res.redirect('/')
})

app.get('/',(req,res)=>{
    res.render("form",{
        students:data
    })
})


app.listen(port,(err)=>{
    if(err){
          console.log("server is not connected...!")
        return false;
    }
    console.log("running successull at port : " + port)
})