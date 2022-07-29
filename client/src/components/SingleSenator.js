import { useState, useEffect } from "react";
import React from "react";
import TradesTable from "./TradesTable";

// const promise = fetchSenatorData(senatorName);

const SingleSenator = () => {
  const [senatorData, setSenatorData] = useState([]);
  const [isFetching, SetIsFetching] = useState(false);

  const senatorName = "'Sheldon Whitehouse'";

  async function fetchSenatorData(senatorNameFetch) {
    SetIsFetching(true);
    try {
      const fetchString = `http://localhost:5000/trades?senator=${senatorNameFetch}`;
      const response = await fetch(fetchString);
      const jsonData = await response.json();
      // console.log(jsonData);
      setSenatorData(jsonData);
      SetIsFetching(false);
      // return jsonData;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSenatorData(senatorName);
  }, []);

  return (
    <>
      <TradesTable tradeData={senatorData} isFetching={isFetching} />
    </>
  );
};

export default SingleSenator;
