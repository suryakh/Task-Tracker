from flask import Flask
from flask_cors import CORS
import json
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)
CORS(app)
app.config['MYSQL_HOST'] = 'us-cdbr-east-05.cleardb.net'
app.config['MYSQL_USER'] = 'b43f326f92233a'
app.config['MYSQL_PASSWORD'] = 'df660649'
app.config['MYSQL_DB'] = 'heroku_b5129b8504a2093'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route('/')
def check():
    return "1stapi"

from Blueprint_auth import auth
from Bluprint_project import projects
from Blueprint_task import tasks

app.register_blueprint(auth,url_prefix="/auth")
app.register_blueprint(projects,url_prefix="/projects")
app.register_blueprint(tasks,url_prefix="/task")
