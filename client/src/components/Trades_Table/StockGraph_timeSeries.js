import React from "react";
import StockGraph from "./StockGraphSvg";

const StockGraphTimeSeries = ({ stockData, transaction_date }) => {
  // async function processStockData(stockData) {

  const transactionDateFormatted = new Date(transaction_date);

  function processStockData(stockData) {
    console.log(stockData);

    const isEmpty = JSON.stringify(stockData) === "{}" ? true : false;

    if (!isEmpty) {
      const noLength = Object.keys(stockData).length === 0 ? true : false;

      if (noLength) {
        return "array empty ";
      }

      const weeklyData = stockData["Weekly Time Series"];
      const datesArrayFull = Object.keys(weeklyData)
        .map((date) => {
          return {
            date: date,
            close: parseFloat(weeklyData[date]["4. close"]),
          };
        })
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      const datesIdentifier = datesArrayFull.map((row) => {
        const rowDate = new Date(row.date);
        let appendedValue = 0;
        if (rowDate > transactionDateFormatted) {
          appendedValue = 1;
        }
        return appendedValue;
      });

      const indexOfDate = datesIdentifier.indexOf(1);

      const lowerRange = indexOfDate - 4;
      const upperRange = indexOfDate + 20;

      const datesArrayFiltered = datesArrayFull.slice(lowerRange, upperRange);

      const rez = datesArrayFiltered;
      // return JSON.stringify(rez);
      return rez;
    }
    return "no data";
  }

  const stockDataFormatted = processStockData(stockData);

  return (
    <div id="stockGraphContainer">
      <StockGraph data={stockDataFormatted} />

      <h3>{transaction_date}</h3>
      {/* <div key={Math.random()}>{stockDataFormatted}</div> */}
    </div>
  );
};

export default StockGraphTimeSeries;
