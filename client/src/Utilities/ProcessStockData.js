import * as d3 from "d3";


export function processStockData(stockData, transaction_date){
  //handle error somehow. add something else? 

  // console.log("starting data")
  // console.table(stockData)



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

    const stockDataKeys = Object.keys(stockData)

    let stockDataArrayNEW = []

    const timeParser = d3.timeParse("%Y-%m-%d");
    let maxAlphaNew = 0

    for( let index =0; index< Object.keys(stockData).length; index++){
      const currentKey = stockDataKeys[index]
      const currentRow = stockData[currentKey]

      const currentPrice_ticker = currentRow.close
      const currentPrice_spy = currentRow.SPY

    //handle manipulation (fill nulls and filter start date)

    let finalPrice_ticker = currentPrice_ticker
    let finalPrice_spy = currentPrice_spy


// nulls due to transaction date on a non-friday
      function fillNullPrices(stockDataColumn){
        let previousRow = stockData[stockDataKeys[index-1]]
        let nextRow = stockData[stockDataKeys[index+1]]

        let previousPrice = previousRow[stockDataColumn]

        let nextPrice = nextRow[stockDataColumn]

        //if there are consecutive transactions, search for the next available row with price data 
        while(!nextPrice){
          nextRow =  stockData[stockDataKeys[index++]]
          nextPrice = nextRow[stockDataColumn]
        }

        while(!previousPrice){
          previousRow= stockData[stockDataKeys[index--]]
          previousPrice = nextRow[stockDataColumn]
        }


        //find days since last day with data 
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


      finalPrice_ticker = Math.round(finalPrice_ticker *100)/100
      finalPrice_spy = Math.round(finalPrice_spy *100)/100


      stockDataArrayNEW.push({
        date: timeParser(currentRow.date), 
        close: finalPrice_ticker,
        SPY: finalPrice_spy, 
        transactionType: currentRow.type, 

      })
    }


    const finalStockDataArray = calculateGrowthIndex(stockDataArrayNEW)


    // console.log("TRANSFORMED process stock data", finalStockDataArray)


    let alphaList = finalStockDataArray.map(row=> row.alpha)

    let maxAlpha = alphaList.reduce((accumulator, current) => {
      return accumulator > current ? accumulator : current
    })

    // console.log("max Alpha process stock data",    maxAlpha)

    return finalStockDataArray
  
  }
  return "no data";

}


function calculateGrowthIndex(stockDataPreProcessed){
  const stockDataKeys = Object.keys(stockDataPreProcessed)

  let stockDataArray_growthIndex = []
  const initialInvestment = 100
  let currentInvestment_spy = initialInvestment
  let currentInvestment_ticker = initialInvestment

  for( let index =0; index< Object.keys(stockDataPreProcessed).length; index++){
          
    const currentKey = stockDataKeys[index]
    const currentRow = stockDataPreProcessed[currentKey]

    if(index===0){
      stockDataArray_growthIndex.push({
        ...currentRow ,
        ticker_growth: null,
        spy_growth: null, 
        alpha:null
      })
    }
    else if(index===1){
      stockDataArray_growthIndex.push({
        ...currentRow ,
        ticker_growth: 100,
        spy_growth: 100, 
        alpha:0
      })

    }
    else{

    const currentPrice_ticker = currentRow.close
    const currentPrice_spy = currentRow.SPY

    const previousIndex = stockDataKeys[index-1]
    const previousRow = stockDataPreProcessed[previousIndex]
    const previousPrice_ticker = previousRow.close
    const previousPrice_spy = previousRow.SPY

    const pctChange_ticker = (currentPrice_ticker- previousPrice_ticker )/previousPrice_ticker
    const pctChange_spy = (currentPrice_spy - previousPrice_spy)/previousPrice_spy

    currentInvestment_ticker = currentInvestment_ticker*(1+pctChange_ticker)
    currentInvestment_spy= currentInvestment_spy*(1+pctChange_spy)


    let growthRate_ticker = currentInvestment_ticker
    let growthRate_spy = currentInvestment_spy

    let alpha = growthRate_ticker  - growthRate_spy



    growthRate_ticker = Math.round( growthRate_ticker *100)/100
    growthRate_spy = Math.round( growthRate_spy *100)/100
    alpha = Math.round( alpha *100)/100



    stockDataArray_growthIndex.push({
      ...currentRow ,
      ticker_growth: growthRate_ticker,
      spy_growth: growthRate_spy, 
      alpha: alpha

    })

    }
  
  }

  // console.log("finished data")

  // console.table(stockDataArray_growthIndex)

  return stockDataArray_growthIndex 


}

