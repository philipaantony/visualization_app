import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allEndYearsWithCount');
        const data = response.data;
        console.log(data);

        if (Array.isArray(data)) {
          setChartData(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      const svg = d3.select(ref.current);
      const width = 900;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 70, left: 70 }; // Adjusted left margin for y-axis labels

      const xScale = d3.scaleBand()
        .domain(chartData.map(d => d._id))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => Math.max(d.count, d.avgLikelihood))])
        .range([height - margin.bottom, margin.top]);

      const countBarWidth = xScale.bandwidth();

      // Add x-axis
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      // Add y-axis
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

      svg.selectAll('.count-bar')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'count-bar')
        .attr('x', d => xScale(d._id))
        .attr('y', d => yScale(d.count))
        .attr('width', countBarWidth)
        .attr('height', d => height - margin.bottom - yScale(d.count))
        .attr('fill', 'lightcoral');

      const likelihoodLineGenerator = d3.line()
        .x(d => xScale(d._id) + countBarWidth / 2)
        .y(d => yScale(d.avgLikelihood));

      svg.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', likelihoodLineGenerator);

      // Optionally, add axes, labels, etc.
    }
  }, [chartData]);

  return (
    <div className="container mt-5">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Histogram: Count and Line: Average Likelihood by End Year</h2>
        <svg ref={ref} width="800" height="400"></svg>
      </div>
    </div>
  </div>
  );
};

export default LineChart;
