import React, { useEffect, useState, useRef} from "react";
import * as d3 from "d3";


const PieGraph= ({
    valueCounts
})=>{

    console.log("pie graph", valueCounts)



    useEffect(()=>{
        cleanupOldGraph()
        drawGraph()

    }, [valueCounts])

    const dimensions = {
        width: 50,
        height: 50,
        margin: { top: 50, right: 30, bottom: 50, left: 60 },
      };


      const { width, height, margin } = dimensions;
        const svgWidth = width + margin.left + margin.right;
        const svgHeight = height + margin.top + margin.bottom;

    //   const svgRef = useRef(null);

      const radius= 200


      const colorMap = {
        Self: "#49A35E", 
        Joint: "#F07F55", 
        Spouse: "#2979A3", 
        Child: "#48B7F0"
      }

      function cleanupOldGraph(){
        d3.select("#pieGraphSvg")
        .selectAll("*")
        .remove()
      }


      function drawGraph(){
        //   const svgEl = d3.select(svgRef.current);


              const data = Object.values(valueCounts);

              const keys  = Object.keys(valueCounts); 


            //   var svg = d3.select("svg"),
              var svg = d3.select("#pieGraphSvg"),
                  width = svg.attr("width"),
                  height = svg.attr("height"),
                  radius = Math.min(width, height) / 2,
                  g = svg.append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

              const colorList =  keys.map(current=>colorMap[current])
          
              var color = d3.scaleOrdinal(colorList);
          
              // Generate the pie
              var pie = d3.pie();
          
              // Generate the arcs
              var arc = d3.arc()
                          .innerRadius(radius/2)
                          .outerRadius(radius);
          
              //Generate groups
              var arcs = g.selectAll("arc")
                          .data(pie(data))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
          
              //Draw arc paths
              arcs.append("path")
                  .attr("fill", function(d, i) {
                      return color(i);
                  })
                  .attr("d", arc);
      }


    return <svg 
    // ref={svgRef}
     width={svgWidth} height={svgHeight} id="pieGraphSvg"
    ></svg>
}


export default PieGraph