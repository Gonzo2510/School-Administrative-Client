# Standard library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    def __init__(self):
        db_base_url = os.getenv('DATABASE_URL')
        db_password = os.getenv('DB_PASSWORD')
        if db_base_url and db_password:
            self.SQLALCHEMY_DATABASE_URI = db_base_url.replace('://', f':{db_password}@')
            print(f"Database URI: {self.SQLALCHEMY_DATABASE_URI}")
        else:
            raise ValueError("DATABASE_URL or DB_PASSWORD not set in environment variables")

# Instantiate Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Define metadata and instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

# Initialize db with app
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, resources={r"/*": {"origins": "https://python-p5-project.onrender.com"}})
