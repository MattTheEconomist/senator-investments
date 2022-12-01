import * as d3 from "d3";


export function processStockData(stockData, transaction_date){
  //handle error somehow. add something else? 

    if (stockData === "no data") {
      return "no data";
    }

  const transactionDateFormatted = new Date(transaction_date);

  const isEmpty = JSON.stringify(stockData) === "{}" ? true : false;

  if (!isEmpty) {
    const noLength = Object.keys(stockData).length === 0 ? true : false;

    if (noLength) {
      return [];
    }


    const firstRow = stockData[0]
    const columns = Object.keys(firstRow)
    const ticker = columns.pop()
 
    const datesIdentifier = stockData.map((row) => {
      const rowDate = new Date(row.date);
      let appendedValue = 0;
      if (rowDate > transactionDateFormatted) {
        appendedValue = 1;
      }
      return appendedValue;
    });

    const indexOfDate = datesIdentifier.indexOf(1);

    const weeksAfterTransaction = 52/2;

    const upperRange= indexOfDate + weeksAfterTransaction;

    const timeParser = d3.timeParse("%Y-%m-%d");

    const stockDataArray = Object.keys(stockData).map((row)=>{
      return{
        date: timeParser(stockData[row].date), 
        close: stockData[row][ticker],
        spy: stockData[row].SPY

      }
    })

    const stockDataFilt= stockDataArray.slice(indexOfDate, upperRange );

    return stockDataFilt
  
  }
  return "no data";

}

