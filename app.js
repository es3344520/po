const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-password', (req, res) => {
  const password = process.env.PASSWORD_KEY;
  res.json({ password });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
