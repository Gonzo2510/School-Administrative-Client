from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db

# Models go here!

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    grade = db.Column(db.String(2)) #user submittable attribute

    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    # relationship mapping student to related courses
    enrollments = db.relationship('Enrollment', back_populates = 'student')
    courses = db.relationship('Course', secondary='enrollments', back_populates = "students")

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

    
class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)

    enrollments = db.relationship("Enrollment", back_populates='course')
    
    # Foreign key referenceing the Instructor/Department table
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructors.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    # relationship mapping course to related students
    students = db.relationship('Student', secondary='enrollments', back_populates='courses')

    # Relationship to the Instructor table
    instructor = db.relationship("Instructor", back_populates='courses')

    department = db.relationship('Department', back_populates='courses')

    # add serialization rules
    serialize_rules = ('-instructor.course', '-students.courses', '-department.courses', 'instructor.name', 'department.name')

    # add validation
    @validates('name')
    def validates_name(self, key, name):
        if name:
            return name
        else:
            raise ValueError('Course name is required')

    def __repr__(self):
        return '<Course %r>' % self.name 


class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Add relationships
    courses = db.relationship('Course', back_populates='department')
    # course

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




