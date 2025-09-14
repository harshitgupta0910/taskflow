const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://task_manage_db:qqwcyWdCQv90PYja@cluster0.i2eguq7.mongodb.net/task_management?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
