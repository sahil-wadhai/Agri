'use client'
import {useState,useEffect} from 'react';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';
const App = () => {
  const [sensor_data,setSensorData] = useState([])
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [pottasium, setPottasium] = useState("");
  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await fetch('http://127.0.0.1:8000/sensor-readings',{ next: { revalidate: 3600 } });
      const data1 = await response1.json();
      setSensorData(data1);

      const response2 = await fetch('http://127.0.0.1:8000/sensor-get-npk',{ next: { revalidate: 3600 } });
      const data2 = await response2.json();
      setNitrogen(data2.N);
      setPhosphorous(data2.P);
      setPottasium(data2.K);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const pie_data = {
    N: nitrogen,
    P: phosphorous,
    K: pottasium,
  };

  const data = [
    {
      "moisture": 60,
      "temperature": 25,
      "humidity": 80,
      "date": "2024-04-19",
      "time": "08:00:00"
    },
    {
      "moisture": 70,
      "temperature": 30,
      "humidity": 85,
      "date": "2024-04-19",
      "time": "09:00:00"
    },
    {
      "moisture": 80,
      "temperature": 35,
      "humidity": 82,
      "date": "2024-04-19",
      "time": "10:00:00"
    },
    {
      "moisture": 90,
      "temperature": 20,
      "humidity": 85,
      "date": "2024-04-20",
      "time": "11:05:00"
    }
    
  ];
  //console.log(data)
  const formattedData = {
    Temperature: sensor_data.map(({ date, time, temperature }) => [new Date(`${date}T${time}Z`).getTime(), temperature]),
    Humidity: sensor_data.map(({ date, time, humidity }) => [new Date(`${date}T${time}Z`).getTime(), humidity]),
    Moisture: sensor_data.map(({ date, time, moisture }) => [new Date(`${date}T${time}Z`).getTime(), moisture]),
  };
  
  const ph_data = {
    SoilPH: sensor_data.map(({ date, time, ph }) => [new Date(`${date}T${time}Z`).getTime(), ph])
  };
  console.log(sensor_data)
  return (
    <>
      <div className="grid grid-cols-2 p-4 mx-5 bg-[#CECEE4]  gap-4">
        <div className="border-solid border-2  border-gray-400 col-span-2 "><LineChart data={formattedData} /></div>
        <div className=""><PieChart data={pie_data} /></div>
        <div className=""><LineChart data={ph_data} /></div>
      </div>
    </>
  );
};

export default App;