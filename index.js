const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

const TARGET_URL = 'https://poe.com/';
const COOKIE_VALUE = process.env.COOKIE_VALUE || '';
const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || '';

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (!req.cookies.access || req.cookies.access !== ACCESS_PASSWORD) {
    if (req.method === 'POST' && req.body.password === ACCESS_PASSWORD) {
      res.cookie('access', ACCESS_PASSWORD);
      res.redirect('/');
    } else {
      res.send(`
        <form method="post">
          <h1>请输入访问密码</h1>
          <input type="password" name="password" />
          <button type="submit">提交</button>
        </form>
      `);
    }
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (!req.cookies.authenticated) {
    res.cookie('authenticated', '1');
    res.cookie('p-b', COOKIE_VALUE);
  }
  next();
});

app.use(
  '/',
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.cookies['p-b']) {
        proxyReq.setHeader('Cookie', `p-b=${req.cookies['p-b']}`);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      res.header('X-Proxied-By', 'Vercel Proxy');
    },
  })
);

app.listen(port, () => {
  console.log(`Vercel Proxy listening at http://localhost:${port}`);
});
