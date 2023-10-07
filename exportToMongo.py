from dotenv import load_dotenv
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import csv


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




objToPush = []
headers = []
with open("output.csv", "r") as f:
    reader = csv.reader(f, delimiter="\r") #open csv
    
    for i, line in enumerate(reader): #iterate through it
        
        if(i == 0): #get the first line of headers
            headers = line
            print(headers[2])
        
        #if(i % 2 == 0): #even numbers since CSV has blank odd numbers for some reason
            #print('line[{}] = {}'.format(i, line))
            #print(len(headers))
            #for j in range(0, len(headers)): #for each of the headers
                #print(len(headers))
                    
                    

            


        

        
        



#collection.insert_one({"test": "test"})
