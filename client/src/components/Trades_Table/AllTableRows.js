import React from "react";
import { useState, useEffect } from "react";
import SingleTableRow from "./SingleTableRow";

const AllTableRows = ({ isFetching, tradeDataOrdered, reorderTrigger }) => {
  const [rowSequenceClicked, setRowSequenceClicked] = useState(-2);
  const [isFetchingStockData, setIsFetchingStockData] = useState(false);
  const [stockData, setStockData] = useState([]);


  useEffect(() => {
    setRowSequenceClicked(-2);
  }, [reorderTrigger]);

  useEffect(() => {
    if (rowSequenceClicked !== -2) {
      const tradesRow = tradeDataOrdered[rowSequenceClicked];

      const ticker = tradesRow.ticker;
      const senatorId = tradesRow.senatorId; 
      const transaction_date = tradesRow.transaction_date; 

      fetchStockData(ticker, transaction_date, senatorId);
    }
  }, [rowSequenceClicked]);

  function identifyRowClicked(seq) {
    setRowSequenceClicked(seq);
  }


    async function fetchStockData(ticker, transaction_date, senatorId) {
      try {
        setIsFetchingStockData(true);
        const endpoint = `http://localhost:5001/historical/${ticker}/${transaction_date}/${senatorId}`;

        const res = await fetch(endpoint);
        const json = await res.json();
        if (Object.keys(json))
            setStockData(json);
          setIsFetchingStockData(false);
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
            stockData = {stockData}
            isFetchingStockData = {isFetchingStockData}
          />
        ))
      )}
    </>
  );
};

export default AllTableRows;
