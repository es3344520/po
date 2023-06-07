const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 将此替换为你要代理的目标API的URL
const targetApiUrl = 'https://my-zyvg.onrender.com';

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(targetApiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.body.apiKey}`, // 使用传递过来的API密钥
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// 新的/get-data路由，用于接收来自Tampermonkey脚本的请求
app.post('/get-data', async (req, res) => {
  try {
    const response = await axios.post('/proxy', {
      ...req.body,
      apiKey: process.env.API_SECRET_KEY, // 将API密钥作为请求的一部分传递给/proxy路由
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// 删除不再需要的/get-api-key路由
// app.get('/get-api-key', (req, res) => {
//   res.json({ apiKey: process.env.API_SECRET_KEY });
// });

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
