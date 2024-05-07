#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Student, Course



def create_students():
    students = []
    for _ in range(10):
        s = Student(
            name=fake.name(),
            email=fake.email()
        )
        students.append(s)

    return students



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        # Seed code goes here!

        print("Clearing db...")
        Student.query.delete()

        print("Seeding students...")
        students = create_students()
        db.session.add_all(students)
        db.session.commit()
