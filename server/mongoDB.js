// To connect with your mongoDB database
const {MongoClient, ServerApiVersion} = require ('mongodb');

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    }
)

var connected = false;
var _db;

async function mongoConnect(){
    if (connected){
        console.log("Connection is made, going to reuse it")
    } 
    else
    {
        try{
            connected = client.connect();
            _db = client.db(process.env.DATABASE_URL)
            console.log("New connection")
        } catch(e){
            console.log("ERROR: Connection to mongoDB failed")
        }
    }
}

//async function closeMongo(){
//    try{
//        client.close(); 
//    } catch(e){
//        console.log("ERROR: Connection to mongoDB could not be closed");
//    }
//}

async function readDorms (dorms){
    try{
        const foundDorm = _db.collection("Dorms").find({_id: dorms});
        console.log("Dorm has been found. Returning now.");
        return foundDorm;
    } catch(e){
        console.log("Error: Could not find Dorm")
    }
}

async function readUser (userID){
    try{
        let foundUser = _db.collection("User").find({id: userID});
        console.log("User has been found. Returning now.");
        return await foundUser;
    } catch(e){
        console.log("Error: Could not find user")
    }
}

//async function getUser(){
//    try{
//        let 
//        
//    }
//}

//async function getDorm(){
//    try{
//        let 
//        
//    }
//}

module.exports = { mongoConnect, readDorms, readUser}