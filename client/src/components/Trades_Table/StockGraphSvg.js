import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRef } from "react";
import { processStockData 
 } from "../../Utilities/ProcessStockData";

const StockGraphSvg = ({   
  stockData,
   transaction_date , 
   isGrowthData

}) => {

  useEffect(()=>{
    cleanupOldGraph()
    drawGraph(stockData, isGrowthData)
  }, [isGrowthData])



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

    function cleanupOldGraph(){
      d3.select("svg")
      .selectAll("*")
      .remove()

  }

  function drawGraph(dataInput, isGrowthData) {



    const svgEl = d3.select(svgRef.current);

    if (svgEl) {
      svgEl.selectAll("*").remove();

      d3.select(".lineTicker").remove()


    }

    if (stockData.length < 1) {
      return textElement("Fetching Data . . .");
    }

  let formattedData = processStockData(stockData, transaction_date);
  formattedData.shift()



    const transactionsData = formattedData.filter(row=> row.transactionType)


    console.log('stock graphsvg', transactionsData)




    if (formattedData === "no data") {
    // if (formattedData.length < 1) {
      d3.select("svg")
        .append("text")
        .text("no data stock price. . .")
        .attr("x", 50)
        .attr("y", 50);
    } else {
      const dates = formattedData.map((row) => row.date);
      const values = formattedData.map((row) => row.close);

      let valueCol = isGrowthData ? 'ticker_growth': 'close' 


      const tickerGrowthValues = formattedData.map((row)=> row.ticker_growth)
      const spyGrowthValues = formattedData.map((row)=> row.spy_growth)
      const allGrowthValues = spyGrowthValues.concat(tickerGrowthValues)



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

      let yScale = d3
        .scaleLinear()
        .domain(d3.extent(values))
        .range([height, 0]);
    
      if(isGrowthData){
        yScale = d3
        .scaleLinear()
        .domain(d3.extent(allGrowthValues))
        .range([height, 0]);
      }

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

      // const lineTicker = d3
      let lineTicker = d3
        .line()
        .x((d) => xScale(d.date) + margin.left)
        .y((d) => yScale(d[valueCol]))
        // .y((d) => yScale(d.close))

      
      
      d3.select("svg")
        .append("path") // add a path to the existing svg
        .datum(formattedData)
        .attr("d", lineTicker)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("className", "lineTicker")


      const lineSpy = d3
      .line()
      .x((d) => xScale(d.date) + margin.left)
      .y((d) => yScale(d.spy_growth))

      if(isGrowthData){
        d3.select("svg")
        .append("path") // add a path to the existing svg
        .datum(formattedData)
        .attr("d", lineSpy)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 3);
      }

     



      const transactionColorMap={
        'Purchase': "#69b3a2", 
        'Sale (Partial)': "#EB5542", 
        'Sale (Full)': "#D43141",
        'Exchange' : "grey"
      }


        d3.select("svg")
        .append('g')
        .selectAll("dot")
        .data(transactionsData )
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.date)+ margin.left)
        .attr("cy", (d)=> yScale(d[valueCol]))
        .attr("r", 5)
        .style("fill", (d)=> transactionColorMap[d.transactionType])


    }
  }

  // const svgGraph =
  //   stockData.length < 1 ? textElement("Fetching") : drawGraph(stockData);

  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} id="stockGraphSvg">

    </svg>
  );
};

export default StockGraphSvg;
