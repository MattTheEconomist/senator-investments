import { useState } from "react";
import React from "react";
import TradesTable from "./Trades_Table/TradesTable";
import NameDropdown from "./NameDropdown";
import SenatorProfileOutter from "./Senator_Profile/SenatorProfileOutter";

// const promise = fetchSenatorData(senatorName);

const SingleSenator = () => {
  const [senatorData, setSenatorData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
   const [nameSelected, setNameSelected] = useState("'Sheldon Whitehouse'");


  async function fetchSenatorData(senatorNameFetch) {
    // console.log(senatorNameFetch)
    setIsFetching(true);
    try {
      const fetchString = `http://localhost:5001/trades?senator=${senatorNameFetch}&type='Purchase'`;
      const response = await fetch(fetchString);
      const jsonData = await response.json();
      setSenatorData(jsonData);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
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
      <SenatorProfileOutter nameSelected = {nameSelected}/>
      <TradesTable tradeData={senatorData} isFetching={isFetching} />
    </>
  );
};

export default SingleSenator;
