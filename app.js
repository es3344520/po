const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api-key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
