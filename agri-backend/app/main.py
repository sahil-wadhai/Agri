from typing import Union

from fastapi import FastAPI,HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from .fertilizer import fertilizer_dic
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

        crop= crop.lower()
        df = pd.read_csv('notebooks/datasets/fertilizer_0.csv')
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
    
