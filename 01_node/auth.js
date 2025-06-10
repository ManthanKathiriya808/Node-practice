


const auth = {
    login: ()=>{
        console.log("login successfully...")
    },
    logout:()=>{
        console.log("logout successfully...")
    },
    date:()=>{
        const data = new Date()
        console.log(data)
    },

    details:{
        title:"admin",
        cred:"34543563456"
    }


}


module.exports = auth;