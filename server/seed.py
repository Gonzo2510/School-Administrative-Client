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
    course_names = [
    "Algebra I",
    "Geometry",
    "Algebra II",
    "Precalculus",
    "Calculus",
    "Biology",
    "Chemistry",
    "Physics",
    "Earth Science",
    "Environmental Science",
    "Anatomy and Physiology",
    "English Literature",
    "American Literature",
    "World Literature",
    "Creative Writing",
    "AP English Language and Composition",
    "AP English Literature and Composition",
    "World History",
    "U.S. History",
    "Government and Politics"
]
    
    for name in course_names:
        c = Course(
            name = name,
            description=fake.sentence()
        )
        courses.append(c)

    # print(courses)
    return courses

def create_departments():
    d1 = Department(name = "Science")
    d2 = Department(name = "Math")
    d3 = Department(name = "English")
    d4 = Department(name = "Social Studies")
    departments = [d1, d2, d3, d4]
    return departments


def create_instructors():
    instructors = []
    for _ in range(6):
        i = Instructor(
            name=fake.name()
        )
        instructors.append(i)
    return instructors



if __name__ == '__main__':
    with app.app_context():
        # Seed code goes here!
        
        db.create_all()
        print("Clearing db...")
        db.session.execute(student_course.delete())
        db.session.commit()
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

        print("Seeding departments...")
        departments = create_departments()
        db.session.add_all(departments)
        db.session.commit()

        print("Seeding instructors...")
        instructors = create_instructors()
        db.session.add_all(instructors)
        db.session.commit()


        print("Done seeding!")


