// import { useState } from "react";
import React from "react";

import { Link, Outlet } from 'react-router-dom';


const HomePageOutter = ()=> {


    return <>
    <div>HELLO</div>

    <p>here's som explanatory text</p>

    <br></br>
    <Link to="/profilePage/100">Profile link 100</Link>

    <br></br>
    <Link to="/profilePage/120">Profile link 120</Link>

    <Outlet /> 
    
    </>
}

export default HomePageOutter