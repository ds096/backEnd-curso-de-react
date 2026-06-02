import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
    },
  });
  res.status(201).json(req.body);
});

app.put("/:id", async (req, res) => {
  console.log(req);
  await prisma.task.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    },
  });

  res.status(200).json(req.body);
});

app.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks);
});

app.delete("/:id", async (req, res) => {
  await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(3000);
