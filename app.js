const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 将此替换为你要代理的目标API的URL
const targetApiUrl = 'https://my-zyvg.onrender.com';

app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  try {
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

app.get('/api/get-api-key', (req, res) => {
  // 通过检查请求头中的自定义验证令牌来验证请求
  const requestToken = req.header('X-Validation-Token');
  if (requestToken === process.env.VALIDATION_TOKEN) {
    res.json({ apiKey: process.env.API_SECRET_KEY });
  } else {
    res.status(401).json({ error: 'Unauthorized request.' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
