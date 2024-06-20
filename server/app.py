#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Student, Course, Department, Instructor, Enrollment

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/students', methods=['GET', 'POST'])
def students():
    if request.method == 'GET':
        students = Student.query.all()

        students_dict = [student.to_dict() for student in students]

        response = make_response(
            students_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_student_obj = Student(
                name = form_data['name'],
                email = form_data['email']
            )
            db.session.add(new_student_obj)
            db.session.commit()

            response = make_response(
                new_student_obj.to_dict(),
                201
            )

        except ValueError:
            response = make_response(
                {"error": ["validation error"]},
                400
            )
    return response

@app.route('/students/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def student_by_id(id):
    student = Student.query.filter(Student.id == id).first()
    
    if student:
        if request.method == 'DELETE':
            # delete enrollments for student
            enrollments = Enrollment.query.filter_by(student_id=id).all()
            for enrollment in enrollments:
                db.session.delete(enrollment)

            # delete student
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

        if request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(student, attr, form_data.get(attr))
                    db.session.commit()

                    response = make_response(
                        student.to_dict(), 
                        202
                    )
            except ValueError:
                response = make_response(
                    { "error": "validation error"},
                    404
                )
        
        return response
    
    else:
        response = make_response(
            { "error": "Student not found" },
            404
        )
    return response

@app.route('/courses', methods=['GET', 'POST'])
def courses():
    if request.method == 'GET':

        courses = Course.query.all()
        courses_dict = [course.to_dict() for course in courses]

        response = make_response(
            courses_dict,
            200
        )

    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_course_obj = Course(
                name = form_data['name'],
                description = form_data['description']
            )
            db.session.add(new_course_obj)
            db.session.commit()

            response = make_response(
                new_course_obj.to_dict(),
                201
            )

        except ValueError:
            response = make_response(
                {"error": ["validation error"]},
                400
            )

    return response


@app.route('/courses/<int:id>', methods= ["DELETE"])
def delete_course(id):
    if request.method == "DELETE":
        course = Course.query.filter(Course.id == id).first()

        db.session.delete(course)
        db.session.commit()

        response = make_response(
            {},
            204
        )

        return response


@app.route('/departments', methods=['GET', 'POST'])
def departments():
    if request.method == 'GET':

        departments = Department.query.all()
        departments_dict = [department.to_dict() for department in departments]

        response = make_response(
            departments_dict,
            200
        )
        
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_department_obj = Department(
                name = form_data['name'],
            )
            db.session.add(new_department_obj)
            db.session.commit()

            response = make_response(
                new_department_obj.to_dict(),
                201
            )

        except ValueError:
            response = make_response(
                {"error": ["validation error"]},
                400
            )

    return response
    
@app.route('/instructors', methods=['GET', 'POST'])
def instructor():
    if request.method == 'GET':

        instructors = Instructor.query.all()
        instructor_dict = [instructor.to_dict() for instructor in instructors]

        response = make_response(
            instructor_dict,
            200
        )

    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_instructor_obj = Instructor(
                name = form_data['name'],
            )
            db.session.add(new_instructor_obj)
            db.session.commit()

            response = make_response(
                new_instructor_obj.to_dict(),
                201
            )

        except ValueError:
            response = make_response(
                {"error": ["validation error"]},
                400
            )

    return response


@app.route('/enrollments', methods=['GET','POST'])
def create_enrollment():

    if request.method == 'GET':

        enrollments = Enrollment.query.all()
        enrollment_dict = [enrollment.to_dict() for enrollment in enrollments]

        response = make_response(
            enrollment_dict,
            200
        )
        return response

    elif request.method == 'POST':
        data = request.get_json()
        print("")
        print("")
        print(data)
        print("")
        print("")
        new_enrollment = Enrollment(
            student_id=data['student_id'],
            course_id=data['course_id'],
            grade=data['grade']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return jsonify(new_enrollment.serialize()), 201




if __name__ == '__main__':
    app.run(port=5555, debug=True)

