import os
import requests,json
from flask import Flask, session,render_template,jsonify,request
from flask_socketio import SocketIO, emit
from werkzeug.wrappers import Request, Response


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = {}

@app.route("/")
def index():
    return render_template("index.html" ,data = json.dumps(channels))

@app.route("/messanger", methods=["POST"])
def messanger():
    channel_name = request.form['new_channels_name']
    print('ah'+channel_name)
    if (channel_name not in channels):
        channels[channel_name] = ["bale"]
        return jsonify({"success":True ,"channel":channel_name})
    else:
        return jsonify({"success":False})
@socketio.on("send message")
def message(data):
    print("gereftam")
    message = data["message"]
    user = data["user"]
    channel_name = data["channel_name"]
    new_message = []
    new_message.append(user)
    new_message.append(message)
    channels[channel_name].append(new_message)
    emit("announce message",{"message":new_message, "channel_name":channel_name},broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
