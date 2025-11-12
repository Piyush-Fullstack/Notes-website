const taskModel = require('../models/Task');
const userModel = require('../models/User');

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = await taskModel.create({
      user: req.user.id,
      title,
      description
    });

    res.status(201).json({
      message: 'Task created successfully',
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        user: task.user
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user.id });
    res.status(200).json({ message: 'Tasks fetched successfully', tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = await taskModel.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksById = async (req,res) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
      }
}
module.exports = { createTask, deleteTask, getTasks, updateTask,getTasksById };
