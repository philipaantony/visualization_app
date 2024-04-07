import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

function PieChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/distinctTopicsWithCount');
        const filteredData = await response.json();

        // Filter out the sector to be ignored (e.g., "Energy")
        

        // Update chartData state
        setChartData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const drawGooglePieChart = () => {
    // Prepare data in the required format for Google Charts
    const chartDataFormatted = [['Category', 'Count']].concat(
      chartData.map(({ _id, count }) => [_id, count])
    );

    // Set options for the pie chart
    const options = {
      title: 'Distinct Topics with Count',
    };

    return (
      <Chart
        chartType="PieChart"
        data={chartDataFormatted}
        options={options}
        graph_id="PieChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  };

  return <div>{drawGooglePieChart()}</div>;
}

export default PieChart;
