const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 将此替换为你要代理的目标API的URL
const targetApiUrl = 'https://my-zyvg.onrender.com';

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    console.log(`Authorization header: Bearer ${process.env.API_SECRET_KEY}`);

    const response = await axios.post(targetApiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_SECRET_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});
