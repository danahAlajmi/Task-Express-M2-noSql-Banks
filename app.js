let accounts = require("./accounts");
const express = require("express");
const connectDb = require("./api/db/database");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");

connectDb();

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
