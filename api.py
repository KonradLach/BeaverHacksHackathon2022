#from crypt import methods
import datetime as dt
import requests

#from flask_cors import CORS
from flask import Flask
from flask import request 

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "1b824085243b6de3648599ac63892832"
#put API key into text file read from

#CORS(app)
app = Flask(__name__)

@app.route("/", methods=["GET"])
def get_weather_data():
    lat = request.args.get("lat")
    lon = request.args.get("lon") 
    #print(request.args.get("lat"))
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={float(lat)}&lon={float(lon)}&appid={API_KEY}" 
    data = requests.get(url).json()
    return data

