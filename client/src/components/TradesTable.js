import { useState, useEffect } from "react";
import React from "react";

const TradesTable = ({ tradeData, isFetching }) => {
  // const [inpuData, setInputData] = useState([]);

  console.log("IS FETCHING", isFetching);

  const tradeListElements = tradeData.map((el, i) => {
    return <li key={i}>{el.ticker}</li>;
  });

  const tableRows = tradeData.map((el, i) => {
    if (isFetching) {
      return <h2>FETCHING</h2>;
    }
    return (
      <tr key={`row${i}`}>
        <td key={`date${i}`}>{el.transaction_date}</td>
        <td key={`transType${i}`}>{el.type}</td>
        <td key={`ticker${i}`}>{el.ticker}</td>
        <td key={`amount${i}`}>{el.amount}</td>
        <td key={`options${i}`}>options </td>
      </tr>
    );
  });

  console.log(tradeListElements);
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction Type</th>
          <th>Ticker</th>
          <th>Amount</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
    // <>

    //   <h5>helooo</h5>
    //   <ul>{tradeListElements}</ul>
    // </>
  );
};

export default TradesTable;
