import { useState } from "react";
import React from "react";
import TradesTable from "./Trades_Table/TradesTable";
import NameDropdown from "./NameDropdown";
import SenatorProfileOutter from "./Senator_Profile/SenatorProfileOutter";

// const promise = fetchSenatorData(senatorName);

const SingleSenator = () => {
  const [senatorData, setSenatorData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //  const [nameSelected, setNameSelected] = useState("'Sheldon Whitehouse'");
   const [nameSelected, setNameSelected] = useState("'Thomas H Tuberville'");
  //  const [nameSelected, setNameSelected] = useState("100");


  async function fetchSenatorData(senatorNameFetch) {

    const senatorIdString = `${senatorNameFetch}`

    setIsFetching(true);
    try {
      const fetchString = `http://localhost:5001/trades?senator=${senatorNameFetch}&type='Purchase'`;
      // const fetchString = `http://localhost:5001/trades?senatorId=${senatorNameFetch}&type='Purchase'`;
      // const fetchString = `http://localhost:5001/trades?senator_id=${senatorIdString}&type='Purchase'`;
      const response = await fetch(fetchString);
      const jsonData = await response.json();
      setSenatorData(jsonData);
      setIsFetching(false);      
      // console.log('single senator', senatorNameFetch)
      // console.log('single senator', senatorData)

    } catch (error) {
      console.error(error);
    }
    finally{

    }
  }

  return (
    <>
      <NameDropdown
        senatorData={senatorData}
        isFetching={isFetching}
        fetchSenatorData={fetchSenatorData}
        nameSelected = {nameSelected}
        setNameSelected = {setNameSelected}
      />
      <SenatorProfileOutter nameSelected = {nameSelected} senatorData={senatorData} isFetching={isFetching}/>
      <TradesTable tradeData={senatorData} 
      isFetching={isFetching} 
      nameSelected = {nameSelected}
      />
    </>
  );
};

export default SingleSenator;
