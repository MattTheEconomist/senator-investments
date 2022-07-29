import React from "react";

const TableHeader = ({
  headerText,
  columnValue,
  reOrderByHeader,
  stateData,
}) => {
  let tableAscending = true;

  function orderTable() {
    console.log("clicked");
    reOrderByHeader(columnValue, true);
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
