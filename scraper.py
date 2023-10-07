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
buschBuildings = ['allen', 'barr', 'best', 'buell', 'crosby', 'johnson', 'judson', 'mattia', 'marvin', 'mccormick', 'metzger', 'morrow', 'nicholas', 'richardson', 'silvers', 'thomas', 'winkler']


collegeBuildings1 = ['sojourner_truth']
campusArr = [collegeBuildings]

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
        name = infoAll[0].find('span').text
        dataArray.append(name)
        print(name)
        
        for info in infoAll[-6:]: #the quads have extra stuff at the end of their html
            
            #if counter == 0: #get the name
              #  data = info.find('span').text#.replace("&nbsp","")
             #   counter += 1
               # print(data)
                #dataArray.append(data)
                #continue
            
            infoSplit = info.text.split(":") #split by the : and get rest of attributes
            #print(infoSplit)
            data = infoSplit[1].replace("\xa0","")
            
            dataArray.append(data)

        writer.writerow(dataArray) #write it to the csv