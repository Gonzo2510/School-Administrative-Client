from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!


class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    grade = db.Column(db.Float)  # user submittable attribute

    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

    def serialize(self):
        return{
            'id': self.id,
            'student_id': self.student_id,
            'course_id': self.course_id,
            'grade': self.grade,
        }

    serialize_rules = (
        '-student_id',
        '-course_id', 
        '-student.email', 
        '-student.enrollments', 
        '-student.courses', 
        '-course.department', 
        '-course.instructor', 
        '-course.instructor_id',
        '-course.department_id',
        '-course.description',
        '-course.enrollments',
        '-course.students',
  
        )


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    # relationship mapping student to related courses
    enrollments = db.relationship('Enrollment', back_populates='student')
    courses = db.relationship('Course', secondary='enrollments', back_populates='students', overlaps="students,enrollments")

    # serialization rules
    serialize_rules = ('-enrollments.student', '-enrollments.course', '-courses.students')

    # add validation
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Student name is required')
        return name

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Student email is required')
        return email

    def __repr__(self):
        return f'<Student {self.name}>'


class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)

    # Foreign key referencing the Instructor/Department table
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructors.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    # relationship mapping course to related enrollments
    enrollments = db.relationship('Enrollment', back_populates='course')

    # relationship mapping course to related students
    students = db.relationship('Student', secondary='enrollments', back_populates='courses', overlaps="courses,enrollments")

    # Relationship to the Instructor table
    instructor = db.relationship("Instructor", back_populates='courses')

    department = db.relationship('Department', back_populates='courses')

    # add serialization rules
    serialize_rules = (
        '-enrollments.course', 
        '-students.courses', 
        '-instructor.courses', 
        '-department.courses'
                       )

    # add validation
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Course name is required')
        return name

    def __repr__(self):
        return f'<Course {self.name}>'


class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Add relationships
    courses = db.relationship('Course', back_populates='department')

    serialize_rules = ('-courses.department',)

    def __repr__(self):
        return f'<Department {self.id}, {self.name}>'


class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    
    # relationships
    courses = db.relationship('Course', back_populates='instructor')

    # serialization rules
    serialize_rules = ('-courses.instructor',)

    def __repr__(self):
        return f'<Instructor {self.id}, {self.name}>'