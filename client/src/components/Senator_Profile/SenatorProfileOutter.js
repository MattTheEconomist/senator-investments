import React from "react";
import { useState, useEffect } from "react";
import OverallAlphaCard from "./OverallAlphaCard";
import SenatorInfoCard from "./SenatorInfoCard";
import  TradesBarGraph from "./TradesBarGraph";
import ExecutorGraphCard from "./ExecutorGraphCard"



import './Senator_Profile.css'


const SenatorProfileOutter = ({nameSelected, senatorData, isFetching})=>{


    const [senId, setSenId] = useState('')

    useEffect(()=>{
        if(senatorData && senatorData.length> 0){
        setSenId(senatorData[0].senator_id)

        }
    }, [senatorData])
   
    let nameSelectedFormatted = nameSelected.replace("'","")
     nameSelectedFormatted = nameSelectedFormatted.replace("'","")

    //  console.table(senatorData)

    




    return ( <div id="senatorProfileOutter">
        <div id="senatorNameTitleContainer">


        <h3 id="senatorNameTitle">{nameSelectedFormatted}</h3>
        </div>
    <div id="allCardsContainer">


        <SenatorInfoCard senId={senId} 
        senatorData={senatorData} isFetching={isFetching}/>
        <OverallAlphaCard senatorData={senatorData}/>
        <ExecutorGraphCard senatorData={senatorData}/>

        </div>
        {/* <TradesBarGraph senatorData={senatorData}/>  */}


    </div>



    )
}

export default SenatorProfileOutter


