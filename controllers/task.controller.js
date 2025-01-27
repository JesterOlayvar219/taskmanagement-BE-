const db = require("../models");
const Task = db.task;

// Get all tasks
exports.allTasks = async (req, res) => {
  console.log("ID:", req.userId);
  try {
    const tasks = await Task.find({ createdBy: req.userId })
      .populate("assignedTo", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new task
exports.addTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority || "medium",
      status: req.body.status || "todo",
      assignedTo: req.body.assignedTo || req.userId,
      createdBy: req.userId,
      labels: req.body.labels || [],
      attachments: req.body.attachments || [],
    });

    const savedTask = await task.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a specific task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
      .populate("assignedTo", "username")
      .populate("createdBy", "username");

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      lables,
      attachments,
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        dueDate,
        priority,
        status,
        assignedTo,
        lables,
        attachments,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  // res.status(200).send("Delete a Task");
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
