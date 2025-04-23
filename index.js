const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dataBase = require("./config/DB");

const userRoutes = require("./routes/UserRoutes");
const leaveRoutes = require("./routes/LeaveRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "",
    credentials: true,
  })
);

dataBase.connect();

// routes
app.use("/auth", userRoutes);
app.use("/leaves", leaveRoutes);

app.listen(PORT, async () => {
  try {
    console.log(`App is running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
