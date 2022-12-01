import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRef } from "react";
import { processStockData, processStockDataNEW } from "../../Utilities/TimeDataFormating";

const StockGraphSvg = ({ stockData, transaction_date ,
  stockDataNEW}) => {

  console.log("stock graph transaction date prop", transaction_date)
  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
  };

  const svgRef = useRef(null);

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  function textElement(text) {
    return (
      <text x="0" y="50" fontFamily="Verdana" fontSize={"20"} fill="blue">
        {text}
      </text>
    );
  }

  function drawGraph(stockData) {
    const svgEl = d3.select(svgRef.current);

    if (svgEl) {
      svgEl.selectAll("*").remove();
    }

    if (stockData.length < 1) {
      return textElement("Fetching Data . . .");
    }

    const formattedData = processStockData(stockData, transaction_date);

    const formattedDataNEW = processStockDataNEW(stockDataNEW, transaction_date)
    console.log('stock graph formatted data new ', formattedDataNEW)

    //  console.log("stock graph svg", formattedData);


    if (formattedData === "no data") {
      d3.select("svg")
        .append("text")
        .text("no data stock price. . .")
        .attr("x", 50)
        .attr("y", 50);
    } else {
      const dates = formattedData.map((row) => row.date);
      const values = formattedData.map((row) => row.close);

      const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(dates))
        // .range([margin.left, svgWidth - margin.right]);
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

      const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(8);
      const yAxisGroup = svg
        .append("g")
        .call(yAxis)
        .attr("transform", `translate(${margin.left - 10}, -${margin.top})`);

      yAxisGroup.select(".domain").remove();
      yAxisGroup.selectAll("line").attr("stroke", "black");
      yAxisGroup
        .selectAll("text")
        .attr("color", "black")
        .attr("font-size", "0.75rem");

      const line = d3
        .line()
        // .x((d) => xScale(d.date))
        .x((d) => xScale(d.date) + margin.left)
        .y((d) => yScale(d.close));

      d3.select("svg")
        .append("path") // add a path to the existing svg
        .datum(formattedData)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3);
    }
  }

  const svgGraph =
    stockData.length < 1 ? textElement("Fetching") : drawGraph(stockData);

  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} id="stockGraphSvg">
      {/* {svgGraph} */}
      {/* {svgGraph} */}
    </svg>
  );
};

export default StockGraphSvg;
