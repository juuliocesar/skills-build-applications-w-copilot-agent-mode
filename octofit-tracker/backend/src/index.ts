import express from 'express';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port, database: 'mongodb' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});

export default app;
