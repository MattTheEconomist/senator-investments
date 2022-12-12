import React, { useEffect } from "react";
import * as d3 from "d3";


const Tooltip = ({ mouseOverValue})=>{


    return <div id="tooltipContainer">

        <h3>{mouseOverValue}</h3>
    </div>
} 

export default Tooltip