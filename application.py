import os
import requests
from flask import Flask, session,render_template,jsonify,request
from flask_socketio import SocketIO, emit
from werkzeug.wrappers import Request, Response


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/messanger", methods=["POST"])
def messanger():
    channel_name = request.form['new_channels_name']
    print('ah'+channel_name)
    if (channel_name not in channels):
        channels.append(channel_name)
        return jsonify({"success":True ,"channel":channel_name})
    else:
        return jsonify({"success":False})
