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
    let queryString = "SELECT * from trades";

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
        let columnCounter = 2;
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
      "SELECT * from trades WHERE transaction_id=$1",
      [id]
    );
    res.json(thisTrade.rows);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
