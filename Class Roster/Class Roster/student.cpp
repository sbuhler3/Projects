//
//  student.cpp
//  Class Roster
//
//  Created by Spencer Buhler on 2/22/23.
//

#include <stdio.h>
#include <iostream>
#include "student.h"
#include <string>
using namespace std;

//DEFAULT CONSTRUCTOR
Student::Student(){
    this->studentID="NoID";
    this->firstName="NoName";
    this->lastName="NoName";
    this->email="NoEmail";
    this->age=-1;
    for (int i=0; i<arraySize; ++i){
        this->daysToComplete[i]=0;
    }
    this->degree = DegreeProgram::NETWORK;
}
//FULL CONSTRUCTOR
Student::Student(string studentID, string firstName, string lastName, string email, int age, int daysToComplete[], DegreeProgram degree){
    this->studentID=studentID;
    this->firstName=firstName;
    this->lastName=lastName;
    this->email=email;
    this->age=age;
    for (int i=0; i<arraySize; ++i){
        this->daysToComplete[i]=daysToComplete[i];
    }
    this->degree=degree;
 
}
//DECONSTRUCTOR
Student::~Student() {};

//SETTING METHODS
void Student::SetID(string studentID) {
    this->studentID=studentID;}

void Student::SetFirstName(string firstName) {
    this->firstName=firstName;}

void Student::SetLastName(string lastName) {
    this->lastName=lastName;}

void Student::SetEmail(string email) {
    this->email=email;}

void Student::SetAge(int age) {
    this->age=age;}

void Student::SetDaysToComplete(const int daysToComplete[]) {
    for (int i=0; i<arraySize; ++i){
        this->daysToComplete[i]=daysToComplete[i];
    }
}
void Student::SetDegree(DegreeProgram degree) {
    this->degree=degree;
}

//GETTING METHODS
string Student::GetID() const {return studentID;}
string Student::GetFirstName() const {return firstName;}
string Student::GetLastName() const {return lastName;}
string Student::GetEmail() const {return email;}
int Student::GetAge() const {return age;}
const int* Student::GetDaysToComplete() {return daysToComplete;}
DegreeProgram Student::GetDegree() const {return this->degree;}
//PRINTING METHOD
void Student::Print() {
    cout <<studentID<<'\t'<<firstName<<'\t'<<lastName<<'\t'<<email;
    cout<<'\t'<<age<<'\t';
    cout<<"{"<<daysToComplete[0]<<","<<daysToComplete[1]<<","<<daysToComplete[2]<<"}"<<'\t';
    cout<<DegreeProgramStrings[(int)degree]<<endl;}
