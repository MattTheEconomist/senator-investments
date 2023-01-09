// import { useState } from "react";
// import React from "react";
import { useEffect, useState } from "react";


import { Link, Outlet } from 'react-router-dom';


const HomePageOutter = ()=> {

    const [topSenatorData, setTopSenatorData] = useState([])
    const  [isFetchingTop, setIsFetchingTop] = useState(false)


    useEffect(()=>{
        fetchTopSenators()
    },[])


    async function fetchTopSenators() {

        setIsFetchingTop(true);
        try {
          const fetchString = `http://localhost:5001/senators-top`; 
          const response = await fetch(fetchString);
          const jsonData = await response.json();
          setTopSenatorData(jsonData)
        //   console.log("home page", jsonData)
          setIsFetchingTop(false)
    
        } catch (error) {
          console.error(error);
        }
      
      }

      const topSenatorsTable = topSenatorData.length==0? 
      <></>
      :topSenatorData.map((row, idx)=> {
        return(
            <Link key={`link${idx}`} to={`/senatorProfile/${row.senator_id}`}>
            <div  className="topSenatorsRow" key={`topSenRow${idx}`} >
            <div  className="topSenatorsNameCell"  key={`topSenName${idx}`}>{row.senator}</div>
            <div  className="topSenatorsPurchCell" key={`topSenPurch${idx}`}>{row.purchases}</div>
        </div>
        </Link>
        )
      }
      
    
      )


    return <>
    <div>HELLO</div>

    <p>here's som explanatory text</p>

    <div id="topSenatorTable_Outter">
        <div id="topSenatorTable_Header">
            <div className="topSenatorsNameCell">Senator</div>
            <div className="topSenatorsPurchCell">Stock Purchases</div>
        </div>

    {topSenatorsTable} 
    </div>
{/* 
    <br></br>  
    
      <br></br>

    <Link to="/senatorProfile/100">Senator page 100</Link>

    <br></br>
    <Link to="/senatorProfile/101">Senator page 101</Link>


    <br></br>
    <Link to="/senatorProfile/110">Senator page 110</Link> */}




    {/* <Route exact path="/senatorProfile/:senatorId" index element={<SingleSenator />} /> */}





    <Outlet /> 
    
    </>
}

export default HomePageOutter