import React from "react";
import { useState } from "react";
import RowExpansion from "./RowExpansion";

const SingleTableRow = ({
  sequence,
  rowData,
  rowSequenceClicked,
  identifyRowClicked,

}) => {
  const [isHovering, setIsHovering] = useState(false);

  function rowExpansion(i) {
    identifyRowClicked(sequence);
  }

  function onMouseHover(i) {
    setIsHovering(true);
  }

  function onMouseLeave(i) {
    setIsHovering(false);
  }





  return (
    <>
      <div
        onClick={() => rowExpansion(sequence)}
        onMouseOver={() => onMouseHover(sequence)}
        onMouseLeave={() => onMouseLeave(sequence)}
        id={isHovering ? "shadedRow" : `row${sequence}`}
        className="singleTableRow"
      >
        <div key={`date${sequence}`} className="tradesTableCell">
          {rowData.transaction_date}
        </div>
        <div key={`transType${sequence}`} className="tradesTableCell">
          {rowData.type}
        </div>
        <div key={`ticker${sequence}`} className="tradesTableCell">
          {rowData.ticker}
        </div>
        <div key={`amount${sequence}`} className="tradesTableCell">
          {rowData.amount}
        </div>
        <div key={`alpha${sequence}`} className="tradesTableCell">
          {rowData.alpha}
        </div>
      </div>
      <RowExpansion
        sequence={sequence}
        rowData={rowData}
        rowSequenceClicked={rowSequenceClicked}

      />
    </>
  );
};

export default SingleTableRow;
