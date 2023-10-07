import setup
from bs4 import BeautifulSoup
import requests
import csv


mainLandingURL = "http://ruoncampus.rutgers.edu/facilities/browse-by-campus/"

buschURL = "http://ruoncampus.rutgers.edu/facilities/browse-by-campus/explore-rutgers-campus-housing-facilities-busch-campus/"

allenHallURL = "http://ruoncampus.rutgers.edu/allen-hall/"

#getting htmls
print("Scraping URLs")  
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/99.0", 
    "method": "GET"
}

page_to_scrape = requests.get(allenHallURL,headers=headers) 
residenceSoup = BeautifulSoup(page_to_scrape.text, 'html.parser') 

file = open('output.csv', 'w')
writer = csv.writer(file)
writer.writerow(['Type', 'Max Students', '# of Floors', 'Avg Room Size', 'Availability', 'Contract Type']) #create CSV file

info = residenceSoup.findAll('div', attrs={"class":"pb_wrapper"})[6]

print(info)
