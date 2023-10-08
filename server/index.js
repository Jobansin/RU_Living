const express = require("express");
const app = express();
const {MongoClient} = require ('mongodb');


const uri = "mongodb+srv://databaseAdmin:KeB6IptIdvYImr03@cluster0.lwqtjkc.mongodb.net/?retryWrites=true&w=majority";
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
            _db = client.db("Dorms")
            console.log("New connection")
        } catch(e){
            console.log("ERROR: Connection to mongoDB failed")
        }
    }


    //req body should have campus location, grade 
    //get all campus
    //filter from grade

    res.send(JSONbody)

    //    Call MongoDB and filter the user list to just email for response 
});

app.listen(1234);