from typing import Union

from fastapi import FastAPI,HTTPException,status,Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from .fertilizer import advice_dict,fertilizer_dict,croptype_dict,soil_dict
from .crop import crop_dict
from .weather import weather_fetch
from .schemas import Crop,Fertilizer,SensorData,SensorDataResponse,collection
import pickle
import numpy as np
import pandas as pd
from datetime import date,datetime
from bson.objectid import ObjectId

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

        # state = request.form.get("stt")
        city = data['city']
        if weather_fetch(city) != None:
            temperature, humidity, rainfall = weather_fetch(city)
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
        advice = str(advice_dict[key])

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
            temparature, humidity,rainfall = weather_fetch(city)
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
    
@app.post("/sensor-save",response_description="Save sensor data",response_model=SensorDataResponse)
async def save_sensor_data(sensor_data:SensorData):
    try:
        # sensor_data_dict = sensor_data.dict(exclude={"id"})
        sensor_data_dict = jsonable_encoder(sensor_data)
        sensor_data_dict["date"] = str(date.today())
        sensor_data_dict["time"] = str(datetime.now().strftime("%H:%M:%S"))
        new_data = await collection.insert_one(sensor_data_dict)
        created_instance = await collection.find_one({"_id":new_data.inserted_id})
        return created_instance
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")

@app.get("/sensor-get")
async def get_sensor_data():
    try:
        result = collection.find().sort([("date", -1), ("time", -1)]).limit(5)
        
        # Calculate average of the attributes
        total_N = 0
        total_P = 0
        total_K = 0
        total_temperature = 0
        total_humidity = 0
        total_moisture = 0
        total_docs = 0
        total_ph = 0
        async for item in result:
            total_temperature += item.get('temperature', 0)
            total_humidity += item.get('humidity', 0)
            total_moisture += item.get('moisture', 0)
            total_N += item.get('N', 0)
            total_P += item.get('P', 0)
            total_K += item.get('K', 0)
            total_ph += item.get('ph', 0)
            total_docs += 1
        
        # Calculate averages
        average_temperature = total_temperature / total_docs if total_docs > 0 else 0
        average_humidity = total_humidity / total_docs if total_docs > 0 else 0
        average_moisture = total_moisture / total_docs if total_docs > 0 else 0
        average_N = total_N / total_docs if total_docs > 0 else 0
        average_P = total_P / total_docs if total_docs > 0 else 0
        average_K = total_K / total_docs if total_docs > 0 else 0
        average_ph = total_ph / total_docs if total_docs > 0 else 0
        # Create a new document with the average values
        new_document = {
            "N":average_N,
            "P" : average_P,
            "K" : average_K,
            "temperature": average_temperature,
            "humidity": average_humidity,
            "moisture": average_moisture,
            "ph":average_ph
        }
        
        return new_document


    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")