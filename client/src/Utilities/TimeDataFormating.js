import * as d3 from "d3";

export function processStockData(stockData, transaction_date) {
  //   console.log("time data formatting", stockData);

  if (Object.keys(stockData)[0] === "Error Message") {
    return "no data";
  }

  //   if (stockData === "no data") {
  //     return "no data";
  //   }

  const transactionDateFormatted = new Date(transaction_date);

  const isEmpty = JSON.stringify(stockData) === "{}" ? true : false;

  if (!isEmpty) {
    const noLength = Object.keys(stockData).length === 0 ? true : false;

    if (noLength) {
      return [];
    }

    const weeklyData = stockData["Weekly Time Series"];

    const datesArrayFull = Object.keys(weeklyData)
      .map((row) => {
        return {
          //   date: timeParser(row),
          //   date: new Date(row),
          date: row,
          close: parseFloat(weeklyData[row]["4. close"]),
        };
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));

    const datesIdentifier = datesArrayFull.map((row) => {
      const rowDate = new Date(row.date);
      //   const rowDate = row.date;
      let appendedValue = 0;
      if (rowDate > transactionDateFormatted) {
        appendedValue = 1;
      }
      return appendedValue;
    });

    const indexOfDate = datesIdentifier.indexOf(1);

    const weeksBeforeTransaction = 4;
    const weeksAfterTransaction = 20;

    const lowerRange = indexOfDate - weeksBeforeTransaction;
    const upperRange = indexOfDate + weeksAfterTransaction;

    const datesArrayFiltered = datesArrayFull.slice(lowerRange, upperRange);

    const timeParser = d3.timeParse("%Y-%m-%d");

    function preProcessing(arr) {
      let formatted = [];
      for (let idx in arr) {
        const row = arr[idx];
        formatted.push({ date: timeParser(row.date), close: row.close });
      }
      return formatted;
    }

    const rez = preProcessing(datesArrayFiltered);
    return rez;
  }
  return "no data";
}
