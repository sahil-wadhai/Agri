'use client'
import React from 'react';
import LineChart from '@/components/LineChart';
import PieChart from '@/components/PieChart';
const App = () => {
  const pie_data = {
    N: 50,
    P: 30,
    K: 20,
  };
  const line_data = {
    Temperature: [
      [new Date('2024-04-20T08:00:00Z').getTime(), 25],
      [new Date('2024-04-20T09:00:00Z').getTime(), 30],
      [new Date('2024-04-20T10:00:00Z').getTime(), 35],
      [new Date('2024-04-20T11:00:00Z').getTime(), 20],
      // Add more data points as needed
    ],
    Humidity: [
      [new Date('2024-04-20T08:00:00Z').getTime(), 40],
      [new Date('2024-04-20T09:00:00Z').getTime(), 50],
      [new Date('2024-04-20T10:00:00Z').getTime(), 60],
      [new Date('2024-04-20T11:00:00Z').getTime(), 55],
      // Add more data points as needed
    ],
    Moisture: [
      [new Date('2024-04-20T08:00:00Z').getTime(), 70],
      [new Date('2024-04-20T09:00:00Z').getTime(), 75],
      [new Date('2024-04-20T10:00:00Z').getTime(), 60],
      [new Date('2024-04-20T11:00:00Z').getTime(), 55],
      // Add more data points as needed
    ]
    
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

  const formattedData = {
    Temperature: data.map(({ date, time, temperature }) => [new Date(`${date}T${time}Z`).getTime(), temperature]),
    Humidity: data.map(({ date, time, humidity }) => [new Date(`${date}T${time}Z`).getTime(), humidity]),
    Moisture: data.map(({ date, time, moisture }) => [new Date(`${date}T${time}Z`).getTime(), moisture]),
  };
  console.log(formattedData);
  

  const ph_data = {
    SoilPH: [
      [new Date('2024-04-20T08:00:00Z').getTime(), 6.5],
      [new Date('2024-04-20T09:00:00Z').getTime(), 6.8],
      // Add more data points as needed
    ]
  };
  console.log(ph_data);

  return (
    <div className="app">
      <LineChart data={formattedData} />
      <PieChart data={pie_data} />
      <LineChart data={ph_data} />
    </div>
  );
};

export default App;