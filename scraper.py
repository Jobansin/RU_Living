import setup
from bs4 import BeautifulSoup
import requests
import csv


mainLandingURL = "http://ruoncampus.rutgers.edu/facilities/browse-by-campus/"

buschURL = "http://ruoncampus.rutgers.edu/facilities/browse-by-campus/explore-rutgers-campus-housing-facilities-busch-campus/"

allenHallURL = "http://ruoncampus.rutgers.edu/allen-hall/"

#getting htmls
print("Scraping URLs")  #TODO add if statement to check if we got a request, else print error
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/99.0", 
    "method": "GET"
}