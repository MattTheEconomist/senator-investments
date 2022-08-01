import React, { useEffect } from "react";

const TableRows = ({ isFetching, tradeDataOrdered }) => {
  useEffect(() => {
    // rows = orderTradeTableRows(tradeDataOrdered);
    console.log("from table rows", tradeDataOrdered);
  }, [tradeDataOrdered, isFetching]);

  // function orderTradeTableRows(tradeData) {
  //   if (isFetching) {
  //     return (
  //       <tr key={`row`}>
  //         <td key={`date`}>fetching</td>
  //         <td key={`transType`}></td>
  //         <td key={`ticker`}></td>
  //         <td key={`amount`}></td>
  //         <td key={`options`}></td>
  //       </tr>
  //     );
  //   }
  //   const rez = tradeData.map((el, i) => (
  //     <tr key={`row${i}`}>
  //       <td key={`date${i}`}>{el.transaction_date}</td>
  //       <td key={`transType${i}`}>{el.type}</td>
  //       <td key={`ticker${i}`}>{el.ticker}</td>
  //       <td key={`amount${i}`}>{el.amount}</td>
  //       <td key={`options${i}`}>options </td>
  //     </tr>
  //   ));

  //   return rez;
  // }

  // let rows = orderTradeTableRows(tradeDataOrdered);

  return (
    <>
      {" "}
      {isFetching ? (
        <tr key={`row`}>
          <td key={`date`}>fetching</td>
          <td key={`transType`}></td>
          <td key={`ticker`}></td>
          <td key={`amount`}></td>
          <td key={`options`}></td>
        </tr>
      ) : (
        tradeDataOrdered.map((el, i) => (
          <tr key={`row${i}`}>
            <td key={`date${i}`}>{el.transaction_date}</td>
            <td key={`transType${i}`}>{el.type}</td>
            <td key={`ticker${i}`}>{el.ticker}</td>
            <td key={`amount${i}`}>{el.amount}</td>
            <td key={`options${i}`}>options </td>
          </tr>
        ))
      )}
    </>
  );
};

export default TableRows;
