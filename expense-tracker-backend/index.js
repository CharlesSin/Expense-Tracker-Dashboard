import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import mongodb from "./database/database.js";
import transactionsRouter from "./routes/transactions.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", transactionsRouter);

app.get("/", (req, res, next) => {
  res.send("This is Expense Tracker Backend Service");
});

const server = () => {
  mongodb();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
