import React from "react";
import { useState, useEffect } from "react";

const SenatorInfoCard = ({senatorData,  isFetching})=>{

    const [infoObject, setInfoObject] = useState({})


    useEffect(()=>{
        processSenatorData(senatorData)

    }, [isFetching, senatorData])



    function processSenatorData(rawData){
        let infoObjectLocal = {}
            if(rawData.length > 0){
                const totalTransactions = rawData.length
                infoObjectLocal['Total Purchases'] = totalTransactions
        
                const mostRecentTransaction  = rawData[0].transaction_date
                infoObjectLocal['Most Recent Purchase'] = mostRecentTransaction   
            }       

        setInfoObject(infoObjectLocal)
    }




    const infoCardData = Object.keys(infoObject).map((currentKey, idx)=><p
    key={`senatorInfo_${idx}`}
    >{`${currentKey}: ${infoObject[currentKey]}`}</p>)

    return (<div id="senatorInfoCardContainer" className="senatorProfileCard">
        <div>{infoCardData}</div>

    </div>

    )       
    
}

export default SenatorInfoCard