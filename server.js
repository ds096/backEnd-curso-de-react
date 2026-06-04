import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// CREATE TASK
app.post("/", async (req, res) => {
  const task = await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    },
  });

  res.status(201).json(task);
});
//UPDATE TASK
app.put("/edit-task/:id", async (req, res) => {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });

  const updatedTask = await prisma.task.update({
    where: {
      id: req.params.id,
    },
    data: { title: req.body.title, description: req.body.description },
  });
  res.status(200).json(updatedTask);
});

// UPDATE TASK COMPLETED
app.put("/:id", async (req, res) => {
  const task = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });

  const updatedTask = await prisma.task.update({
    where: {
      id: req.params.id,
    },
    data: {
      completed: !task.completed,
    },
  });

  res.status(200).json(updatedTask);
});

// GET TASKS
app.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();

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
