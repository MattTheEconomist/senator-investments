import React from "react";
import { useState, useEffect } from "react";

const RowExpansion = ({ sequence, rowData, rowSequenceClicked }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (rowSequenceClicked === sequence) {
      setIsExpanded(true);
      console.log("rowData", rowData);
    } else {
      setIsExpanded(false);
    }
  }, [rowSequenceClicked, sequence, rowData]);

  //   const infoCols = [
  //     "asset_description",
  //     "asset_type",
  //     "type",
  //     "transaction_date",
  //     "disclosure_date",
  //   ];

  const infoColsObj = {
    asset_description: "asset",
    type: "type",
    transaction_date: "transaction date",
    disclosure_date: "disclosure_date",
    owner: "executor",
  };

  const cardListItems = Object.keys(infoColsObj).map((col) => (
    <li>
      {`${infoColsObj[col]}: `}
      {rowData[col]}
    </li>
  ));

  const expansionDiv = isExpanded ? (
    <div id="expansionDiv">
      <div id="criticalInfoCard">
        <ul>{cardListItems}</ul>
      </div>
    </div>
  ) : (
    <></>
  );

  return <>{expansionDiv}</>;
};

export default RowExpansion;
