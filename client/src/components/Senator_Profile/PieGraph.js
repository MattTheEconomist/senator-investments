import React, { useEffect, useState, useRef} from "react";
import * as d3 from "d3";


const PieGraph= ({
    valueCounts
})=>{

    // console.log("pie graph", valueCounts)
    console.log("pie graph", valueCounts)
    // const valueCounts = {Self: 108, Joint: 91, Spouse: 47, Child: 43}




    useEffect(()=>{
        cleanupOldGraph()
        drawGraph()

    }, [valueCounts])
    // }, [])

    const dimensions = {
        width: 50,
        height: 50,
        margin: { top: 50, right: 30, bottom: 50, left: 60 },
      };


      const { width, height, margin } = dimensions;
        const svgWidth = width + margin.left + margin.right;
        const svgHeight = height + margin.top + margin.bottom;

      const svgRef = useRef(null);

      const radius= 200

      function cleanupOldGraph(){
        d3.select("svg")
        .selectAll("*")
        .remove()
      }


      function drawGraph(){
          const svgEl = d3.select(svgRef.current);


              const data = Object.values(valueCounts);

              const keys  = Object.keys(valueCounts); 

              const colorMap = {
                Self: "#49A35E", 
                Joint: "#F07F55", 
                Spouse: "#2979A3", 
                Child: "#48B7F0"
              }

              var svg = d3.select("svg"),
                  width = svg.attr("width"),
                  height = svg.attr("height"),
                  radius = Math.min(width, height) / 2,
                  g = svg.append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

              const colorList =  keys.map(current=>colorMap[current])
          
            //   var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
              var color = d3.scaleOrdinal(colorList);
            //   const color = colorList
          
              // Generate the pie
              var pie = d3.pie();
          
              // Generate the arcs
              var arc = d3.arc()
                          .innerRadius(0)
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


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} id="stockGraphSvg"
    ></svg>
}


export default PieGraph