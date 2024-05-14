
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
    colors: ['#2196F3', '#4CAF50', '#00BCD4'],
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
      width="70%"
    />
  );
};

export default PieChart;
