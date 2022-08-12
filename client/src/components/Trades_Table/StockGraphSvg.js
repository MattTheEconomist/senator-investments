import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRef } from "react";
import { processStockData } from "../../Utilities/TimeDataFormating";

const StockGraphSvg = ({ stockData, transaction_date }) => {
  // useEffect(() => {
  //   // const svgEl = d3.select(svgRef.current);
  //   // svgEl.selectAll("*").remove();
  // }, [transaction_date]);

  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
  };

  const svgRef = useRef(null);

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  const blankReturn = (
    <text x="0" y="50" font-family="Verdana" fontSize={"20"} fill="blue">
      fetching data
    </text>
  );

  function drawGraph(stockData) {
    if (stockData.length < 1) {
      return blankReturn;
    }

    // const timeParser = d3.timeParse("%Y-%m-%d");

    const fakeData = processStockData(stockData, transaction_date);

    // return (
    //   <text x="50" y="50" fontFamily="Verdana" fontSize={"20"} fill="blue">
    //     {JSON.stringify(fakeData)}
    //   </text>
    // );

    // return JSON.stringify(fakeData);

    const dates = fakeData.map((row) => row.date);
    const values = fakeData.map((row) => row.close);

    const svgEl = d3.select(svgRef.current);

    if (svgEl) {
      svgEl.selectAll("*").remove();
    }

    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dates))
      .range([margin.left, svgWidth - margin.right]);

    const xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10);

    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    xAxisGroup.selectAll("line").attr("stroke", "black");
    xAxisGroup.selectAll("text").attr("font-size", "0.75rem");

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(values))
      .range([height, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(10);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("stroke", "black");
    yAxisGroup
      .selectAll("text")
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.close));

    d3.select("svg")
      .append("path") // add a path to the existing svg
      .datum(fakeData)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 3);
  }

  const svgGraph = stockData.length < 1 ? blankReturn : drawGraph(stockData);

  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} id="stockGraphSvg">
      {/* {svgGraph} */}
    </svg>
  );
};

export default StockGraphSvg;
