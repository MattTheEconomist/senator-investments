import { useEffect, useState } from "react";
import React from "react";
import TradesTable from "./Trades_Table/TradesTable";
import NameDropdown from "./NameDropdown";
import SenatorProfileOutter from "./Senator_Profile/SenatorProfileOutter";

import {useParams, Link} from "react-router-dom";

const SingleSenator = () => {


  const params = useParams()
  const senatorId = params.senatorId


  const [senatorData, setSenatorData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
   const [nameSelected, setNameSelected] = useState("");
  //  const [senatorIdSelected, setSenatorIdSelected] = useState(senatorId)



   useEffect(()=>{
    fetchSenatorData(senatorId)
   },[])




  async function fetchSenatorData(idSelect) {

    setIsFetching(true);
    try {
      const fetchString = `http://localhost:5001/trades?senator_id='${idSelect}'&type='Purchase'`; 
      const response = await fetch(fetchString);
      const jsonData = await response.json();
      setSenatorData(jsonData);
      setIsFetching(false);   


        setNameSelected(jsonData[0].senator)

    } catch (error) {
      console.error(error);
    }
  
  }

  return (
    <>
        <Link to="/home">Home</Link>

      <SenatorProfileOutter nameSelected = {nameSelected} 
      senatorData={senatorData} isFetching={isFetching}/>
      <TradesTable tradeData={senatorData} 
      isFetching={isFetching} 
      nameSelected = {nameSelected}
      />
    </>
  );
};

export default SingleSenator;
