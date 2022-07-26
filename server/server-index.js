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

    const column = Object.keys(requestQuery).pop();
    const value = Object.values(requestQuery).pop();

    if (typeof column !== "undefined") {
      const filterCriteria = ` WHERE ${column}=$1`;

      queryString += filterCriteria;
      matches = await pool.query(queryString, [value]);
    } else {
      matches = await pool.query(queryString);
    }

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
