import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskservice.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.user._id, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET
export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksService(req.user);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(
      req.user,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const result = await deleteTaskService(req.user, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};