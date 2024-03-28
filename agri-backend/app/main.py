from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import config
import requests

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None


@app.get("/")
def read_root():
    return {"api": "Agrisense-api"}

@app.post("/crop-recommend")
def crop_recommend():
    return {"crop": "CCCC"}

@app.post("/fertilizer-recommend")
def fertilizer_recommend():
    return {"fertilizer": "FFFFFF"}
