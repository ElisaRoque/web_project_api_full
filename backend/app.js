const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use((req, res, next) => {
  req.user = {
    _id: "6a6640a650b12003daac8241",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "A solicitação não foi encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
