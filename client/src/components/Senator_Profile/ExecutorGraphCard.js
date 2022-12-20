import React from "react";
import { useState, useEffect } from "react";
import PieGraph from "./PieGraph";

const ExecutorGraphCard = ({senatorData,  isFetching})=>{

    const [valueCounts, setValueCounts] = useState({})


    useEffect(()=>{
        findValueCounts(senatorData)

    }, [senatorData,  isFetching])


    function findValueCounts(rawData){

        let rez = {}

        for(let i=0; i<rawData.length; i++){
            const currentRow = rawData[i]
            const currentOwner = currentRow.owner

            rez[currentOwner]=rez[currentOwner]? rez[currentOwner]+1: 1

        }

        setValueCounts(rez)

    }




    return (<div id="executorGraphCardContainer" className="senatorProfileCard">
           <p className="cardTitle">Executor Distribution</p>
                <PieGraph valueCounts={valueCounts} /> 
    </div>

    )       
    
}

export default ExecutorGraphCard