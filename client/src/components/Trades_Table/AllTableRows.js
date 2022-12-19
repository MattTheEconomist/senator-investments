import React from "react";
import { useState, useEffect } from "react";
import SingleTableRow from "./SingleTableRow";

const AllTableRows = ({ isFetching, tradeDataOrdered, reorderTrigger }) => {
  const [rowSequenceClicked, setRowSequenceClicked] = useState(-2);

  const [filterCriteria, setFilterCriteria] = useState({})

  useEffect(()=>{
    setRowSequenceClicked(-2)

  }, [reorderTrigger])


  useEffect(() => {
    if (rowSequenceClicked !== -2) {
      const tradesRow = tradeDataOrdered[rowSequenceClicked];

      const ticker = tradesRow.ticker;
      const senatorId = tradesRow.senatorId; 
      const transaction_date = tradesRow.transaction_date;

    }
  }, [rowSequenceClicked
  ]);




  function identifyRowClicked(seq) {
    setRowSequenceClicked(seq);
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
  

          />

        ))
      )}
    </>
  );
};

export default AllTableRows;



//GARBAGE 


    
      //  const jsonData =   await fetchStockData(tradesRow.ticker, tradesRow.transaction_date, tradesRow.senatorId);
      //  const jsonData =  fetchStockData(tradesRow.ticker, tradesRow.transaction_date, tradesRow.senatorId);
      // setStockData(jsonData)




      // const jsonData = fetchStockData(tradesRow.ticker, tradesRow.transaction_date, tradesRow.senatorId);
      // console.log('JSON DATA FROM ALL TABLE ROWS', jsonData)

      // setStockData(jsonData)





  // useEffect(() => {
  //   setRowSequenceClicked(-2);
  // }, [reorderTrigger]);

  // useEffect(()=>{
  //   if (rowSequenceClicked !== -2) {
  //     const tradesRow = tradeDataOrdered[rowSequenceClicked];

  //     setFilterCriteria({ticker: tradesRow.ticker, 
  //       transaction_date:tradesRow.senatorId, 
  //       senatorId:tradesRow.senatorId })

  //       console.log('all table rows' , filterCriteria)

  //   }

  // }, [rowSequenceClicked])



          // console.log("ALL TABLE ROWS EFFECT TRIGGERED")
        // does not work 
        // console.log(filterCriteria) 

        // works 
        // console.log(tradesRow)

        // console.log(tradesRow.ticker, tradesRow.transaction_date, tradesRow.senatorId)


        // console.log('currenty fetching', filterCriteria)
        // console.log('currenty fetching', tradesRow)

      // fetchStockData(ticker, transaction_date, senatorId);
      // fetchStockData(filterCriteria.ticker, filterCriteria.transaction_date, filterCriteria.senatorId);