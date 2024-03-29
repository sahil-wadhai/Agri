from typing import Union

from fastapi import FastAPI,HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from .fertilizer import advice_dict,fertilizer_dict,croptype_dict,soil_dict
from .crop import crop_dict
from .weather import weather_fetch
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
crop_model_path = 'notebooks/models/crop.pkl'
crop_model = pickle.load(open(crop_model_path, 'rb'))
sc = pickle.load(open('notebooks/models/standscaler.pkl','rb'))
ms = pickle.load(open('notebooks/models/minmaxscaler.pkl','rb'))
fertilizer_model = pickle.load(open('notebooks/models/fertilizer.pkl', 'rb'))


@app.get("/")
def read_root():
    return {"api": "Agrisense-api"}

@app.post("/crop-recommend")
def crop_recommend(body:Crop):
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
            feature_list = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            single_pred = np.array(feature_list).reshape(1, -1)
            scaled_features = ms.transform(single_pred)
            final_features = sc.transform(scaled_features)

            my_prediction = crop_model.predict(final_features)
            final_prediction = my_prediction[0]
            
            
            if final_prediction in crop_dict:
                crop = crop_dict[final_prediction]
            else:
                crop = "Not found"
        return {"crop":crop}
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

        soil_index = 0
        for x in soil_dict:
            if soil == soil_dict[x]:
                soil_index = x

        croptype_index = 0
        for x in croptype_dict:
            if crop == croptype_dict[x]:
                croptype_index = x

        city = data['city']
        if weather_fetch(city) != None:
            temparature, humidity = weather_fetch(city)
            feature_list = np.array([[temparature,	humidity,	moisture,	soil_index,	croptype_index,	N,	K,	P]]).reshape(1, -1)
            my_prediction = fertilizer_model.predict(feature_list)
            final_prediction = my_prediction[0]
            advice = advice_dict["NHigh"]
            if final_prediction in fertilizer_dict:
                fertilizer = fertilizer_dict[final_prediction]
            else:
                fertilizer = "Not found"
            return {"fertilizer":fertilizer,"advice":advice}
        else:
            return {"fertilizer":"","advice":"<li><li>"}
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    
