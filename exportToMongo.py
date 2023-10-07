from dotenv import load_dotenv
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import csv
import json


load_dotenv() #loading env vars
uri = os.environ['DATABASE_URL']


client = MongoClient(uri, server_api=ServerApi('1')) # Create a new client and connect to the server

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client[os.environ['DATABASE_NAME']] #select database
collection = db[os.environ['COLLECTION_NAME']] #select collection

headers = []
counter = 0
with open("output.csv", "r") as file:
    reader = csv.reader(file) #open csv
    
    for row in reader: 
        if (counter == 0): #get the first row of headers
            headers = row
            counter += 1
            continue

        if(counter % 2 == 0): #get the even rows (odd rows are empty for some reason)
            temp = json.loads(objectToPush) #load the empty JSON
            
            for j in range(0, len(headers)): #for each of the headers
                temp.update({headers[j] : row[j]}) #get it linked to the proper data and push it to the JSON
            
            objectToPush = temp 
            collection.insert_one(objectToPush) #push to database #TODO SHOULD PROB MAKE THE HALLS THE UNIQUE _id
            objectToPush = '{}' #clear the JSON for next loop
            
        counter += 1