import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarGraph = (props) => {
  const [data, setData] = useState([]);
  const intensityKey = props.Intensity; // Assuming Intensity is a property of props

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getminpestle');
        setData(response.data.maxMinIntensityByPestle);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.Intensity]); // Refresh graph when props.Intensity changes

  const svgRef = useRef();

  useEffect(() => {
    // D3.js code for creating the bar graph
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 350;
    const height = 160;

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[intensityKey])]).range([height, 0]);

    // Update bars for min intensity with growing animation
    chart
      .selectAll('.min-bar')
      .data(data)
      .join('rect')
      .attr('class', 'min-bar')
      .attr('x', (d) => xScale(d._id))
      .attr('y', height) // Start from the bottom
      .attr('width', xScale.bandwidth())
      .attr('height', 0) // Start with zero height
      .transition()
      .duration(1000) // Animation duration in milliseconds
      .attr('y', (d) => yScale(d[intensityKey]))
      .attr('height', (d) => height - yScale(d[intensityKey]))
      .attr('fill', '#696cff');

    // Add x-axis labels
    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start');

    // Add y-axis
    chart.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale).ticks(5)).selectAll('text').attr('x', -10).style('text-anchor', 'end');
  }, [data, intensityKey]);

  return (

    
    <svg ref={svgRef} width={500} height={380}>
      <g className="min-bars"></g>
      <g className="y-axis" transform={`translate(40,20)`}></g>
    </svg>
  );
};

export default BarGraph;
