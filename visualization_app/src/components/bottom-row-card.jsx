import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";

function BottomRowCard() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/avgMetricsBySector");
        setData(response.data);

        // Call a function to draw the D3 graph
        drawGraph(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const drawGraph = (data) => {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 1100 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear any existing content in the container
    d3.select(svgRef.current).html("");

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

    const color = d3.scaleOrdinal().range(["steelblue", "darkorange", "forestgreen"]);

    const barGroup = svg
      .selectAll(".barGroup")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x(d._id)},0)`);

    barGroup
      .selectAll(".bar")
      .data((d) => [
        { key: "avgIntensity", value: d.avgIntensity },
        { key: "avgLikelihood", value: d.avgLikelihood },
        { key: "avgRelevance", value: d.avgRelevance },
      ])
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x.bandwidth() / 3 * (d.key === "avgLikelihood" ? 1 : d.key === "avgRelevance" ? 2 : 0))
      .attr("width", x.bandwidth() / 3)
      .attr("y", (d) => y(d.value))
      .attr("height", 0) // Initial height for the animation
      .style("fill", (d) => color(d.key))
      .transition()
    .duration(1000)
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => height - y(d.value));

    // Add axes with vertical x-axis ticks
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    svg.append("g").call(d3.axisLeft(y));

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(["avgIntensity", "avgLikelihood", "avgRelevance"])
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => color(d));

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text((d) => d.replace("avg", ""));
  };

  return (
    <>
      <div className="row">
        <div className="card" style={{ width: '1500px', height: '600px' }}>
          <div style={{ margin: "40px" }}>
            <h2>Sector Filter</h2> {/* Added title */}
            <div ref={svgRef}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomRowCard;
