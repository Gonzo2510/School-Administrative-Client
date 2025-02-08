from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint

from config import db

# Models

class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    grade = db.Column(db.Float)  # user submittable attribute

    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

    serialize_rules = (
        '-student.email',
        '-student.enrollments',
        '-course.enrollments',
    )

    __table_args__ = (
        CheckConstraint('grade BETWEEN 0.00 AND 100.00', name='grade_check'),
    )

    def __repr__(self):
        return f'<Enrollment id={self.id}, student={self.student.name}, course={self.course.name}, grade={self.grade}>'

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    enrollments = db.relationship('Enrollment', back_populates='student', cascade='all, delete-orphan')
    courses = db.relationship('Course', secondary='enrollments', back_populates='students')

    serialize_rules = ('-enrollments', '-courses.students', '-courses.enrollments')

    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) < 1:
            raise ValueError('Student name must have at least one character.')
        return name

    @validates('email')
    def validate_email(self, key, email):
        if not email or '@' not in email:
            raise ValueError('Invalid email format.')
        return email

    def __repr__(self):
        return f'<Student {self.name}>'


class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)

    instructor_id = db.Column(db.Integer, db.ForeignKey('instructors.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    enrollments = db.relationship('Enrollment', back_populates='course', cascade='all, delete-orphan')
    students = db.relationship('Student', secondary='enrollments', back_populates='courses')

    instructor = db.relationship("Instructor", back_populates='courses')
    department = db.relationship('Department', back_populates='courses')

    serialize_rules = ('-enrollments', '-students.courses', '-students.enrollments', '-instructor', '-department')


    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) < 1:
            raise ValueError('Course name must have at least one character.')
        return name

    @validates('description')
    def validate_description(self, key, description):
        if not description or len(description) < 5:
            raise ValueError('Description must have at least 5 characters.')
        return description
    
    def __repr__(self):
        return f'<Course {self.name}>'


class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    courses = db.relationship('Course', back_populates='department')

    serialize_rules = ('-courses',)

    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) < 1:
            raise ValueError('Department name must have at least one character.')
        return name

    def __repr__(self):
        return f'<Department {self.id}, {self.name}>'


class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    courses = db.relationship('Course', back_populates='instructor')

    serialize_rules = ('-courses',)

    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) < 1:
            raise ValueError('Instructor name must have at least one character.')
        return name

    def __repr__(self):
        return f'<Instructor {self.id}, {self.name}>'