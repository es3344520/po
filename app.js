const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/', (req, res) => {
  res.json({ message: 'Hello from the target API' });
});

app.listen(port, () => {
  console.log(`Target API server listening at http://localhost:${port}`);
});
