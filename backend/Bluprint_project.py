from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
from server import mysql

projects = Blueprint("projects",__name__)

@projects.route('/list',methods=["GET"])
def sentProjects():
    token = request.headers.get('Authorization')
    encoded_data = token.split(' ')[1]
    try:
        decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
        """SELECT * FROM projects"""
        )
        results = cursor.fetchall()
        cursor.close()
        items = []
        for item in results:
            items.append(item)
        return jsonify(items)
    except:
        return json.dumps({'message':'error'}),400 
    