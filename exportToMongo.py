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




objToPush = '{}'
headers = []
counter = 0
with open("output.csv", "r") as file:
    reader = csv.reader(file) #open csv
    
    
    for row in reader:
        
        if (counter == 0):
            headers = row
            counter += 1
            continue

        if(counter % 2 == 0):
            
            for j in range(0, len(headers)): #for each of the headers
                
                z = json.loads(objToPush)
                z.update({headers[j] : row[j]})
                print(json.dumps(z))
            
            
        counter += 1
        
        

    #for i, line in enumerate(reader): #iterate through it
        
       ## if(i == 0): #get the first line of headers
         #   headers = readlines().text[2:-2]
          #  print(headers)
        
        #if(i % 2 == 0): #even numbers since CSV has blank odd numbers for some reason
            #print('line[{}] = {}'.format(i, line))
            #print(len(headers))
            #for j in range(0, len(headers)): #for each of the headers
                #print(len(headers))
                    
                    

            


        

        
        



#collection.insert_one({"test": "test"})
