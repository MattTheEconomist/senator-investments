import { useState, useEffect } from "react";
import React from "react";
import TableHeader from "./TradesTableHeader";
import TableRows from "./TableRows";

const TradesTable = ({ tradeData, isFetching }) => {
  const [tradeDataOrdered, setTradeDataOrdered] = useState([]);
  const [reorderTrigger, setReorderTrigger] = useState(false);

  useEffect(() => {
    setTradeDataOrdered(tradeData);
    // console.log(isFetching);
    console.log("from trades table", tradeDataOrdered);
    setReorderTrigger(false);
  }, [isFetching, tradeData, reorderTrigger]);
  // }, []);

  function reOrderByHeader(header, isAscending) {
    setReorderTrigger(true);

    if (!tradeData) {
      return null;
    }
    let rez = [];

    let firstReturn = 1;
    let secondReturn = -1;

    if (!isAscending) {
      firstReturn = -1;
      secondReturn = 1;
    }

    if (header === "transaction_date") {
      rez = tradeData.sort((a, b) =>
        new Date(b[header]) > new Date(a[header]) ? firstReturn : secondReturn
      );
    }
    if (header === "ticker") {
      function replaceUnknown(symbol) {
        symbol === "--" ? (symbol = "zzzzzzz") : (symbol = symbol);
        return symbol;
      }
      rez = tradeData.sort((a, b) =>
        replaceUnknown(a[header]) < replaceUnknown(b[header])
          ? firstReturn
          : secondReturn
      );
    }

    if (header === "type") {
      rez = tradeData.sort((a, b) =>
        a[header] < b[header] ? firstReturn : secondReturn
      );
    }

    console.log("reordered func", rez);
    // setSortTriggered(false);
    setTradeDataOrdered(rez);
    // return rez;
  }

  // tableRows = orderTradeTableRows(tradeDataOrdered);
  // let tableRows = orderTradeTableRows(tradeDataOrdered);

  // console.log(reOrderByHeader("amount", "ascending"));
  // console.log(reOrderByHeader("ticker", false));
  // console.log(reOrderByHeader("transaction_date", true));
  // console.log(reOrderByHeader("type", true));

  // const tableRows = tradeData.map((el, i) => {

  const tableHeaderList = [
    {
      headerText: "Date",
      columnValue: "transaction_date",
    },
    {
      headerText: "Transaction",
      columnValue: "type",
    },
    {
      headerText: "Ticker",
      columnValue: "ticker",
    },
    {
      headerText: "Amount",
      columnValue: "amount",
    },
    {
      headerText: "Options",
      columnValue: false,
    },
  ];

  const tableHeaders = tableHeaderList.map((el, i) => {
    return (
      <TableHeader
        key={`header-${el.headerText}`}
        headerText={el.headerText}
        columnValue={el.columnValue}
        reOrderByHeader={reOrderByHeader}
      />
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            {/* <th>Date</th>
          <th>Transaction Type</th>
          <th>Ticker</th>
          <th>Amount</th>
          <th>Options</th> */}
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          <TableRows
            isFetching={isFetching}
            tradeDataOrdered={tradeDataOrdered}
          />
          {/* {tableRows} */}
        </tbody>
      </table>
    </>

    // <>

    //   <h5>helooo</h5>
    //   <ul>{tradeListElements}</ul>
    // </>
  );
};

export default TradesTable;
