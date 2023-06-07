const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/get-key', (req, res) => {
  const key = process.env.KEY_NAME;
  res.json({ key });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
