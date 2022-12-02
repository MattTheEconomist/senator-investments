const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");

const app = express();

// middlewarre

app.use(cors());

app.use(express.json());

// ROUTES//

//trade query
app.get("/trades", async (req, res) => {
  try {
    let queryString = "SELECT * from transactions";

    let matches = [];

    const requestQuery = req.query;

    console.log("query is", requestQuery);

    const columns = Object.keys(requestQuery);
    const values = Object.values(requestQuery);

    if (columns.length !== 0) {
      let currentColumn = columns.pop();
      let currentValue = values.pop();

      let filterCriteria = ` WHERE ${currentColumn}=${currentValue}`;

      while (columns.length >= 1) {
        let currentColumn = columns.pop();
        let currentValue = values.pop();

        filterCriteria =
          filterCriteria += `and ${currentColumn}=${currentValue}`;
      }

      queryString += filterCriteria;
    }

    matches = await pool.query(queryString);

    res.json(matches.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a transaction by id

app.get("/trades/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thisTrade = await pool.query(
      "SELECT * from transactions WHERE transaction_id=$1",
      [id]
    );
    res.json(thisTrade.rows);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});


function findTableFromTicker(ticker){


  leadingLetter = ticker.charAt(0)
  tableName ='"historical_pricesA_G"'

  if ('ABCDEFG'.includes(leadingLetter)){
    tableName ='"historical_pricesA_G"'
  }
  if ('HIJKLMNOPQR'.includes(leadingLetter)){
    tableName ='"historical_pricesH_R"'
  }
  if ('STUVWXYZ'.includes(leadingLetter)){
    tableName ='"historical_pricesS_Z"'
  }

  return tableName 
}


// get historical prices

app.get("/historical/:ticker", async (req, res) => {
  try {
    console.log("from serv", req)
    const {ticker} = req.params; 

    tableName = findTableFromTicker(ticker)

    let queryString = `SELECT "date", "SPY", "${ticker}" from ${tableName} order by "date"`

    let matches = [];

    const requestQuery = req.query;

    console.log("query is", requestQuery);

    const columns = Object.keys(requestQuery);
    const values = Object.values(requestQuery);


    matches = await pool.query(queryString);

    res.json(matches.rows);

  } catch (error) {
    console.error(error.message);
  }
});


// get historical prices & transactions 
app.get("/historical/:ticker/:startDate/:senatorId", async (req, res) => {

  try {

    const {ticker} = req.params; 
    const {startDate} = req.params; 
    const {senatorId} = req.params; 

    const senatorIdInt = parseInt(senatorId)


    console.log("specific query", req.params)

    tableName = findTableFromTicker(ticker)


    let queryString = `
    with trans as(
      SELECT transaction_date, type from transactions
   WHERE TO_DATE(transaction_date,'YYYY-MM-DD')  BETWEEN date '${startDate}' and date '${startDate}' + interval '6 months' 
   AND 
   "senatorId"=${senatorIdInt}
   AND ticker='${ticker}'
   )
   , 
   hist as (
      SELECT "date", "SPY", "${ticker}" from ${tableName}
     WHERE TO_DATE("date",'YYYY-MM-DD')  BETWEEN date '${startDate}' - interval '1 week' and date '${startDate}' + interval '6 months' 
       order by "date"
   )
   select hist."SPY", hist."${ticker}" as close,  
   CASE 
    WHEN hist."date" is null
    THEN trans.transaction_date
    ELSE hist."date"
   END as date, 
   trans.type, 
   trans.transaction_date
    from hist 
   full outer join trans 
   on    trans.transaction_date = hist."date"
   order by date
   ;


    `

    let matches = [];

    const requestQuery = req.query;


    const columns = Object.keys(requestQuery);
    const values = Object.values(requestQuery);


    matches = await pool.query(queryString);

    res.json(matches.rows);

  } catch (error) {
    console.error(error.message);
  }
});