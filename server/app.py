#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Student, Course, Department, Instructor

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/students', methods=['GET'])
def students():
    if request.method == 'GET':
        students = Student.query.all()

        students_dict = [student.to_dict() for student in students]

        response = make_response(
            students_dict,
            200
        )
    
    return response

@app.route('/students/<int:id>', methods=['GET', "DELETE"])
def student_by_id(id):
    student = Student.query.filter(Student.id == id).first()
    
    if request.method == 'DELETE':
        if student:
            db.session.delete(student)
            db.session.commit()
            response = make_response(
                {},
                204
            )
        else:
            response = make_response(
                {"error": "Student not found"}, 
                404
            )
    
    return response


@app.route('/courses', methods=['GET'])
def courses():
    if request.method == 'GET':

        courses = Course.query.all()
        courses_dict = [course.to_dict() for course in courses]

        response = make_response(
            courses_dict,
            200
        )
    return response

@app.route('/departments', methods=['GET'])
def departments():
    if request.method == 'GET':

        departments = Department.query.all()
        departments_dict = [department.to_dict() for department in departments]

        response = make_response(
            departments_dict,
            200
        )
    return response
    
@app.route('/instructors', methods=['GET'])
def instructor():
    if request.method == 'GET':

        instructor = Instructor.query.all()
        instructor_dict = [instructor.to_dict() for instructor in instructor]

        response = make_response(
            instructor_dict,
            200
        )
    return response






if __name__ == '__main__':
    app.run(port=5555, debug=True)

