import React from "react";
import * as d3 from "d3";
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
    
      const svgRef = useRef(null);
    
      const { width, height, margin } = dimensions;
      const svgWidth = width + margin.left + margin.right;
      const svgHeight = height + margin.top + margin.bottom;




    function preProcessData(rawData){


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




        let quarterlyChunks_final = {}

            let quarterKeys  = Object.keys(quarterlyChunks)

            //sort keys
            // quarterKeys = quarterKeys.sort((a,b)=> {return b > a})
            quarterKeys = quarterKeys.sort()



                    // this is a mess, fill it in the long way instead of iteratively 




            for(let idx=0; idx< quarterKeys.length; idx++){
               const  keyQuarter = quarterKeys[idx]
                const keyQuarter_q = parseInt(keyQuarter.split("_")[1])
                const keyQuarter_y = parseInt(keyQuarter.split("_")[0])

                    let  preceedingQuarter=""
                if(keyQuarter_q===1){
                    preceedingQuarter= `${keyQuarter_y-1}_${4}`
                }
                else{
                    preceedingQuarter= `${keyQuarter_y}_${keyQuarter_q-1}`
                }

                if(!quarterlyChunks[preceedingQuarter]){


                }


               const currentTransactionList = quarterlyChunks[keyQuarter]



                const purchaseCount = currentTransactionList.filter(trans=> trans==="Purchase").length
                const saleCount =  currentTransactionList.length - purchaseCount
                quarterlyChunks_final[keyQuarter] = {"Purchase": purchaseCount, "Sale":saleCount}
            }
                
            // console.log(quarterlyChunks_final)

        setFormattedData(quarterlyChunks_final)

    }


    function drawGraph(formattedData){
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
        // .tickFormat(quarter)
        .range([margin.left, svgWidth - margin.right]);


        
    }




    return (<div id="tradesBarGraphContainer">
        <p>trades bar graph container</p>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} id="transactionsBarGraphSvg"></svg>
    </div>

    )       
    
}

export default TradesBarGraph