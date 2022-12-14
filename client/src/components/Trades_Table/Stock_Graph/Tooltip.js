import React, { useEffect } from "react";
import * as d3 from "d3";


const Tooltip = ({ mouseOverValue, mouseX})=>{

    const buffer = 500

    const newMouseX = mouseX + buffer

    const styles ={
        transform: `translate(${newMouseX}px, 0px)` ,
        backgroundColor:"green"
    }


    const explainerText = mouseX? mouseX : "no mouse x "
    return <div 
    style={styles}
    
    id="tooltipContainer">

        <h3>{mouseOverValue},
         {/* {explainerText} */}
         </h3>
    </div>
} 

export default Tooltip