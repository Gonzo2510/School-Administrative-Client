#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Student, Course, student_course, Department, Instructor

fake = Faker()

def create_students():
    students = []
    for _ in range(10):
        s = Student(
            name=fake.name(),
            email=fake.email()
        )
        students.append(s)
        
    # print(students)
    return students

def create_courses():
    courses = []
    for _ in range(10):
        c = Course(
            name=fake.name(),
            description=fake.sentence()
        )
        courses.append(c)

    # print(courses)
    return courses




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        # Seed code goes here!

        print("Clearing db...")
        if student_course:
            db.session.execute(student_course.delete())
            db.session.commit()
            print("true")
        else:
            print('false')
        Student.query.delete()
        Course.query.delete()
        Department.query.delete()
        Instructor.query.delete()


        print("Seeding students...")
        students = create_students()
        db.session.add_all(students)
        db.session.commit()

        print("Seeding courses...")
        courses = create_courses()
        db.session.add_all(courses)
        db.session.commit()


        print("Done seeding!")


