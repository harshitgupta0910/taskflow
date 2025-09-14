const Task = require("../models/Task");


exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ created_at: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  try {
    const task = await new Task({ user: req.userId, ...req.body }).save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: "Task deleted" });
};
