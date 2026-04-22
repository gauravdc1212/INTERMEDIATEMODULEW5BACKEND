import Task from "../models/taskmodel.js";

// CREATE TASK
export const createTaskService = async (userId, data) => {
  const task = await Task.create({
    title: data.title,
    description: data.description,
    user: userId,
  });

  return task;
};

// GET TASKS
export const getTasksService = async (user) => {
  
  // Admin → all tasks

  if (user.role === "admin") {
    return await Task.find().populate("user", "name email").sort({ createdAt: -1 });
  }

  // User → only own tasks

  return await Task.find({ user: user._id }).sort({ createdAt: -1 });
};

// UPDATE TASK
export const updateTaskService = async (user, taskId, data) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  // Permission check
  if (user.role !== "admin" && task.user.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  task.title = data.title || task.title;
  task.description = data.description || task.description;

  await task.save();

  return task;
};

// DELETE TASK
export const deleteTaskService = async (user, taskId) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  // Permission check
  
  if (user.role !== "admin" && task.user.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  await task.deleteOne();

  return { message: "Task deleted" };
};