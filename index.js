const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const encodedVal = process.env.decodedEncVal || "TUpmYllNeTlqbVp4R2NPZzJTVCt5dDNhdSswR3NjUFFBSUJwT2VvbS9vaz0";
const customCode = process.env.decodedCustomCode || "YXNka2Rvc2lmb213a2ppYQ";
const AUTHENTICATION_KEY = process.env.AUTHENTICATION_KEY || "your-secret-key";

app.get('/data', async (req, res) => {
  if (!req.query.key || req.query.key !== AUTHENTICATION_KEY) {
    res.status(401).send('Unauthorized');
    return;
  }
  
  try {
    const result = { encodedVal, customCode };
    res.json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
