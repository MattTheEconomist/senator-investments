import React from "react";
import * as d3 from "d3";

const StockGraph = ({ data }) => {
  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
  };

  // const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  const blankReturn = (
    <text x="0" y="50" font-family="Verdana" font-size="20" fill="blue">
      fetching data
    </text>
  );

  function drawGraph(stockData) {
    // const min = d3.min([1, 2, 3]);

    if (data.length < 1) {
      return blankReturn;
    }

    const dates = stockData.map((row) => row.date);

    const min = d3.min(dates);

    // const rez = typeof stockData;
    // const rez = JSON.stringify(stockData);
    // const rez = JSON.stringify(dates);

    const rez = min;

    return (
      <text x="0" y="50" font-family="Verdana" font-size="20" fill="blue">
        {rez}
      </text>
    );
  }

  const svgGraph = data.length < 1 ? blankReturn : drawGraph(data);

  return (
    <svg
      //  ref={svgRef}
      width={svgWidth}
      height={svgHeight}
    >
      {svgGraph}
    </svg>
  );
};

export default StockGraph;
