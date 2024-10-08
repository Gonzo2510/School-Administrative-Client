# Standard library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import os



# Instantiate Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
SQLALCHEMY_TRACK_MODIFICATIONS = False

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
# CORS(app, resources={r"/*": {"origins": "https://python-p5-project.onrender.com"}})
CORS(app)

