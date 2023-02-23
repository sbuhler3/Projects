//
//  roster.cpp
//  Class Roster
//
//  Created by Spencer Buhler on 2/22/23.
//

#include <stdio.h>
#include <iostream>
#include <string>
#include "roster.h"
using namespace std;
// global ind
int classSize=0;
int numStudents=5;
//default constructor
Roster::Roster() {
    for (int i=0; i<5; ++i) {
        classRosterArray[i]=nullptr;
    }
}
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
    classRosterArray[classSize++]= new Student(studentID,firstName, lastName, email, age, courseArray, degree);
}
//remove method
void Roster::remove(string ID){
    bool found=false;
    for (int i=0; i<classSize; i++){
        if (classRosterArray[i]->GetID()==ID){
            found=true;
            Student* temp = classRosterArray[i];
            classRosterArray[i] = classRosterArray[numStudents-1];
            classRosterArray[numStudents-1] =temp;
            classRosterArray[numStudents-1] =nullptr;
            temp = classRosterArray[i];
            classRosterArray[i]=classRosterArray[numStudents-2];
            classRosterArray[numStudents-2]=temp;
            classSize--;
            break;
        }
    }
    if (!found){
        cout<<"The student with the ID: "<<ID<<" was not found."<<endl;
    }
}
// print invalid emails missing '@' '.' or that has ' '.
void Roster::printInvalidEmails(){
    cout<<"\n"<<"Displaying invalid emails:\n\n";
    for(int i=0;i<classSize;i++){
        string email =classRosterArray[i]->GetEmail();
        if(email.find('@') == string::npos || (email.find('.') == string::npos) || (email.find(' ') !=string::npos)){
            cout<<email<<" - is invalid"<<endl;}
        
    }
}
//average days student is in course
void Roster::printAverageDaysInCourse(string ID){
    for (int i=0;i<classSize;i++){
        if (classRosterArray[i]->GetID() == ID){
            const int *nums = classRosterArray[i]->GetDaysToComplete();
            int avg= (nums[0]+nums[1]+nums[2])/3.0;
            cout<<"Student ID: "<<classRosterArray[i]->GetID();
            cout<<", average days in course is: "<<avg<<endl;
        }
    }
}
//print by degree type
void Roster::printByDegreeProgram(DegreeProgram deg){
    for (int i=0; i<classSize; i++){
        if (classRosterArray[i]->GetDegree()== deg){
            classRosterArray[i]->Print();
        }
    }
}
// print all method
void Roster::printAll(){
    cout<<"Displaying all students:\n\n";
    for (int i=0; i<classSize; i++){
        classRosterArray[i]->Print();
    }
}
//deconstructor
Roster::~Roster(){
    for (int i=0;i<5;i++){
        classRosterArray[i] = nullptr;}
};
