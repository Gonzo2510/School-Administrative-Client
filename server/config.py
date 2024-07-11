# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import os

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('postgresql://project_5_db_4k8v_user:t8oXtYeWj7z28AXSpNAl2EHswpLTaIIX@dpg-cq2pe1g8fa8c73ant3og-a.oregon-postgres.render.com/project_5_db_4k8v')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, resources={r"/*": {"origins": "https://python-p5-project.onrender.com/"}})
