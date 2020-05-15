from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
from server import mysql

tasks = Blueprint("tasks",__name__)

@tasks.route('/add',methods=["GET","POST","PATCH"])
def taskData():
    if request.method == "GET":
        token = request.headers.get('Authorization')
        encoded_data = token.split(' ')[1]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """SELECT * FROM taskList where currStatus = '0'"""
            )
            results = cursor.fetchall()
            cursor.close()
            items = []
            for item in results:
                items.append(item)
            return jsonify(items)
        except:
            return json.dumps({'message':'error'}),400 
    elif request.method == "POST":
        taskName = request.json['taskName']
        projectName = request.json['projectName']
        endTime = request.json['endTime'],
        timeToFinish = request.json['timeToFinish']
        token = request.headers.get('Authorization')
        encoded_data = token.split(' ')[1]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """INSERT INTO taskList (taskName,projectName,userId,currStatus,startTime,endTime,timeAllocated) values(%s,%s,%s,0,now(),%s,%s)""",(taskName,projectName,decode_data['id'],endTime,timeToFinish)
            )
            print("hi")
            mysql.connection.commit()
            print(taskName,projectName)
            return json.dumps({"message":'successfully submited'})
        except:
            return json.dumps({'message':'error'}),400 
    else:
        id = request.json ['id']
        timeValue = request.json ['time']
        token = request.headers.get('Authorization')
        encoded_data = token.split(' ')[1]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            print(id)
            cursor.execute(
            """UPDATE taskList SET currStatus = 1 ,overalTime= %s where id = %s""",(timeValue,id)
            )
            mysql.connection.commit()
            # print(taskName,projectName)
            return json.dumps({"message":'successfully submited'})
        except:
            return json.dumps({'message':'error'}),400 

@tasks.route('/alllist',methods=["GET"])
def allTasks():
    token = request.headers.get('Authorization')
    encoded_data = token.split(' ')[1]
    try:
        decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
        """SELECT * FROM taskList where userId = %s""",(decode_data['id'],)
        )
        results = cursor.fetchall()
        cursor.close()
        items = []
        for item in results:
            items.append(item)
        return jsonify(items)
    except:
        return json.dumps({'message':'error'}),400 