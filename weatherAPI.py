import datetime as dt
import requests #need this module imported -pip import requests (if you don't already have)


BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "1b824085243b6de3648599ac63892832"
CITY = "Portland"


url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY

response = requests.get(url).json()


def kelvin_to_celsius_fahrenheit(kelvin):
    celsius = kelvin -273.15
    fahrenheit = celsius * (9/5) + 32
    return celsius, fahrenheit

temp_kelvin = response['main']['temp']
temp_celsius, temp_fahrenheit = kelvin_to_celsius_fahrenheit(temp_kelvin)
feels_like_kelvin = response['main']['feels_like']
feels_like_celsius, feels_like_fahrenheit = kelvin_to_celsius_fahrenheit(feels_like_kelvin)
humidity = response['main']['humidity']
description = response['weather'][0]['description']
sunrise_time = dt.datetime.utcfromtimestamp(response['sys']['sunrise'] + response['timezone'])
sunset_time = dt.datetime.utcfromtimestamp(response['sys']['sunset'] + response['timezone'])
wind_speed = response['wind']['speed']

print(f"Temperature in {CITY}: {temp_celsius: .2f}°C or {temp_fahrenheit: .2f}°F")
print(f"Temperature in {CITY}: feels like:{feels_like_celsius: .2f}°C or {feels_like_fahrenheit: .2f}°F")
print(f"Humidty in {CITY}: {humidity}%") 
print(f"Wind Speed in {CITY}: {wind_speed} m/s")
print("General Weather in{CITY}: {description}")
print(f"Sun rises in {CITY}: {description}")
print(f"Sun rises in {CITY} at {sunrise_time} local time.")
print(f"Sun sets in {CITY} at {sunset_time} local time.")









