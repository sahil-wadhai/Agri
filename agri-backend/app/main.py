from typing import Union

from fastapi import FastAPI,HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from . import config
from .fertilizer import fertilizer_dic
import requests
from .schemas import Crop,Fertilizer
import pickle
import numpy as np
import pandas as pd

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

# Importing Models
# crop_recommendation_model_path = 'models/crop.pkl'
# crop_recommendation_model = pickle.load(
#     open(crop_recommendation_model_path, 'rb'))

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
        return [temperature, humidity]
    else:
        return []


@app.get("/")
def read_root():
    return {"api": "Agrisense-api"}

@app.post("/crop-recommend")
async def crop_recommend(body:Crop):
    try:
        data = jsonable_encoder(body)
        N = int(data['nitrogen'])
        P = int(data['phosphorous'])
        K = int(data['pottasium'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

        # state = request.form.get("stt")
        city = data['city']
        if weather_fetch(city) != None:
            temperature, humidity = weather_fetch(city)
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            print(temperature,humidity)
            # my_prediction = crop_recommendation_model.predict(data)
            # final_prediction = my_prediction[0]
            final_prediction = "Apple"
        return {"crop":final_prediction}
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")

@app.post("/fertilizer-recommend")
def fertilizer_recommend(body:Fertilizer):
    try:
        data = jsonable_encoder(body)
        N = int(data['nitrogen'])
        P = int(data['phosphorous'])
        K = int(data['pottasium'])
        moisture = int(data['moisture'])
        soil = str(data['soil'])
        crop = str(data['crop'])

        crop= crop.lower()
        df = pd.read_csv('notebooks/fertilizer_0.csv')
        nr = df[df['Crop'] == crop]['N'].iloc[0]
        pr = df[df['Crop'] == crop]['P'].iloc[0]
        kr = df[df['Crop'] == crop]['K'].iloc[0]
        
        n = nr - N
        p = pr - P
        k = kr - K
        temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
        max_value = temp[max(temp.keys())]
        if max_value == "N":
            if n < 0:
                key = 'NHigh'
            else:
                key = "Nlow"
        elif max_value == "P":
            if p < 0:
                key = 'PHigh'
            else:
                key = "Plow"
        else:
            if k < 0:
                key = 'KHigh'
            else:
                key = "Klow"

        city = data['city']
        if weather_fetch(city) != None:
            temperature, humidity = weather_fetch(city)
            data = np.array([[N, P, K, temperature, humidity, moisture, soil, crop]])
            print(temperature,humidity)
            # my_prediction = fertilizer_recommendation_model.predict(data)
            # final_prediction = my_prediction[0]
            final_prediction = "Urea"
            advice = fertilizer_dic[key]
            print(advice)
            return {"fertilizer":final_prediction,"advice":advice}
        else:
            return {"fertilizer":"","advice":""}
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    
