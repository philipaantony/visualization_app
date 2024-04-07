import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function MainBar(props) {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [props]); // Redraw chart when props change

  const drawChart = () => {
    const data = [
      { label: 'Average Likelihood', value: props.avgLikelihood },
      { label: 'Average Intensity', value: props.avgIntensity },
      { label: 'Relevance', value: props.relevance },
    ];

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height + margin.top, margin.top]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height + margin.top - y(d.value))
      .attr('fill', 'steelblue');

    // Add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height + margin.top})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
  };

  return <svg ref={chartRef} width={700} height={500} />;
}

export default MainBar;
