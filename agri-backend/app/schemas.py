from pydantic import BaseModel,Field
import motor.motor_asyncio
from dotenv import load_dotenv
from bson import ObjectId
import os
from typing import Annotated,Optional

load_dotenv('.env')

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))

db = client["agri"]
collection = db["sensor_data"]

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")



class SensorData(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    N: int = Field(...,ge=0,description="Nitrogen content in the soil (in ppm)")
    P: int = Field(...,ge=0,description="Phosphorous content in the soil (in ppm)")
    K: int = Field(...,ge=0,description="Pottasium content in the soil (in ppm)")
    moisture:float = Field(...,ge=0,description="Soil moisture percentage")
    temperature:float = Field(...,ge=0,description="Temperature in Celsius")
    humidity:float = Field(...,ge=0,description="Relative humidity percentage")
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "N": 50,
                "P": 50,
                "K": 50,
                "moisture": 60,
                "temperature": 20.87,
                "humidity": 82.31
            }
        }

    
class SensorDataResponse(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    N: int = Field(...,ge=0,description="Nitrogen content in the soil (in ppm)")
    P: int = Field(...,ge=0,description="Phosphorous content in the soil (in ppm)")
    K: int = Field(...,ge=0,description="Pottasium content in the soil (in ppm)")
    moisture:float = Field(...,ge=0,description="Soil moisture percentage")
    temperature:float = Field(...,ge=0,description="Temperature in Celsius")
    humidity:float = Field(...,ge=0,description="Relative humidity percentage")
    date : str = Field(...)
    time : str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "N": 50,
                "P": 50,
                "K": 50,
                "moisture": 60,
                "temperature": 20.87,
                "humidity": 82.31,
                "date":"2024-04-19",
                "time":"07:41:19"
            }
        }
    
class Crop(BaseModel):
    nitrogen: int = Field(...,ge=0)
    phosphorous: int = Field(...,ge=0)
    pottasium: int = Field(...,ge=0)
    ph: float = Field(...)
    rainfall: float = Field(...)
    state: str = Field(...,min_length=2)
    city:str = Field(...,min_length=2)

class Fertilizer(BaseModel):
    nitrogen: int = Field(...,ge=0)
    phosphorous: int = Field(...,ge=0)
    pottasium: int = Field(...,ge=0)
    moisture:int = Field(...,ge=0)
    soil:str = Field(...,min_length=2)
    crop:str = Field(...,min_length=2)
    state: str = Field(...,min_length=2)
    city:str = Field(...,min_length=2)


    
        
    