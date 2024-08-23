#!/usr/bin/env python3

# Standard library imports
from flask import request, make_response, jsonify

# Remote library imports
from flask_restful import Resource

# Local imports
from config import app, db
from models import Student, Course, Department, Instructor, Enrollment
from seed import seed_database


# Views go here!
@app.route('/')
def index():
    return (
        '<h1>Project Server</h1>'
        '<button onclick="window.location.href=\'/run-seed\'">Clear and seed Database</button>'
    )

@app.route('/run-seed', methods=['GET'])
def run_seed():
    try:
        with app.app_context():
            seed_database()
        return (
            "<h2>Database seeded successfully!<h2/>"
            "<br><a href='/'>Go Back</a>"
        )

        # Return the output to the browser
    except Exception as e:
        return f"<h1>Error</h1><pre>{str(e)}</pre><br><a href='/'>Go Back</a>"


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

@app.route('/student/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def student_by_id(id):
    student = Student.query.filter(Student.id == id).first()
    
    if student:
        if request.method == 'GET':
            student_dict = student.to_dict()

            response = make_response(
                student_dict,
                200
            )

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


@app.route('/course/<int:id>', methods= ["GET", "DELETE", "PATCH"])
def course_by_id(id):
    course = Course.query.filter(Course.id == id).first()

    if course:
        if request.method == 'GET':
            course_dict = course.to_dict()

            response = make_response(
                course_dict,
                200
            )

        elif request.method == "DELETE":
            db.session.delete(course)
            db.session.commit()

            response = make_response(
                {},
                204
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(course, attr, form_data.get(attr))
                    db.session.commit()

                    response = make_response(
                        course.to_dict(), 
                        202
                    )
            except ValueError:
                response = make_response(
                    { "error": "validation error"},
                    404
                )

    else:
        response = make_response(
            { "error": "Course not found" },
            404
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

@app.route('/department/<int:id>', methods= ["GET", "DELETE"])
def department_by_id(id):
    department = Department.query.filter(Department.id == id).first()

    if department:
        if request.method == 'GET':
            department_dict = department.to_dict()

            response = make_response(
                department_dict,
                200
            )

        elif request.method == "DELETE":
            db.session.delete(department)
            db.session.commit()

            response = make_response(
                {},
                204
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(department, attr, form_data.get(attr))
                    db.session.commit()

                    response = make_response(
                        department.to_dict(), 
                        202
                    )
            except ValueError:
                response = make_response(
                    { "error": "validation error"},
                    404
                )

    else:
        response = make_response(
            { "error": "Department not found" },
            404
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


@app.route('/instructor/<int:id>', methods= ["GET", "DELETE", "POST"])
def delete_instructor(id):
    instructor = Instructor.query.filter(Instructor.id == id).first()

    if instructor:
        if request.method == 'GET':
            instructor_dict = instructor.to_dict()

            response = make_response(
                instructor_dict,
                200
            )
        elif request.method == "DELETE":

            db.session.delete(instructor)
            db.session.commit()

            response = make_response(
                {},
                204
            )

        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(instructor, attr, form_data.get(attr))
                    db.session.commit()

                    response = make_response(
                        instructor.to_dict(), 
                        202
                    )
            except ValueError:
                response = make_response(
                    { "error": "validation error"},
                    404
                )

    else:
        response = make_response(
            { "error": "Instructor not found" },
            404
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

