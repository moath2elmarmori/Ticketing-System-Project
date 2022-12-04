const path = require("path");
const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const connectDB = require("./config/db");
const graphqlSchema = require("./graphql/graphqlSchema");

connectDB();

app.use(
  cors({
    origin: "*",
  })
);

if (process.env.NODE_ENV !== "production") {
  app.get("/we-are-in", (req, res) => {
    res.send("development mode");
  });
} else {
  app.get("/we-are-in", (req, res) => {
    res.send("production mode");
  });
}

// using the graphql schema along with graphiql
app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    graphiql: process.env.NODE_ENV === "development",
    context: { requestObject: req },
  }))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.use("/", (req, res) => {
    res.send("PLEASE SET TO PRODUCTION");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`.magenta);
});
