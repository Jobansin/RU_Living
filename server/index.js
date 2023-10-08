//https://www.youtube.com/watch?v=JSUGAttC1e0

const express = require("express");
const app = express();
require('dotenv').config()
const {MongoClient} = require ('mongodb');


const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {});

var connected = false;
var _db;

app.get('/dorm-result', (req, res) => { 
    
    if (connected){
        console.log("Connection is made, going to reuse it")
    } 
    else
    {
        try{
            connected = client.connect();
            _db = client.db(process.env.DATABASE_NAME)
            console.log("New connection")
        } catch(e){
            console.log("ERROR: Connection to mongoDB failed")
        }
    }

    _db.collection("Dorms").findOne({}).then((item) => {
        console.log(typeof(item));
        res.send(item);
    }

    )
    
    


    //req body should have campus location, grade 
    //get all campus
    //filter from grade

    

    //    Call MongoDB and filter the user list to just email for response 
});

app.listen(1234);




//npm i 
//npm install nodemon -g
//nodemon index.js