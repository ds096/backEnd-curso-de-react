import express from "express";

const app = express();

const tasks = [];

app.post("/", (req, res) => {
  console.log(req);
  res.send("Aqui deu certo");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
