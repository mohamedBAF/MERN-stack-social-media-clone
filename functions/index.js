const functions = require('firebase-functions');

const express = require('express')
const app = express()
const PORT = 5000
//zr66iinhLz4aTUHK
const mongoose=require('mongoose')
const{MONGOURI}= require('./Keys')
var cors = require('cors');

app.use(cors());
mongoose.connect(MONGOURI,{

        useNewUrlParser: true,
    useUnifiedTopology: true 
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeaah")
})

mongoose.connection.on('error',(err)=>{
    console.log("connected to mongo yeaah",err)
})
require('./models/user')
require('./models/post')



app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



const customMiddleware = (req,res,next)=>{
    console.log("middleware executed")
    next()
}

/* app.use(customMiddleware) */

app.get('/about',customMiddleware,(req,res)=>{
    console.log("about")
        res.send("about page")
    })
app.listen(PORT,()=>{
    console.log('server is running on',PORT)
})


 exports.app = functions.https.onRequest(app) ;

