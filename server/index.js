//https://www.youtube.com/watch?v=JSUGAttC1e0

const express = require("express");
const app = express();
require('dotenv').config()
const {MongoClient} = require ('mongodb');


const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {});

var connected = false;
var _db;

app.post('/dorm-result', (req, res) => { 
    
    if (connected){ //connecting to mongo
        console.log("Connection is made, going to reuse it")
    } 
    else
    {
        try{
            connected = client.connect();
            _db = client.db(process.env.DATABASE_NAME) //choosing the database
            console.log("New connection")
        } catch(e){
            console.log("ERROR: Connection to mongoDB failed")
        }
    }

    //let surveyAnswers = req.body //get the req body

    //console.log(surveyAnswers)


    _db.collection("Dorms").findOne({}).then((item) => {
        console.log((item));
        //res.json({requestBody: req.body});

        
        res.end("The best dorm for you is the " + item._id + "located on " + item.Campus + 
                "\n Type: " + item.Type +
                "\n Availability: " + item.Availability );
    })
    
    
    


    //req body should have campus location, grade 
    //get all campus
    //filter from grade

    

    //    Call MongoDB and filter the user list to just email for response 
});

app.listen(1234);




//npm i 
//npm install nodemon -g
//nodemon index.js