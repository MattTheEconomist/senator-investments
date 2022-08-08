import React from "react";
import { useState, useEffect } from "react";
import StockGraphTimeSeries from "./StockGraph_timeSeries";

const RowExpansion = ({ stockData, sequence, rowData, rowSequenceClicked }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (rowSequenceClicked === sequence) {
      setIsExpanded(true);
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

  const expansionDiv = isExpanded ? (
    <div id="expansionDiv">
      <div id="criticalInfoCard">
        <ul id="yo">{cardListItems}</ul>
      </div>
      <StockGraphTimeSeries
        transaction_date={transaction_date}
        // rawStockData={rawStockData}
        stockData={stockData}
      />
    </div>
  ) : (
    <></>
  );

  return <>{expansionDiv}</>;
};

export default RowExpansion;
