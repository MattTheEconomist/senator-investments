import * as d3 from "d3";


export function processStockData(stockData, transaction_date){
  //handle error somehow. add something else? 

  console.log("raw data from time data formatting", stockData)

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


     // console.log("process stock data, raw data", stockData)


    const firstRow = stockData[0]
    const columns = Object.keys(firstRow)

    const stockDataKeys = Object.keys(stockData)

    let stockDataArrayNEW = []

    const timeParser = d3.timeParse("%Y-%m-%d");

    for( let index =0; index< Object.keys(stockData).length; index++){
      const currentKey = stockDataKeys[index]
      const currentRow = stockData[currentKey]

      //handle manipulation (fill nulls and filter start date)


      stockDataArrayNEW.push({
        date: timeParser(currentRow.date), 
        close: currentRow.close,
        spy: currentRow.SPY
      })
    }

         console.log("process stock data, raw data", stockDataArrayNEW)







 
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



    const stockDataArray = Object.keys(stockData).map((row)=>{
      return{
        date: timeParser(stockData[row].date), 
        close: stockData[row].close,
        spy: stockData[row].SPY

      }
    })

    const stockDataFilt= stockDataArray.slice(indexOfDate, upperRange );

    console.log("final formatted data, processStockData", stockDataFilt)

    return stockDataFilt
  
  }
  return "no data";

}

