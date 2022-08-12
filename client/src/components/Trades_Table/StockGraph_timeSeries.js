import React from "react";
import StockGraph from "./StockGraphSvg";
import { processStockData } from "../../Utilities/TimeDataFormating";

const StockGraphTimeSeries = ({ stockData, transaction_date }) => {
  // async function processStockData(stockData) {

  const stockDataFormatted = processStockData(stockData, transaction_date);

  // console.log("stock graph_time series", stockDataFormatted);

  return (
    <div id="stockGraphContainer">
      {/* <StockGraph data={stockDataFormatted} /> */}

      <h3>{transaction_date}</h3>
      {/* <div key={Math.random()}>{stockDataFormatted}</div> */}
    </div>
  );
};

export default StockGraphTimeSeries;
