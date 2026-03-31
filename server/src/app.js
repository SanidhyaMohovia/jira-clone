import express from 'express';
import cors from 'cors';
import { db } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';



import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authorized',
    user: req.user,
  });
});
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ message: 'DB connected', rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB failed' });
  }
});


app.get('/', (req, res) => {
  res.send('API running');
});

export default app;