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

      const currentPrice_ticker = currentRow.close
      const currentPrice_spy = currentRow.SPY

    //handle manipulation (fill nulls and filter start date)

    let finalPrice_ticker = currentPrice_ticker
    let finalPrice_spy = currentPrice_spy

      function fillNullPrices(stockDataColumn){
        let previousRow = stockData[stockDataKeys[index-1]]
        let nextRow = stockData[stockDataKeys[index+1]]

        let previousPrice = previousRow[stockDataColumn]

        let nextPrice = nextRow[stockDataColumn]

        //if there are consecutive transactions, search for the next available 
        while(!nextPrice){
          nextRow =  stockData[stockDataKeys[index++]]
          nextPrice = nextRow[stockDataColumn]
        }


        const priceRange  = nextPrice - previousPrice 
        const priceRangeDaily = priceRange/7
        const currentDate = timeParser(currentRow.date)
        const previousDate = timeParser(previousRow.date)

        const timeDiff = currentDate - previousDate

        const timeDiffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 

         const rez = (priceRangeDaily*timeDiffDays)+previousPrice
         return rez 
      }

      if (!currentPrice_ticker){
        finalPrice_ticker = fillNullPrices('close')
      }

      if(!finalPrice_spy){
        finalPrice_spy = fillNullPrices('SPY')
      }

// nulls due to transaction date on a non-friday


      finalPrice_ticker = Math.round(finalPrice_ticker *100)/100
      finalPrice_spy = Math.round(finalPrice_spy *100)/100


      stockDataArrayNEW.push({
        date: timeParser(currentRow.date), 
        close: finalPrice_ticker ,
        SPY: finalPrice_spy, 
        // fillerVal: fillerVal
        transactionType: currentRow.type
      })
    }

         console.log("TRANSFORMED process stock data,data", stockDataArrayNEW)



 
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

    // console.log("final formatted data, processStockData", stockDataFilt)

    return stockDataFilt
  
  }
  return "no data";

}

