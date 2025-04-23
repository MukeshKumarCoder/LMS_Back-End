const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    console.log(`App is running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
