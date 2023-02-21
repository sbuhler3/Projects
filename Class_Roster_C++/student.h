#ifndef STUDENT_H
#define STUDENT_H
#include "degree.h"
#include <string>
using namespace std;


class Student {
    public: 
    //const value for array
    const static int arraySize=3;
    //default constructor
    Student();
    //full constructor
    Student(string studentID, string firstName, string lastName, string email, int age, int daysToComplete[], DegreeProgram degree);
    //deconstructor
    ~Student();

    //Setting student attributes
    void SetID(string studentID);                                
    void SetFirstName(string firstName);
    void SetLastName(string lastName);
    void SetEmail(string email);
    void SetAge(int age);
    void SetDaysToComplete(const int daysToComplete[]);
    void SetDegree(DegreeProgram deg);

    //getting student attributes
    string GetID() const;                                     
    string GetFirstName() const;
    string GetLastName() const;
    string GetEmail() const;
    int GetAge() const;
    const int* GetDaysToComplete() ;
    DegreeProgram GetDegree() const; 

    //printing student attributes
    void Print();                                     


    private:
    string studentID;
    string firstName;
    string lastName;
    string email;
    int age;
    int daysToComplete[arraySize];
    DegreeProgram degree;

};



#endif