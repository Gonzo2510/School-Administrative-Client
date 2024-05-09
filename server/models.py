from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db

# Models go here!

# association table
student_course = db.Table('student_course_associations',
     db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
     db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    )

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    # relationship mapping student to related courses
    courses = db.relationship('Course', secondary=student_course, back_populates = "students")

    # serialization rules
    serialize_rules = ('-courses.students', )

    # add validation
    @validates('name')
    def validates_name(self, key, name):
        if name:
            return name
        else:
            raise ValueError('Student name is required')
    
    @validates('email')
    def validates_email(self, key, email):
        if email:
            return email
        else:
            raise ValueError('Student email is required')

    def __repr__(self):
        return '<Student %r>' % self. name 

    
class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)

    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'))

    # relationship mapping course to related students
    students = db.relationship('Student', secondary=student_course, back_populates='courses')
    instructor = db.relationship("Instructor", back_populates='courses')

    # add serialization rules
    serialize_rules = ('-instructor.course', '-students.courses' )

    # add validation
    @validates('name')
    def validates_name(self, key, name):
        if name:
            return name
        else:
            raise ValueError('Course name is required')

    def __repr__(self):
        return '<Course %r>' % self.name 


class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Add relationships

    def __repr__(self):
        return f'<Department {self.id}, {self.name}>'

class Instructor(db.Model):
    __tablename__ = 'instructors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    

    # relationships
    courses = db.relationship('Course', back_populates='instructors')

    # serialization rules
    serialize_rules = ('-courses.instructor', )

    def __repr__(self):
        return f'<Instructor {self.id}, {self.name}>'




