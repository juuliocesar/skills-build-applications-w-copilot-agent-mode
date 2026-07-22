import app from './index.js';

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    port,
    apiUrl,
    database: 'mongodb'
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${apiUrl}`);
});
