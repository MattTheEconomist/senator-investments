import React, { useEffect, useState } from "react";

const StockGraphTimeSeries = ({
  rawStockData,
  isFetching,
  transaction_date,
}) => {
  const formattedData = formatStockData(rawStockData, transaction_date);

  console.log("stock graph ", formattedData);

  //   const [isFetching, setIsFetching] = useState(false);
  //   const [formattedData, setFormattedData] = useState([]);

  //   const ticker = rowData.ticker;
  //   const transactionDate = rowData.transactionDate;

  //   useEffect(() => {
  //     raw = fetchStockData(ticker);
  //   }, []);

  //   useEffect(() => {
  //     formatted = setFormattedData(raw);
  //   }, [isFetching]);

  //   const apiKey = "U288LAEMR485UKD1";

  //   let raw = [];
  //   let formatted = [];

  //   async function fetchStockData(tick) {
  //     setIsFetching(true);

  //     const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${tick}&apikey=${apiKey}`;

  //     try {
  //       const res = await fetch(endpoint);
  //       const json = await res.json();
  //       //   console.log(json);
  //       return json;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setIsFetching(false);
  //   }

  function formatStockData(rawData, transactionDate) {
    const weeklyData = rawData["Weekly Time Series"];
    //   console.log(weeklyData);
    return weeklyData;
  }

  return (
    <div id="stockGraphContainer">
      <div key={Math.random()}>stock grph bro</div>
    </div>
  );
};

export default StockGraphTimeSeries;
