const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = 3000;
const TRADES_FILE = path.join(__dirname, "trades.json");

app.use(bodyParser.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :date[iso]"
  )
);

const readTrades = () => {
  const data = fs.readFileSync(TRADES_FILE, "utf-8");
  return JSON.parse(data);
};

const writeTrades = (trades) => {
  fs.writeFileSync(TRADES_FILE, JSON.stringify(trades, null, 2));
};

app.post("/trades", (req, res) => {
  const newTrade = req.body;
  const trades = readTrades();
  newTrade.id = trades.length ? trades[trades.length - 1].id + 1 : 1;
  trades.push(newTrade);
  writeTrades(trades);
  res.status(201).send(newTrade);
});

app.get("/trades", (req, res) => {
  const trades = readTrades();
  res.status(200).send({ trades });
});

app.get("/trades/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const trades = readTrades();
  const trade = trades.find((t) => t.id === id);
  if (trade) {
    res.status(200).send(trade);
  } else {
    res.status(404).send({ error: "ID not found" });
  }
});

app.delete("/trades/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let trades = readTrades();
  const tradeIndex = trades.findIndex((t) => t.id === id);
  if (tradeIndex !== -1) {
    trades = trades.filter((t) => t.id !== id);
    writeTrades(trades);
    res.status(200).send({ message: "Trade deleted successfully" });
  } else {
    res.status(404).send({ error: "ID not found" });
  }
});

app.patch("/trades/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newPrice = req.body.price;
  let trades = readTrades();
  const trade = trades.find((t) => t.id === id);
  if (trade) {
    trade.price = newPrice;
    writeTrades(trades);
    res.status(200).send(trade);
  } else {
    res.status(404).send({ error: "ID not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
