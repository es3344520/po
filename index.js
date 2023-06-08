const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const atob = require('atob');

const app = express();
const PORT = process.env.PORT || 3000;

const encodedVal = "TUpmYllNeTlqbVp4R2NPZzJTVCt5dDNhdSswR3NjUFFBSUJwT2VvbS9vaz0";
const customCode = "YXNka2Rvc2lmb213a2ppYQ";

app.get('/data', async (req, res) => {
  try {
    const decodedEncVal = atob(encodedVal);
    const decodedCustomCode = atob(customCode);
    const result = { decodedEncVal, decodedCustomCode };
    res.json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
