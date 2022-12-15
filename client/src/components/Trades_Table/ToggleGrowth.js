import React from "react";
import { useState, useEffect } from "react";
import "./RowExpansion.css"


const ToggleGrowth = ({isGrowthMode, 
    isGrowthData, 
    setIsGrowthData
})=>{




      // let toggleText = "Currently Displaying Historical Prices"
  let toggleText = isGrowthData?
  "Currently Displaying Growth Rates":
  "Currently Displaying Historical Prices"



  function toggleGrowthMode(){
    setIsGrowthData(!isGrowthData)
    if (!isGrowthData){
      toggleText =  "Currently Displaying Historical Prices"
    }else{
      toggleText = "Currently Displaying Growth Rates"
    }
  }


    return  <div id="toggleContainer">
    <input type="checkbox" id="switch"
                  className="checkbox"
                    onChange={toggleGrowthMode}
                    />
      <label htmlFor="switch" className="toggle">
      </label>
      <p id="toggleExplainerText">{toggleText}</p>
      </div>
    
}



export default ToggleGrowth;
