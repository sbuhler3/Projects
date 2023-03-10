import requests
from bs4 import BeautifulSoup

# function to scrape data off hockey website
def scrape():
    url='https://www.scrapethissite.com/pages/forms/?page_num={}' #set to be able to .format later on for dif page nums
    x=1 #set page counter
    winning=[]
    while True:
        page=requests.get(url.format(x))
        if '0 items' in page.text: #stops when reaches a page that no longer has data
            break
        soup=BeautifulSoup(page.content,'lxml')
        for item in soup.select('.team'):
            if int(item.find(class_='wins').get_text()) >=50:
                winning.append((item.find(class_='name').get_text().strip(),item.find(class_='year').get_text().strip()))
            
        x+=1
    return winning