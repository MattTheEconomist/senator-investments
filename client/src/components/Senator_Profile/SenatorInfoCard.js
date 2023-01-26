import React from "react";
import { useState, useEffect } from "react";


import './Senator_Profile.css'

const SenatorInfoCard = ({senatorData,  isFetching, senId})=>{

    const [infoObject, setInfoObject] = useState({})
    // const [imageFileName, setImageFileName] = useState('')
    const [thing, setThing] = useState(null)


    // useEffect(()=>{
    //     setThing(loadImg(senId))
    //     console.log(thing)
    // }, [isFetching, senId, senatorData])

    const imgObject = {
        '136' : require('../../SenatorImages/136.jpeg'), 
        '100' : require('../../SenatorImages/100.jpeg'), 
        '101' : require('../../SenatorImages/101.jpeg'), 
        '105' : require('../../SenatorImages/105.jpeg'), 
        '106' : require('../../SenatorImages/106.jpeg'), 
        '108' : require('../../SenatorImages/108.jpeg'), 
        '110' : require('../../SenatorImages/110.jpeg'), 
        '118' : require('../../SenatorImages/118.jpeg'), 
        '119' : require('../../SenatorImages/119.jpeg'), 
        '123' : require('../../SenatorImages/123.jpeg'), 
        '125' : require('../../SenatorImages/125.jpeg'), 
        '132' : require('../../SenatorImages/132.jpeg'), 
        '133' : require('../../SenatorImages/133.jpeg'), 
        '134' : require('../../SenatorImages/134.jpeg'), 
        '136' : require('../../SenatorImages/136.jpeg'), 
        '137' : require('../../SenatorImages/137.jpeg'), 
        '147' : require('../../SenatorImages/147.jpeg'), 
        '156' : require('../../SenatorImages/156.jpeg'), 
        '163' : require('../../SenatorImages/163.jpeg')

    }




    function loadImg(senId){
        try {
            if(senId){
            const imagePath  = imgObject[senId]
            console.log('img path is ', imagePath)
            return <img 
            id="senatorProfileImg"
            src={imgObject[senId]}></img>
            }
        } catch (error) {
            return console.log(error)
        }
    }


    console.log(loadImg(senId))

// javascript to load a local image if the file exists 

    const senatorImage  = loadImg(senId)


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
         <p  className="cardTitle">Trade Info</p>

         {senatorImage }
        <div>{infoCardData}</div>






    </div>

    )       
    
}

export default SenatorInfoCard