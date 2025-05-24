const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy configurations
const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api/auth'
  }
});

const blogProxy = createProxyMiddleware({
  target: process.env.BLOG_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/blogs': '/api/blogs'
  }
});

const commentProxy = createProxyMiddleware({
  target: process.env.COMMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/comments': '/api/comments'
  }
});

const profileProxy = createProxyMiddleware({
  target: process.env.PROFILE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/profiles': '/api/profiles'
  }
});

// Routes
app.use('/api/auth', authProxy);
app.use('/api/blogs', blogProxy);
app.use('/api/comments', commentProxy);
app.use('/api/profiles', profileProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));