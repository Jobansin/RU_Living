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

buschBuildings1 = ['mccormick']

collegeBuildings1 = ['sojourner_truth']
campusArr = [cookdougBuildings]

for campus in campusArr:
    
    for building in campus:
        placeURL = "http://ruoncampus.rutgers.edu/" + building.replace(" ","-")
        #print(building)
    
        #placeURL = "http://ruoncampus.rutgers.edu/buell-apartments/" #url

        #getting htmls
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/99.0", 
            "method": "GET"
        }

        page_to_scrape = requests.get(placeURL,headers=headers) 
        residenceSoup = BeautifulSoup(page_to_scrape.text, 'html.parser') 

        infoAll = residenceSoup.findAll('div', attrs={"class":"wpb_wrapper"})[6].findAll('p') #overview data
        dataArray = []
        counter = 0
          
                
        #print(infoAll)
        
        #infoAll[:7]
        #infoAll[-6:]
        
        #print(infoAll)
        
        name = infoAll[0].find('span').text
        dataArray.append(name)
        print(name)
        
        if(name.find("Sojourner") != -1): #has an extra paragraph in the front
            infoAll = infoAll[1:]
        
        #print(infoAll)
        for info in infoAll[1:7]: #the quads have extra stuff at the end of their html and mccormick (busch)
            
            #print(infoAll)
            #if counter == 0: #get the name
            #     counter += 1
               # print(data)
                #dataArray.append(data)
                #continue
            #print(info.text)
            infoSplit = info.text.split(":") #split by the : and get rest of attributes
            #print(info)
            data = infoSplit[1].replace("\xa0","")
            #print(data)
            dataArray.append(data)

        writer.writerow(dataArray) #write it to the csv