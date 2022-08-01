import React from "react";
import { useState } from "react";

const TableHeader = ({ headerText, columnValue, reOrderByHeader }) => {
  const [isAscending, setIsAscending] = useState(true);
  // let tableAscending = true;

  function orderTable() {
    // console.log("from header", columnValue);
    setIsAscending(!isAscending);
    reOrderByHeader(columnValue, isAscending);
  }

  return (
    <th>
      {headerText}
      {/* <input type="button">Ord</input> */}
      {/* <input>Ord</input> */}
      {/* <p>test</p> */}
      <button onClick={orderTable}>ord</button>
    </th>
  );
};

export default TableHeader;
