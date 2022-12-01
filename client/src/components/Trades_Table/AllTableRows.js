import React from "react";
import { useState, useEffect } from "react";
import SingleTableRow from "./SingleTableRow";

const AllTableRows = ({ isFetching, tradeDataOrdered, reorderTrigger }) => {
  const [rowSequenceClicked, setRowSequenceClicked] = useState(-2);
  const [stockData, setStockData] = useState([]);
  const [isFetchingStockData, setIsFetchingStockData] = useState(false);
  const [stockDataNEW, setStockDataNEW] = useState([]);
  const [isFetchingStockDataNEW, setIsFetchingStockDataNEW] = useState(false);

  useEffect(() => {
    setRowSequenceClicked(-2);
  }, [reorderTrigger]);

  useEffect(() => {
    if (rowSequenceClicked !== -2) {
      const tradesRow = tradeDataOrdered[rowSequenceClicked];
      const ticker = tradesRow.ticker;

      fetchStockDataNEW(ticker);
      fetchStockData(ticker);
    }
  }, [rowSequenceClicked]);

  function identifyRowClicked(seq) {
    setRowSequenceClicked(seq);
  }

  const apiKey = "U288LAEMR485UKD1";

  async function fetchStockData(tick) {
    const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${tick}&apikey=${apiKey}`;

    try {
      setIsFetchingStockData(true);
      const res = await fetch(endpoint);
      const json = await res.json();
      if (Object.keys(json))
        // console.log(" all table rows", json);
        // console.log("FETCH TRIGGERED");
        setStockData(json);
      setIsFetchingStockData(false);
      // return json;
    } catch (error) {
      console.error(error);
    }
  }


    async function fetchStockDataNEW (ticker) {
      try {
        setIsFetchingStockData(true);
        const endpoint = `http://localhost:5001/historical/${ticker}`;
        const res = await fetch(endpoint);
        const json = await res.json();
        // console.log(jsonData);
        if (Object.keys(json))
            setStockDataNEW(json);
          setIsFetchingStockDataNEW(false);
      } catch (error) {
        console.error(error);
      }
    }



  return (
    <>
      {isFetching ? (
        <div className="singleTableRow" key={`row`}>
          <div className="singleTableRow" key={`date`}>
            fetching
          </div>
          <div className="singleTableRow" key={`transType`}>
            ...
          </div>
          <div className="singleTableRow" key={`ticker`}>
            ...
          </div>
          <div className="singleTableRow" key={`amount`}>
            ...
          </div>
          <div className="singleTableRow" key={`options`}>
            ...
          </div>
        </div>
      ) : (
        tradeDataOrdered.map((rowData, sequence) => (
          <SingleTableRow
            rowData={rowData}
            sequence={sequence}
            rowSequenceClicked={rowSequenceClicked}
            identifyRowClicked={identifyRowClicked}
            key={`singleRow${sequence}`}
            stockData={stockData}
            stockDataNEW = {stockDataNEW}
            isFetchingStockDataNEW = {isFetchingStockDataNEW}
          />
        ))
      )}
    </>
  );
};

export default AllTableRows;
