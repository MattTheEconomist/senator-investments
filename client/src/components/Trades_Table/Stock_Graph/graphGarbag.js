svg
  .selectAll(".aBar")
  .data(fakeData)
  .enter()
  .append("rect")
  .attr("x", (d) => d.close)
  .attr("y", (d, i) => i * 50)
  .attr("height", (d) => d.close)
  .attr("width", 40)
  .attr("fill", "blue")
  .attr("class", "aBar");
// const rez = min;

// return (
//   <text x="0" y="50" font-family="Verdana" font-size="20" fill="blue">
//     {/* {rez} */}
//   </text>
// );

attr(
  "d",
  d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.close);
    })
);

// var x = d3
//   .scaleTime()
//   .domain(
//     d3.extent(fakeData, function (d) {
//       return d.date;
//     })
//   )
//   .range([0, width]);
// svg
//   .append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));

// // Add Y axis
// var y = d3
//   .scaleLinear()
//   .domain([
//     0,
//     d3.max(fakeData, function (d) {
//       return +d.close;
//     }),
//   ])
//   .range([height, 0]);
// svg.append("g").call(d3.axisLeft(y));

const fakeData = [
  { date: 1, close: 65.27 },
  { date: 2, close: 69.45 },
  { date: 3, close: 72.45 },
  { date: 4, close: 59.45 },
  { date: 5, close: 46.45 },
  { date: 6, close: 50.45 },
];
