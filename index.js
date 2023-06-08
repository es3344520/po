const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const encodedVal = process.env.decodedEncVal || "TUpmYllNeTlqbVp4R2NPZzJTVCt5dDNhdSswR3NjUFFBSUJwT2VvbS9vaz0";
const customCode = process.env.decodedCustomCode || "YXNka2Rvc2lmb213a2ppYQ";
const MY_CUSTOM_ACCESS_TOKEN = process.env.MY_CUSTOM_ACCESS_TOKEN || "your-secret-key";

app.get('/data', async (req, res) => {
  if (!req.query.key || req.query.key !== MY_CUSTOM_ACCESS_TOKEN) {
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
