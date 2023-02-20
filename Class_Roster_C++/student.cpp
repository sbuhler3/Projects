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
    this-> studentID=studentID;
    this-> firstName=firstName;
    this-> lastName=lastName;
    this-> email=email;
    this-> age=age;
    for (int i=0; i<arraySize; ++i){
        this->daysToComplete[i]=daysToComplete[i];
    }
    this->degree=degree;
 
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

//void Student::SetDaysToComplete(int age) {

//GETTING METHODS
int Student::GetID() const {
    return studentID;
}

string Student::GetFirstName() const {
    return firstName;
}

string Student::GetLastName() const {
    return lastName;
}

string Student::GetEmail() const {
    return email;
}

int Student::GetAge() const {
    return age;
}

//PRINTING METHOD
void Student::Print() const {
    cout << "TESTING"<<studentID<<firstName<<lastName<<email<<age;}
int main() {
    Student testStudent;
    testStudent.Print();

   
    return 0;
}