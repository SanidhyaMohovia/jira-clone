import express from 'express';
import cors from 'cors';
import { db } from './config/db.js';


const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ message: 'DB connected', rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB failed' });
  }
});
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

export default app;