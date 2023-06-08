const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found in environment variables' });
  }
  res.json({ key: apiKey });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
