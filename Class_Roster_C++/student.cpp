#include <iostream>
#include "student.h"
#include <string>
using namespace std;

//DEFAULT CONSTRUCTOR
Student::Student(){
    this->studentID=-1;
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
Student::Student(int studentID, string firstName, string lastName, string email, int age, int daysToComplete[], DegreeProgram degree){
    studentID=studentID;
    firstName=firstName;
    lastName=lastName;
    email=email;
    age=age;
    for (int i=0; i<arraySize; ++i){
        daysToComplete[i]=daysToComplete[i];
    }
    degree=degree;
 
}
//DECONSTRUCTOR
Student::~Student() {};

//SETTING METHODS
void Student::SetID(int studentID) {                
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
int Student::GetID() const {return studentID;}
string Student::GetFirstName() const {return firstName;}
string Student::GetLastName() const {return lastName;}
string Student::GetEmail() const {return email;}
int Student::GetAge() const {return age;}
const int* Student::GetDaysToComplete() {return daysToComplete;}
DegreeProgram Student::GetDegree() const {return this->degree;}
//PRINTING METHOD
void Student::Print() const {
    cout <<studentID<<'\t'<<firstName<<'\t'<<lastName<<'\t'<<email;
    cout<<'\t'<<age<<'\t';
    cout<<"{"<<daysToComplete[0]<<","<<daysToComplete[1]<<","<<daysToComplete[2]<<"}"<<'\t';
    cout<<DegreeProgramStrings[(int)degree]<<endl;}
