const express = require('express')
const mongoose = require('mongoose');
// require('dotenv').config();
//init app
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
// const port =5080;
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

(async () => {
    try {
      await mongoose
        .connect("mongodb+srv://sidpatil2209:sidhanti22@cluster0.gmgirpg.mongodb.net/test", { useNewUrlParser: true })
        .then(console.log("Connected to MongoDB"));
    } catch (error) {
      console.log("Error connecting to mongodb" + error);
    }
  })();


    const user = new mongoose.Schema({
    name: {
        type : 'string',
        required : true
    },
    userID :{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    email: {
        type : 'string',
        required : true
    },
    contact: {
        type : 'string',
        required : true
    },
    hobby: {
        type : 'string',
        required : true
    },
  });


const user_data = mongoose.model("user", user);

app.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api',async(req,res)=>{
    const userItem = new user_data({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        hobby: req.body.hobby
    })
    userItem.save()
    .then(console.log("row added successfully"))
    res.send('table item added successfully')
})

app.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api/table',async(req,res)=>{
    user_data.find().then((doc,err)=>{
        var tableArray = doc
        res.send(tableArray)
    })
    // res.send('table: '+tableArray)
})

app.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api/delete',async(req,res)=>{
    var myquery = { _id: req.body._id };
    user_data.deleteOne(myquery)
    .then(res.send("1 document deleted"))
})


app.get('https://main--phenomenal-syrniki-ccf5ba.netlify.app/', (req, res) => res.send('Hello world!'));

app.listen("https://main--phenomenal-syrniki-ccf5ba.netlify.app/", () => console.log(`Server running on netlify`));