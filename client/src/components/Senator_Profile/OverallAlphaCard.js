import { set } from "d3";
import React from "react";
import { useState, useEffect } from "react";

const OverallAlphaCard= ({senatorData,  isFetching})=>{

    const [alphaAverage, setAlphaAverage] = useState("...")
    const [infoObject, setInfoObject] = useState({})

    useEffect(()=>{
        calculateAlpha(senatorData)
        // console.log(senatorData)
        processSenatorData(senatorData)


    }, [senatorData,  isFetching])




    function calculateAlpha(rawData){
     
        let validNumsCount = 0
        let runningSum = 0

        for (let i=0;i<rawData.length; i++){
            const currentAlpha_raw = rawData[i].alpha

            // if (currentAlpha_raw === "Ticker Not Found" | currentAlpha_raw === "0.0"){continue}
            if (currentAlpha_raw === "Ticker Not Found"){continue}
            
            runningSum += parseFloat(currentAlpha_raw)
            validNumsCount++
        }


        let rez = runningSum/validNumsCount
        rez = rez.toFixed(2)

        rez = rez.toString()
        if(rez==="NaN"){
            rez = "No Data"
        }

        setAlphaAverage(rez)
    }

    function findColor(alphaAverage){
        let finalColor = ''
        if(parseFloat(alphaAverage)>=10){
            finalColor='greenText'
        }
        else if(parseFloat(alphaAverage)<10){
            finalColor="yellowText"
        }
        else{
            finalColor= "greyText"
        }
        return finalColor
    }

    const colorClass = findColor(alphaAverage)


    const alphaSpan = <span className={colorClass} id="alphaCardValue">{alphaAverage}</span>

// INFO CARD DATA /////
    function processSenatorData(rawData){
        let infoObjectLocal = {}
            if(rawData.length > 0){
                const totalTransactions = rawData.length
                infoObjectLocal['Total Purchases'] = totalTransactions
        
                const mostRecentTransaction  = rawData[0].transaction_date
                infoObjectLocal['Most Recent Purchase'] = mostRecentTransaction   
            }       

        setInfoObject(infoObjectLocal)

        // console.log(infoObject)
        console.log(rawData)
    }


    const infoCardData = Object.keys(infoObject).map((currentKey, idx)=><p
    key={`senatorInfo_${idx}`}
    >{`${currentKey}: ${infoObject[currentKey]}`}</p>)


    return (<div id="overallAlphaCardContainer" className="senatorProfileCard">
        <p id="alphaCardTitle" className="cardTitle">Mean Alpha</p>
        {alphaSpan}
        <div id="senatorInfoCardData">{infoCardData}</div>
    </div>

    )       
    
}

export default OverallAlphaCard