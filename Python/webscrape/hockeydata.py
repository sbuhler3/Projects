import sqlite3
from webscrape1 import scrape

data=scrape()

#function to print out all winners
def show_all():
    conn=sqlite3.connect('hockey.db')
#create cursor to execute commands
    c=conn.cursor()

    c.execute('CREATE TABLE IF NOT EXISTS winners(Team VARCHAR(50), Year INTEGER, UNIQUE (Team, Year))')

    for i in data:
        c.execute('REPLACE INTO winners VALUES(?,?)',(i[0],i[1]))
        conn.commit()
    c.execute('SELECT * FROM winners')
    items=c.fetchall()
    for item in items:
        print(item)

#function to print out times team selected has won
def select():
    string=input('Select team you would like to search for: ').title()

    conn=sqlite3.connect('hockey.db')
#create cursor to execute commands
    c=conn.cursor()

    c.execute('CREATE TABLE IF NOT EXISTS winners(Team VARCHAR(50), Year INTEGER, UNIQUE (Team, Year))')

    for i in data:
        c.execute('REPLACE INTO winners VALUES(?,?)',(i[0],i[1]))
        conn.commit()
    #search if team is in database
    c.execute('SELECT * FROM winners WHERE Team = (?)',(string,))
    items=c.fetchall()
    if items==None or items==[]:
        print("I'm sorry that name is not in our database from 1990-2011")
    else:
        print(string)
        for item in items:
            print(item[1])