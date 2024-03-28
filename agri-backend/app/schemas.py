from pydantic import BaseModel,Field

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
    
    
