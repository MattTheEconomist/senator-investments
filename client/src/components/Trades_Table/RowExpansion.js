import React from "react";
import { useState, useEffect } from "react";
import StockGraphSvg from "./Stock_Graph/StockGraphSvg";
import ToggleGrowth from "./ToggleGrowth"

const RowExpansion = ({    sequence,
   rowData,
    rowSequenceClicked, 

}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGrowthData, setIsGrowthData ] = useState(false)
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



  const transaction_date = rowData.transaction_date;

  const infoColsObj = {
    asset_description: "asset",
    type: "transaction type",
    asset_type: "asset type",
    transaction_date: "transaction date",
    disclosure_date: "disclosure_date",
    owner: "executor",
  };

  const cardListItems = Object.keys(infoColsObj).map((col, idx) => (
    <li key={`cardListItem${idx}`}>
      {`${infoColsObj[col]}: `}
      {rowData[col]}
    </li>
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


  const expansionDiv = isExpanded ? (
    <div id="expansionDiv">
      <div id="criticalInfoCard">
        <ul id="yo">{cardListItems}</ul>
      </div>

      <ToggleGrowth 
      isGrowthData = {isGrowthData}
      setIsGrowthData = {setIsGrowthData}
       />


<div id="stockGraphContainer">
<StockGraphSvg
        transaction_date={transaction_date}
        stockData = {stockData}
        isGrowthData = {isGrowthData}
      />

</div>
    </div>
  ) : (
    <></>
  );

  return <>{expansionDiv}</>;
};





export default RowExpansion;
