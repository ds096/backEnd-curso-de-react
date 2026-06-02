import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// CREATE TASK
app.post("/", async (req, res) => {
  await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    },
  });
  res.status(201).json(req.body);
});

// UPDATE TASK
app.put("/:id", async (req, res) => {
  console.log(req);
  await prisma.task.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    },
  });

  res.status(200).json(req.body);
});

// GET TASKS
app.get("/", async (req, res) => {
  let tasks = [];
  if (req.query) {
    tasks = await prisma.task.findMany({
      where: {
        title: req.query.title,
      },
    });
  } else {
    tasks = await prisma.task.findMany();
  }

  res.status(200).json(tasks);
});

// DELETE TASK
app.delete("/:id", async (req, res) => {
  await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(3000);
