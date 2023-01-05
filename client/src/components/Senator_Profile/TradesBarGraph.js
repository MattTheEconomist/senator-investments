import React from "react";
import * as d3 from "d3";
// import preProcessData from "./ProcessBarGraphData";
import { useState, useEffect, useRef } from "react";

const TradesBarGraph = ({senatorData,  isFetching})=>{

    const [formattedData, setFormattedData] = useState([])




    
    useEffect(()=>{
        // cleanupOldGraph()
        drawGraph()

        preProcessData(senatorData)


    }, [senatorData,  isFetching])


    const dimensions = {
        width: 600,
        height: 300,
        margin: { top: 50, right: 30, bottom: 50, left: 60 },
      };
    
    //   const svgRef = useRef(null);
    
      const { width, height, margin } = dimensions;
      const svgWidth = width + margin.left + margin.right;
      const svgHeight = height + margin.top + margin.bottom;




    function preProcessData(rawData){

        if(!rawData){
            return []
        }


        // let rez = rawData
        let rez = []
        let quarterlyChunks = {}
        // console.log(rawData)

        for(let i=0; i<rawData.length; i++){
            const currentRow = rawData[i]
            const currentDate = currentRow.transaction_date
            const currentMonth = currentDate .split("-")[1]
            const currentYear= currentDate .split("-")[0]
            const currentQuarter = Math.ceil(currentMonth/3)
            const currentTrans = currentRow.type

            const chunkKey = `${currentYear}_${currentQuarter}`

            if(!quarterlyChunks[chunkKey]){
                quarterlyChunks[chunkKey] =[]
            }

            quarterlyChunks[chunkKey].push(currentTrans)
        }



            let quarterKeys  = Object.keys(quarterlyChunks)


            //sort keys
                quarterKeys = quarterKeys.sort()

                const startQuarter = quarterKeys[0]
                const endQuarter = quarterKeys.pop()

                if(!startQuarter){
                    return []
                }

                const yearDiff = parseInt(endQuarter.split("_")[0]) - parseInt(startQuarter.split("_")[0])+1

                const totalQuarters = yearDiff*4

                let previousQuarter = startQuarter

                let allQuarters = [startQuarter]

                for (let q=1; q<totalQuarters; q++){
                    previousQuarter = allQuarters[q-1]
                    const previousQuarter_q = parseInt(previousQuarter.split("_")[1])
                    const previousQuarter_y = parseInt(previousQuarter.split("_")[0])

                    let currentQuarter = ''
                                        
                    if(previousQuarter_q===4){
                        currentQuarter= `${previousQuarter_y+1}_1`
                    }else{
                        currentQuarter= `${previousQuarter_y}_${previousQuarter_q+1}`
                    }

                    allQuarters.push(currentQuarter)
                }


                let quarterlyChunks_final = {}

                
            
                for (let g=1; g<allQuarters.length; g++){
                    const currentQuarter = allQuarters[g]

                    if(!quarterlyChunks[currentQuarter]){
                        quarterlyChunks_final[currentQuarter] = {"Purchase": 0, "Sale":0}
                    }else{
                        const currentTransactionsList = quarterlyChunks[currentQuarter]
                        const purchaseCount = currentTransactionsList.filter(trans=> trans==="Purchase").length
                        const saleCount =  currentTransactionsList.length - purchaseCount
                        quarterlyChunks_final[currentQuarter] = {"Purchase": purchaseCount, "Sale":saleCount}
                        

                    }

                }

                console.log(quarterlyChunks_final, 'quarterlyChunks_final')

        // setFormattedData(quarterlyChunks_final)
        // return
        setFormattedData(quarterlyChunks_final)

    }


    function drawGraph(formattedData){

        console.log("CALLING DRAW GRAPH")
        if(!formattedData){
            return <></>
        }

        const svgEl = d3.select("#transactionsBarGraphSvg");

        const dates = Object.keys(formattedData)
        const purchases=  Object.keys(formattedData).map(row=>formattedData[row].Purchase)
        const sales =  Object.keys(formattedData).map(row=>formattedData[row].Sale)



        const xScale = d3
        .scaleTime()
        .domain(d3.extent(dates))
        .range([margin.left, svgWidth - margin.right]);



        const xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10);

            // const xAxisGroup = svg
            const xAxisGroup = svgEl
                .append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(xAxis);



        
    }




    return (<div id="tradesBarGraphContainer">
        <p>trades bar graph container</p>
        <svg 
        // ref={svgRef}
         width={svgWidth} height={svgHeight} id="transactionsBarGraphSvg"></svg>
    </div>

    )       
    
}

export default TradesBarGraph