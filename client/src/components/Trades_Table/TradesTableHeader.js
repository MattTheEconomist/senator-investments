import React from "react";
import { useState } from "react";

const TableHeader = ({ headerText, columnValue, reOrderByHeader,
   focusColumn, setFocusColumn
   }) => {
  const [isAscending, setIsAscending] = useState(true);


  function orderTable() {
    setIsAscending(!isAscending);
    reOrderByHeader(columnValue, isAscending);
    // console.log("clicked button", columnValue)

  }

  
  
  let buttonClasses = "headerOrderBtn"

  isAscending? buttonClasses += " btnAscending": buttonClasses +=" btnDescending"


  const isFocused = focusColumn===columnValue? true:false


  isFocused? buttonClasses += " focusedColumn": buttonClasses += " notFocusedColumn"
  

  if(!isFocused){
    buttonClasses=buttonClasses.replace(" btnAscending", " btnDescending")
  }


  return (
    <div className="tradeTableHeader">
      <div className="headerTextContainer">{headerText}</div>
      <div id={`IDheaderOrderBtn_${columnValue}`} className={buttonClasses} onClick={orderTable}></div>
    </div>
  );
};

export default TableHeader;
