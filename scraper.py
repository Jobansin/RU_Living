from bs4 import BeautifulSoup
import requests
import csv

#creating CSV
file = open('output.csv', 'w')
writer = csv.writer(file)
writer.writerow(['Hall', 'Type', 'Max Students', '# of Floors', 'Avg Room Size', 'Availability', 'Contract Type'])

cookdougBuildings = ['Helyar', 'Henderson', 'Jameson', 'Katzenbach', 'Lippincott', 'New Gibbons', 'Newell', 'Nicholas', 'Perry', 'Starkey', 'Voorhees', 'Woodbury Bunting-Cobb']
liviBuildings = ['Livingston Apartments', 'Lynton Towers (North)', 'Lynton Towers (South)','Quad I', 'Quad II', 'Quad III']
collegeBuildings = ['brett', 'campbell', 'clothier', 'demarest', 'frelinghuysen', 'hardenbergh', 'hegeman', 'honors college residence hall', 'leupp', 'mettler', 'pell', 'sojourner_truth', 'stonier', 'tinsley', 'university center', 'wessels']
buschBuildings = ['allen', 'barr', 'busch-engineering-science-and-technology-best-hall', 'buell', 'crosby', 'johnson', 'judson', 'mattia', 'marvin', 'mccormick', 'metzger', 'morrow', 'nicholas', 'richardson', 'silvers', 'thomas', 'winkler']

campusArr = [cookdougBuildings, liviBuildings, collegeBuildings, buschBuildings]

for campus in campusArr:
    
    for building in campus:
        placeURL = "http://ruoncampus.rutgers.edu/" + building.replace(" ","-") #getting urls

        #getting htmls
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/99.0", 
            "method": "GET"
        }

        page_to_scrape = requests.get(placeURL,headers=headers) 
        residenceSoup = BeautifulSoup(page_to_scrape.text, 'html.parser') 

        infoAll = residenceSoup.findAll('div', attrs={"class":"wpb_wrapper"})[6].findAll('p') #overview data in p headers
        dataArray = []

        #get the name from the first        
        name = infoAll[0].find('span').text
        dataArray.append(name)
        print(name)
        
        if(name.find("Sojourner") != -1): #has an extra paragraph in the front, so offset the data by one
            infoAll = infoAll[1:]
        
        for info in infoAll[1:7]: #remove the name from the front then get the next 6 data paragraphs #the quads have extra stuff at the end of their html and mccormick (busch) 
            
            infoSplit = info.text.split(":") #split the data by the : (EX = Number of Students: 288)

            data = infoSplit[1].replace("\xa0","") #get the second element [Number of Students, 288]

            dataArray.append(data) #add to array to be saved and pushed later

        writer.writerow(dataArray) #write it to the csv