import React from "react";

const StockGraphTimeSeries = ({ stockData, transaction_date }) => {
  // async function processStockData(stockData) {

  const transactionDateFormatted = new Date(transaction_date);

  function processStockData(stockData) {
    console.log(stockData);

    const isEmpty = JSON.stringify(stockData) === "{}" ? true : false;

    if (!isEmpty) {
      const noLength = Object.keys(stockData).length === 0 ? true : false;

      if (noLength) {
        console.log("stock graph", "this HAPPEND");
        return "array empty ";
      }

      const weeklyData = stockData["Weekly Time Series"];
      const allDates = Object.keys(weeklyData);

      const datesArrayFull = Object.keys(weeklyData)
        .map((date) => {
          return { date: date, close: weeklyData[date]["4. close"] };
        })
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      // const indexOfDate = datesArrayFull.findIndex((row, i) => {
      //   return row.date === transaction_date;
      // });

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
      const upperRange = indexOfDate + 16;

      const datesArrayFiltered = datesArrayFull.slice(lowerRange, upperRange);

      // const daysAfter = datesArrayFull.filter((row) => {

      //   return rowDate > transactionDateFormatted;
      // });

      // const daysBefore = datesArrayFull.filter((row) => {
      //   const rowDate = new Date(row.date);
      //   return rowDate < transactionDateFormatted;
      // });

      const rez = datesArrayFiltered;
      // const rez = indexOfDate;
      // const rez = daysBefore;
      // const rez = datesArrayFull;
      // const rez = transaction_date;

      return JSON.stringify(rez);
    }
    return "no data";
  }

  // const stockoutput = stockData
  //   ? JSON.stringify(processStockData(stockData))
  //   : "no data here";

  const stockOutput = processStockData(stockData);

  return (
    <div id="stockGraphContainer">
      <h3>{transaction_date}</h3>
      <div key={Math.random()}>{stockOutput}</div>
    </div>
  );
};

export default StockGraphTimeSeries;
