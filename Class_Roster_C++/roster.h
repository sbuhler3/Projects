#ifndef ROSTER_H
#define ROSTER_H
#include "student.h"
#include <string>
using namespace std;
class Roster {
   // private:
     //create pointer array
    Student* classRosterArray[5];
    //starting index
    int ind=0;
    public:
    //default constructor
    //Roster();

    //parse
    void parse(string row);

    // adding a student
    void add(string studentID, string firstName, string lastName, string email, int age, int daysInCourse1, int daysInCourse2, int daysInCourse3, DegreeProgram degree);

    //removing a student
    void remove(string studentID);

    //print all students
    void printAll();

    //print average days student is in courses
    void printAverageDaysInCourse(string studentID);

    //print invalid emails
    void printInvalidEmails();
};

#endif