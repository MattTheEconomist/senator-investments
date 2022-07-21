const express = require("express");
const cors = require("cors");

const app = express();

// middlewarre

app.use(cors());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
