import { db } from '../config/db.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, project_id } = req.body;
    const userId = req.user.id;

    if (!title || !project_id) {
      return res.status(400).json({ error: 'Title and project required' });
    }

    await db.query(
      'INSERT INTO tasks (title, description, project_id, user_id) VALUES (?, ?, ?, ?)',
      [title, description, project_id, userId]
    );

    res.status(201).json({ message: 'Task created' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE project_id = ?',
      [projectId]
    );

    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({ message: 'Task updated' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};