//
//  main.cpp
//  Class Roster
//
//  Created by Spencer Buhler on 2/22/23.
//

#include <iostream>
#include <string>
using namespace std;
#include "roster.h"
int main(){
    const string studentData[] =

{"A1,John,Smith,John1989@gm ail.com,20,30,35,40,SECURITY",
 "A2,Suzan,Erickson,Erickson_1990@gmailcom,19,50,30,40,NETWORK",
  "A3,Jack,Napoli,The_lawyer99yahoo.com,19,20,40,33,SOFTWARE",
   "A4,Erin,Black,Erin.black@comcast.net,22,50,58,40,SECURITY",
    "A5,Spencer,Buhler,sbuhle5@wgu.edu,29, 5,9,10,SOFTWARE"};

    cout<<"C867- Scripting and Programming: Applications \nLanguage: C++ \n";
    cout<<"Student ID: 011006796 \nName: Spencer Buhler \n\n";
    Roster rosterArray;
    for (int i=0; i<5; i++){
        rosterArray.parse(studentData[i]);
    }
    rosterArray.printAll();
    rosterArray.printInvalidEmails();
    cout<<endl;
    for(int i=0; i<5; i++){
        rosterArray.printAverageDaysInCourse( rosterArray.classRosterArray[i]->GetID());
    }
    cout<<endl<<"Showing students in degree program: SOFTWARE \n\n";
    rosterArray.printByDegreeProgram(DegreeProgram::SOFTWARE);
    cout<<endl<<"Removing A3\n\n";
    rosterArray.remove("A3");
    rosterArray.printAll();
    cout<<endl<<"Removing A3 again \n\n";
    rosterArray.remove("A3");
    
    return 0;
}
