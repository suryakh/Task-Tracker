from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
from server import mysql

tasks = Blueprint("tasks",__name__)

@tasks.route('/add',methods=["GET","POST"])
def taskData():
    if request.method == "GET":
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
    else:
        taskName = request.json['taskName']
        projectName = request.json['projectName']
        token = request.headers.get('Authorization')
        encoded_data = token.split(' ')[1]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """INSERT INTO taskList (taskName,projectName,userid,currStatus,startTime) values(%s,%s,%s,0,now())""",(taskName,projectName,decode_data['id'])
            )
            mysql.connection.commit()
            print(taskName,projectName)
            return json.dumps({"message":'successfully submited'})
        except:
            return json.dumps({'message':'error'}),400 
    