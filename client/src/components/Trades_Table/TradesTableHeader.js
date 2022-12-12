import React from "react";
import { useState } from "react";

const TableHeader = ({ headerText, columnValue, reOrderByHeader }) => {
  const [isAscending, setIsAscending] = useState(true);
  // let tableAscending = true;

  function orderTable() {
    setIsAscending(!isAscending);
    reOrderByHeader(columnValue, isAscending);
  }

  return (
    <div className="tradeTableHeader">
      {headerText}
      {/* <input type="button">Ord</input> */}
      {/* <input>Ord</input> */}
      {/* <p>test</p> */}
      <button onClick={orderTable}>ord</button>
    </div>
  );
};

export default TableHeader;
