import { db } from '../config/db.js';

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    // user comes from authMiddleware
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'Project name required' });
    }

    await db.query(
      'INSERT INTO projects (name, user_id) VALUES (?, ?)',
      [name, userId]
    );

    res.status(201).json({ message: 'Project created' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const [projects] = await db.query(
      'SELECT * FROM projects WHERE user_id = ?',
      [userId]
    );

    res.json(projects);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};