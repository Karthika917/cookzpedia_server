const mongose=require('mongoose')

mongose.connect(process.env.CONNECTION_STRING).then(res=>{
    console.log("Server Connected to MongoDB")
}).catch(err=>{
    console.log(err)
})