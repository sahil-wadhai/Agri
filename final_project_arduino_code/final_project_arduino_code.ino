#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

const char* ssid = "xyz";
const char* password = "12345678";
char server[] = "192.168.43.96";

#define DHTPIN 2        // D2 corresponds to GPIO 2
#define DHTTYPE DHT11   // DHT11 sensor
DHT dht(DHTPIN, DHTTYPE);

#define SOIL_MOISTURE_PIN 4  // D4 corresponds to GPIO 4

void setup()
{
    Serial.begin(115200);
    delay(100);
    
    Serial.print("Connecting to: ");
    Serial.println(ssid);
    
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("");
    Serial.println("WiFi Connected");
    Serial.println("Server Started");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
    
    dht.begin(); // Initialize DHT sensor
}

void loop()
{
    delay(2000); // Wait for DHT sensor to stabilize
    
    float humidityData = dht.readHumidity();
    delay(500);
    float temperature = dht.readTemperature();
    delay(500);
    int soilMoisture = analogRead(SOIL_MOISTURE_PIN);
    
    Serial.print("Humidity: ");
    Serial.println(humidityData);
    Serial.print("Temperature: ");
    Serial.println(temperature);
    Serial.print("Moisture: ");
    Serial.println(soilMoisture);
    
    sendToFastAPI(humidityData, temperature, soilMoisture,ph);
    
    delay(20000); // Delay between readings
}

void sendToFastAPI(float humidity, float temperature, int moisture,float ph)
{
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin("http://192.168.43.96:8000/sensor-save");
        http.addHeader("Content-Type", "application/json");

        StaticJsonDocument<200> jsonDoc;
        jsonDoc["humidity"] = humidity;
        jsonDoc["temperature"] = temperature;
        jsonDoc["moisture"] = moisture;
        jsonDoc["ph"] = ph;

        String jsonString;
        serializeJson(jsonDoc, jsonString);
        
        int httpResponseCode = http.POST(jsonString);
        Serial.print("HTTP Response Code: ");
        Serial.println(httpResponseCode);
        
        String payload = http.getString();
        Serial.println(payload);
        
        http.end();
    } else {
        Serial.println("Connection failed");
    }
}