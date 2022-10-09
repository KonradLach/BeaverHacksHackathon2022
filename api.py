#from crypt import methods
import datetime as dt
import requests
import json
import nautical_calculations

from flask import Flask
from flask import request


import json
from nautical_calculations import convert_to_miles, get_distance

with open("data.json", 'r') as my_json:
    json_dict = json.load(my_json)

def nearby_resorts(lat, lng, distance_in_miles):
    """
    Takes lat, lng coordinates, distance(mi) as parameters, then prints out a list of nearby resorts that are
    less than or equal to the passed in distance in miles.
    """

    all_resorts = json_dict["skiAreas"]["skiArea"]
    closest_four = []
    for index in range(len(all_resorts)):

        if all_resorts[index].get('georeferencing') == None:
            continue
        elif all_resorts[index]['georeferencing'].get('@lat') == None:
            continue
        else:
            resort_lat = all_resorts[index]['georeferencing']['@lat']
            resort_lng = all_resorts[index]['georeferencing']['@lng']
            resort_name = all_resorts[index]['name']
            resort_id = all_resorts[index]['@id']

        distance_from_resort = convert_to_miles(get_distance(lat, lng, resort_lat, resort_lng))

        # if distance from resort is less than or equal to 100 miles, print the resort name
        # can change to return resort
        if distance_from_resort <= distance_in_miles:
            if len(closest_four) < 4:
                closest_four.append([resort_name, distance_from_resort, resort_id])
            elif len(closest_four) == 4:
                for x in closest_four:
                    if x[1] > distance_from_resort:
                        closest_four.remove(x)
                        closest_four.append([resort_name, distance_from_resort, resort_id])
                        break

            # print(f'{resort_name}: {round(distance_from_resort, 2)} miles away')
    closest_four_ids = []
    for x in (closest_four):
        closest_four_ids.append(x[2])

    return closest_four_ids




BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "66d7fecb1ff378f6d549b766038d5ff3"
#put API key into text file read from

#CORS(app)
app = Flask(__name__)


def kelvin_to_fahrenheit(kelvin):
    celsius = kelvin -273.15
    fahrenheit = celsius * (9/5) + 32
    return int(fahrenheit)


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
    compiled_snow = []
    for resort in resort_list:
        lat = resort[0]
        lon = resort[1]
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={float(lat)}&lon={float(lon)}&appid={API_KEY}"
        data = requests.get(url).json()
        temp_kelvin = data['main']['temp']
        compiled_fahr.append(kelvin_to_fahrenheit(temp_kelvin))

        description = data['weather'][0]['description']
        compiled_desc.append(description)
        if "snow" in data:
            snow = data['snow']['1h']
        else:
            snow = 0
        compiled_snow.append(snow)

    big_array = []
    for index in range(4):
        big_array.append(compiled_desc[index])
        big_array.append(compiled_fahr[index])
        big_array.append(compiled_snow[index])
    print(big_array)

    return json.dumps(big_array)


@app.route("/four", methods=["GET","POST"], strict_slashes=False)
def closest_four():
    lat = request.json["latitude"]
    lon = request.json["longitude"]
    list_4 = nearby_resorts(float(lat), float(lon), 100)
    return json.dumps(list_4)


@app.route("/count", methods=["GET"], strict_slashes=False)
def get_count():
    import torch
    import numpy as np
    import json

    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

    imgs = ['ski1.jpg', 'ski2.jpg', 'ski3.jpg', 'ski4.jpg']

    count_list = []

    for image in imgs:
        results = model(image)
        results.xyxy[0]
        df_results = results.pandas().xyxy[0]
        np.sum(df_results['name'] == 'person')

        count = np.sum(df_results['name'] == 'person')
        count_list.append(str(count))
        # print(df_results)
        # print(count)
        # results.show()
        count = 0

    return json.dumps(count_list)
