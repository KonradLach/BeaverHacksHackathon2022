#from crypt import methods
import datetime as dt
import requests
import json 

#from flask_cors import CORS
from flask import Flask
from flask import request 

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "66d7fecb1ff378f6d549b766038d5ff3"
#put API key into text file read from

#CORS(app)
app = Flask(__name__)


def kelvin_to_fahrenheit(kelvin):
    celsius = kelvin -273.15
    fahrenheit = celsius * (9/5) + 32
    return int(fahrenheit)


# @app.route("/", methods=["POST", "GET"])
# def get_weather_data():
#         lat = request.args.get("lat")
#         lon = request.args.get("lon") 
#         #print(request.args.get("lat"))
#         url = f"https://api.openweathermap.org/data/2.5/weather?lat={float(lat)}&lon={float(lon)}&appid={API_KEY}" 
#         data = requests.get(url).json()
#         print(data)
#         return data

@app.route("/data", methods=["GET","POST"], strict_slashes=False)
def add_articles():

    resort_list = []
    resort1 = request.json['resort1']
    resort_list.append(resort1)
    resort2 = request.json['resort2']
    resort_list.append(resort2)
    resort3 = request.json['resort3']
    resort_list.append(resort3)
    resort4 = request.json['resort4']
    resort_list.append(resort4)

    compiled_fahr = []
    compiled_desc = []
    for resort in resort_list:
        lat = resort[0]
        lon = resort[1]
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={float(lat)}&lon={float(lon)}&appid={API_KEY}" 
        data = requests.get(url).json()
        temp_kelvin = data['main']['temp']
        compiled_fahr.append(kelvin_to_fahrenheit(temp_kelvin))
        description = data['weather'][0]['description']
        compiled_desc.append(description)

    big_array = [] 
    for index in range(4):
        big_array.append(compiled_desc[index])
        big_array.append(compiled_fahr[index])
    print(big_array)

    return json.dumps(big_array)