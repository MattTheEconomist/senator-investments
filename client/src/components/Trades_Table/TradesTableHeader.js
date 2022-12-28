import React from "react";
import { useState } from "react";

const TableHeader = ({ headerText, columnValue, reOrderByHeader,
   focusColumn, setFocusColumn
   }) => {
  const [isAscending, setIsAscending] = useState(true);
  // const [isFocusedColumn, setIsFocusedColumn] = useState(false)

  // let tableAscending = true;

  function orderTable() {
    setIsAscending(!isAscending);
    // setIsFocusedColumn(true)
    reOrderByHeader(columnValue, isAscending);
    console.log("clicked button", columnValue)

  }


  
  let buttonClasses = "headerOrderBtn"

  isAscending? buttonClasses += " btnAscending": buttonClasses +=" btnDescending"

  focusColumn===columnValue? buttonClasses += " focusedColumn": buttonClasses += " notFocusedColumn" 






  return (
    <div className="tradeTableHeader">
      <div className="headerTextContainer">{headerText}</div>
      <div id={`IDheaderOrderBtn_${columnValue}`} className={buttonClasses} onClick={orderTable}></div>
    </div>
  );
};

export default TableHeader;
