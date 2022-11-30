import { useState } from "react";
import React from "react";
import TradesTable from "./Trades_Table/TradesTable";
import NameDropdown from "./NameDropdown";

// const promise = fetchSenatorData(senatorName);

const SingleSenator = () => {
  const [senatorData, setSenatorData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   fetchSenatorData("Sheldon Whitehouse");
  //   console.log("wtf");
  // }, []);

  async function fetchSenatorData(senatorNameFetch) {
    setIsFetching(true);
    try {
      const fetchString = `http://localhost:5001/trades?senator=${senatorNameFetch}`;
      const response = await fetch(fetchString);
      const jsonData = await response.json();
      // console.log(jsonData);
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
      />
      <TradesTable tradeData={senatorData} isFetching={isFetching} />
    </>
  );
};

export default SingleSenator;
