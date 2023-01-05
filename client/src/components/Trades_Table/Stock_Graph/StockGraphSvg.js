import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useRef } from "react";
import { processStockData 
 } from "../../../Utilities/ProcessStockData";

//  import "../../StockGraph.css" ; 
 import "../RowExpansion.css"


const StockGraphSvg = ({   
  stockData,
   transaction_date , 
   isGrowthData, 
   thisTicker

}) => {

  // const [mouseOverValue, setMouseOverValue ]= useState("nothing")
  // const [mouseX, setMouseX ]= useState(0)
  // const [xHover, setXHover] = useState(0)

 useEffect(()=>{
  cleanupOldGraph()
  drawGraph(stockData, isGrowthData)

  if(stockData.length ===0){
    d3.select("#tooltipNew").style("opacity", 0)
  }

 }, [stockData])


  useEffect(()=>{
    cleanupOldGraph()
    drawGraph(stockData, isGrowthData)




  }, [isGrowthData])



  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 50, right: 30, bottom: 50, left: 60 },
  };

  // const svgRef = useRef(null);



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
      // d3.select("svg")
      d3.select("#stockGraphSvg")
      .selectAll("*")
      .remove()
  }

  function cleanupBars(){
    if(!isGrowthData){
      d3.select("svg")
      .selectAll(".mybar")
      .remove()
    }

}

  function drawGraph(dataInput, isGrowthData) {



    // const svgEl = d3.select(svgRef.current);
    const svgEl = d3.select("#stockGraphSvg");

    if (svgEl) {
      svgEl.selectAll("*").remove();

      d3.select(".lineTicker").remove()

      d3.selectAll(".mybar").remove()


    }

    if (stockData.length < 1) {
      return textElement("Fetching Data . . .");
    }

  let formattedData = processStockData(stockData, transaction_date);

  console.log("stock data", formattedData)

  // if(formattedData.length > 0){
  if(formattedData){

    formattedData.shift()
  }



    const transactionsData = formattedData.filter(row=> row.transactionType)




    if (formattedData === "no data") {
    // if (formattedData.length < 1) {
      svgEl 
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

      // console.log("stock graph", formattedData)



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
        .attr("transform", `translate(${margin.left - 10}, -${margin.top})`)
        .style("opacity", 0)
        .transition(900)
        .style("opacity", 1)


      yAxisGroup.select(".domain").remove();
      yAxisGroup.selectAll("line").attr("stroke", "black");
      yAxisGroup
        .selectAll("text")
        .attr("color", "black")
        .attr("font-size", "0.75rem");


        d3.select("#tooltipNew").style("opacity", 0)
 

        const lineColorMap={
          'assetLine': '#2979A3', 
          'spyLine': 'grey'
        }


        

        // const transactionColorMap={
        //   'Purchase': "#69b3a2", 
        //   'Sale (Partial)': "#EB5542", 
        //   'Sale (Full)': "#D43141",
        //   'Exchange' : "grey"
        // }

      // const lineTicker = d3
      let lineTicker = d3
        .line()
        .x((d) => xScale(d.date) + margin.left)
        .y((d) => yScale(d[valueCol]))

      
      
        svgEl 
        .append("path") // add a path to the existing svg
        .datum(formattedData)
        .attr("d", lineTicker)
        .attr("fill", "none")
        .attr("stroke", lineColorMap.assetLine)
        .attr("stroke-width", 3)
        .attr("className", "lineTicker")
        .lower()




          if(isGrowthData){
            // svgEl.selectAll("mybar")
            svg.selectAll("mybar")
            .data(formattedData)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.date))
            .attr("y", (d,i)=> {
              if(d.alpha <0){
                return yScale(d.spy_growth)- margin.top
              }else{
                return yScale(d.ticker_growth)- margin.top
              }
            })
            .attr("width", 20)
            .attr("height", (d) =>( Math.abs(yScale(d.ticker_growth) - yScale(d.spy_growth) )))
            .attr("fill", (d)=>{
              if(d.alpha <0){
                // return transactionColorMap['Sale (Partial)']
                return "#EB5542"
              }else{
                // return transactionColorMap.Purchase
                return "#69b3a2"
              }
            })
            .style("opacity", 0)
            .attr("id", (d,i)=> `${d.alpha}`)
            .raise()
            .on('mouseover', function(d) {

             const currentRectSelection =  d3.select(this)
             const xPoz = currentRectSelection._groups[0][0].x.baseVal.value
              const tooltipXBuffer = 50

        d3.select("#tooltipNew")
        .style("left", `${xPoz+tooltipXBuffer}px`)
        .transition(200)
        .style("opacity", 1)

               d3.select(this)
              .raise()
              .transition(100)
              .style("opacity", 1)
              // .style("backgroundColor","green" )

              d3.select("#tooltipText")
              .text(d.target.id)


          })
          .attr("rx", 6)
          .attr("ry", 6)
          .on("mouseout", function(d){

             d3.select(this)
            .transition(100)
            .style("opacity", 0)

            d3.select("#tooltipNew")
            .transition(200)
            .style("opacity", 0)

          })
          }




      const lineSpy = d3
      .line()
      .x((d) => xScale(d.date) + margin.left)
      .y((d) => yScale(d.spy_growth))

      if(isGrowthData){
        // d3.select("svg")
        svgEl 
        .append("path") // add a path to the existing svg
        .datum(formattedData)
        .attr("d", lineSpy)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke", lineColorMap.spyLine)
        .attr("stroke-width", 3)
        .lower()
      }


      const transactionColorMap={
        'Purchase': "#69b3a2", 
        'Sale (Partial)': "#EB5542", 
        'Sale (Full)': "#D43141",
        'Exchange' : "grey"
      }
  

        svgEl
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


  const graphTitleText = isGrowthData? 
  `${thisTicker} Historical Growth Rates` :
  `${thisTicker} Historical Prices`



  return (
    <>
    <div id="graphComponentsContainer">
    <div id="graphTitleContainer">
      <p id="graphTitleText">{graphTitleText}</p>
    </div>
    <div id="tooltipNew">
      <p id="tooltipTitle">Current Alpha:</p>
      {/* Current Alpha: */}
        <div id="tooltipText"></div>
       </div>

        <svg 
        // ref={svgRef} 
        width={svgWidth} height={svgHeight} id="stockGraphSvg"
        >

</svg>

</div>


    </>

  );
};

export default StockGraphSvg
