import { set } from "d3";
import React from "react";
import { useState, useEffect } from "react";

const OverallAlphaCard= ({senatorData,  isFetching})=>{

    const [alphaAverage, setAlphaAverage] = useState("...")

    useEffect(()=>{
        calculateAlpha(senatorData)


    }, [senatorData,  isFetching])




    function calculateAlpha(rawData){
     
        let validNumsCount = 0
        let runningSum = 0

        for (let i=0;i<rawData.length; i++){
            const currentAlpha_raw = rawData[i].alpha

            if (currentAlpha_raw === "Ticker Not Found" | currentAlpha_raw === "0.0"){continue}
            
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




    return (<div id="overallAlphaCardContainer" className="senatorProfileCard">
        <p id="alphaCardTitle" className="cardTitle">Mean Alpha</p>
        {alphaSpan}
    </div>

    )       
    
}

export default OverallAlphaCard