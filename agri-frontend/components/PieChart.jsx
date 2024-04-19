'use client'
import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const series = Object.values(data);
  const labels = Object.keys(data);

  const options = {
    chart: {
      type: 'pie',
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="40%"
    />
  );
};

export default PieChart;
