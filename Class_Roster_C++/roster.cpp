#include <iostream>
#include <string>
#include "roster.h"
using namespace std;

//default constructor

//parsing data to populate array
void  Roster::parse(string data) {
    size_t rhs =data.find(",");
    string ID = data.substr(0,rhs);

    size_t lhs= rhs+1;
    rhs=data.find(",",lhs);
    string first = data.substr(lhs, rhs-lhs);

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    string last = data.substr(lhs, rhs-lhs);

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    string email = data.substr(lhs, rhs-lhs);

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    int age = stoi(data.substr(lhs, rhs-lhs));

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    int daysInCourse1 = stoi(data.substr(lhs, rhs-lhs));

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    int daysInCourse2 = stoi(data.substr(lhs, rhs-lhs));

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    int daysInCourse3 = stoi(data.substr(lhs, rhs-lhs));

    lhs= rhs+1;
    rhs=data.find(",",lhs);
    string strDegree = data.substr(lhs, rhs-lhs);

    DegreeProgram degree= DegreeProgram::NETWORK;
    if (strDegree == "NETWORK") {
        degree = DegreeProgram::NETWORK;
    }
    else if (strDegree == "SECURITY") {
        degree = DegreeProgram::SECURITY;
    }
    else if(strDegree == "SOFTWARE") {
        degree = DegreeProgram::SOFTWARE;
    }
    //add all the parsed data from string into object method add
    add(ID, first, last, email, age, daysInCourse1, daysInCourse2, daysInCourse3, degree);
}

//add method
void Roster::add(string studentID, string firstName, string lastName, string email, int age, int daysInCourse1, int daysInCourse2, int daysInCourse3, DegreeProgram degree) {

    int courseArray[3]={daysInCourse1, daysInCourse2, daysInCourse3};
    classRosterArray[ind++]= new Student(studentID,firstName, lastName, email, age, courseArray, degree);
}

// print all method
void Roster::printAll(){
    for (int i=0; i<5; i++){
        Roster::classRosterArray[i]->Print();
    }
}
 int main() {
    const string studentData[] = 

{"A1,John,Smith,John1989@gm ail.com,20,30,35,40,SECURITY",
 "A2,Suzan,Erickson,Erickson_1990@gmailcom,19,50,30,40,NETWORK",
  "A3,Jack,Napoli,The_lawyer99yahoo.com,19,20,40,33,SOFTWARE",
   "A4,Erin,Black,Erin.black@comcast.net,22,50,58,40,SECURITY",
    "A5,Spencer,Buhler,sbuhle5@wgu.edu,29, 5,9,10,SOFTWARE"};
Roster r;
    return 0;
 }