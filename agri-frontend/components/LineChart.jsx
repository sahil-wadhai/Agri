'use client'
import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => {
  const series = Object.entries(data).map(([key, value]) => ({ name: key, data: value }));

  const options = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: [
      {
        min: 0,
        max: 100,
        title: {
          text: 'Values',
        },
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="50%"
      height="400"
    />
  );
};

export default LineChart;

