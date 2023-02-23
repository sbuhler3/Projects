//
//  roster.h
//  Class Roster
//
//  Created by Spencer Buhler on 2/22/23.
//
#include "student.h"
#include <string>
using namespace std;
#ifndef roster_h
#define roster_h
class Roster {

    public:
    //default constructor
    Roster();

    //deconstructor
    ~Roster();
    //parse
    void parse(string row);

    // adding a student
    void add(string studentID, string firstName, string lastName, string email, int age, int daysInCourse1, int daysInCourse2, int daysInCourse3, DegreeProgram degree);

    //removing a student
    void remove(string ID);

    //print all students
    void printAll();

    //print average days student is in courses
    void printAverageDaysInCourse(string ID);

    //print invalid emails
    void printInvalidEmails();
    
    //print by degree type
    void printByDegreeProgram(DegreeProgram deg);

    //create pointer array
    Student* classRosterArray[5];
};


#endif /* roster_h */
