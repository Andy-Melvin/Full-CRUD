const bodyParser = require("body-parser")
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
mongoose.set('StringQuery',false);

const app=express()
const port=3000;
const mongoUri='mongodb://localhost:27017'

app.use(bodyParser.json());
app.use(cors());


mongoose.connect (mongoUri,{useNewUrlParser:true,useUnifiedTopology:true});
const db= mongoose.connect;
db.on('error',console.error.bind(console,'MongodB connection'))