import React from "react";
import { useState, useEffect } from "react";
import StockGraphSvg from "./Stock_Graph/StockGraphSvg";
import ToggleGrowth from "./ToggleGrowth"
import "./RowExpansion.css"

const RowExpansion = ({    sequence,
   rowData,
    rowSequenceClicked, 

}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGrowthData, setIsGrowthData ] = useState(true)
  const [stockData, setStockData] = useState([])
  const [isFetchingStockData, setIsFetchingStockData] = useState(false)
  const [secondTrigger, setSecondTrigger] = useState(false)




  useEffect(() => {
    if (rowSequenceClicked === sequence) {
      setIsExpanded(true);
      fetchStockData(rowData.ticker, rowData.transaction_date, rowData.senatorId)     


    } else {
      setIsExpanded(false);
    }
 }, [rowSequenceClicked, sequence]);


 function formatDate(rawDate){
  let rawDateList = rawDate.split("-")
  let day = rawDateList.pop()
  let month = rawDateList.pop()
  let year = rawDateList.pop()

  return `${month}/${day}/${year}`

 }



  const transaction_date = rowData.transaction_date;

  const infoColsObj = {
    asset_description: "asset",
    type: "transaction type",
    asset_type: "asset type",
    transaction_date: "transaction date",
    disclosure_date: "disclosure date",
    senator: "senator", 
    owner: "executor",
  };

  const cardListItems = Object.keys(infoColsObj).map((col, idx) => (
    <p className={`cardListUnderItem`} key={`cardListItem${idx}`}>
      <span className={`cardListUnderline`}
      key={`cardListUnderline${idx}`}>{`${infoColsObj[col]}: `}</span>

&nbsp;
    {col==="transaction_date"?formatDate(rowData[col]): rowData[col]}
    </p>
  ));



  function fetchStockData(ticker, transaction_date, senatorId) {

    setIsFetchingStockData(true);
const endpoint = `http://localhost:5001/historical/${ticker}/${transaction_date}/${senatorId}`;

      try{

        fetch(endpoint)
      .then((res)=> res.json())
      .then((res)=>setStockData(res))
      }
      catch(error){
      console.error(error)

      }
      finally{
      setIsFetchingStockData(false)
      }

}

const graphIndex=(
<div id="graphIndexContainer">
  <div className='indexRow'> 
    <div id="stockIndexLine" > </div>
    <div className="indexIdentifier">{!isGrowthData? 'Stock Price': 'Stock Growth Rate'}</div>
  </div>

 {isGrowthData?
   <div className='indexRow'> 
   <div id="spyIndexLine"></div>
   <div className="indexIdentifier">S&P Growth Rate</div>
   </div>:
   <></>
 

}


  <div className='indexRow'> 
  <div id="transIndexDotBuy"></div>
  <div className="indexIdentifier">Asset Purchase </div>
  </div>

  <div className='indexRow'> 
  <div id="transIndexDotSell"></div>
  <div className="indexIdentifier">Asset Sale </div>
  </div>


</div>
)


  const expansionDiv = isExpanded ? (
    <div id="expansionDiv">
      <div id="criticalInfoCard">
        <p id="criticalInfoTitle">Transaction Information</p>

        <ul id="yo">{cardListItems}</ul>
      </div>

       {graphIndex}

      <ToggleGrowth 
      isGrowthData = {isGrowthData}
      setIsGrowthData = {setIsGrowthData}
       />


<div id="stockGraphContainer_outter">
<StockGraphSvg
        transaction_date={transaction_date}
        stockData = {stockData}
        isGrowthData = {isGrowthData}
        cardListItems = {cardListItems}
        thisTicker = {rowData.ticker}
      />

</div>
    </div>
  ) : (
    <></>
  );

  return <>{expansionDiv}</>;
};





export default RowExpansion;
