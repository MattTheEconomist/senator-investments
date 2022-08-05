import React from "react";
import { useState, useEffect } from "react";
import StockGraphTimeSeries from "./StockGraph_timeSeries";

const RowExpansion = ({ sequence, rowData, rowSequenceClicked }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rawStockData, setRawStockData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setRawStockData(fetchStockData(rowData.ticker));
  }, []);

  useEffect(() => {
    if (rowSequenceClicked === sequence) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [rowSequenceClicked, sequence, rowData]);

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
    // <li id={`cardListItem${idx}`}>
    <li key={`cardListItem${idx}`}>
      {`${infoColsObj[col]}: `}
      {rowData[col]}
    </li>
  ));

  async function fetchStockData(tick) {
    setIsFetching(true);

    const apiKey = "U288LAEMR485UKD1";
    const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${tick}&apikey=${apiKey}`;

    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      //   console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  }

  const expansionDiv = isExpanded ? (
    <div id="expansionDiv">
      <div id="criticalInfoCard">
        <ul id="yo">{cardListItems}</ul>
      </div>
      <StockGraphTimeSeries
        transaction_date={transaction_date}
        rawStockData={rawStockData}
        isFetching={isFetching}
      />
    </div>
  ) : (
    <></>
  );

  return <>{expansionDiv}</>;
};

export default RowExpansion;
