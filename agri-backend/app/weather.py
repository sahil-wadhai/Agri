import requests
from . import config
def weather_fetch(city_name:str):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    # response_2 = requests.get(complete_url_1)
    x = response.json()
    if x["cod"] != "404":
        y_1 = x["main"]
        # y_2 = x["rain"]
        # print(y_2)
        temperature = round((y_1["temp"] - 273.15), 2)
        humidity = y_1["humidity"]
        # rain = y_2["1h"]
        return [temperature, humidity,200]
    else:
        return []