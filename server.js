import express from "express";
import prisma from "./lib/prisma.ts";

const app = express();
app.use(express.json());

const tasks = [];

app.post("/", (req, res) => {
  tasks.push(req.body);
  res.status(201).json(req.body);
});

app.get("/", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(3000);
