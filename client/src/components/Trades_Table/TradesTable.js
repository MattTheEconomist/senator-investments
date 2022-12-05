import { useState, useEffect } from "react";
import React from "react";
import TableHeader from "./TradesTableHeader";
import AllTableRows from "./AllTableRows";

const TradesTable = ({ tradeData, isFetching }) => {
  const [tradeDataOrdered, setTradeDataOrdered] = useState([]);
  const [reorderTrigger, setReorderTrigger] = useState(false);

  useEffect(() => {
    setTradeDataOrdered(tradeData);
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
        let outputSymbol = symbol;
        if (symbol === "--") {
          outputSymbol = "zzzzzzz";
        }
        return outputSymbol;
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

    if (header === "amount") {
      function transformNumber(amountRange) {
        if (amountRange === "Unknown") {
          return "zzzzzzzz";
        }
        const firstNumString = amountRange
          .split("-")[0]
          .trim()
          .replace(",", "")
          .replace("$", "");
        const firstNumInt = parseInt(firstNumString);
        return firstNumInt;
      }

      rez = tradeData.sort((a, b) =>
        transformNumber(a[header]) < transformNumber(b[header])
          ? firstReturn
          : secondReturn
      );
    }

    setTradeDataOrdered(rez);
  }

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
      <div id="fullTradesTable">
        <div id="tradesTableHeaders">{tableHeaders}</div>
        <div id="allTradeTableRows">
          <AllTableRows
            isFetching={isFetching}
            tradeDataOrdered={tradeDataOrdered}
            reorderTrigger={reorderTrigger}
          />
        </div>
      </div>
      {/* <table>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>
          <AllTableRows
            isFetching={isFetching}
            tradeDataOrdered={tradeDataOrdered}
            reorderTrigger={reorderTrigger}
          />
          {tableRows}
        </tbody>
      </table> */}
    </>

    // <>

    //   <h5>helooo</h5>
    //   <ul>{tradeListElements}</ul>
    // </>
  );
};

export default TradesTable;
