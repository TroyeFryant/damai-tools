const http = require('http');
const https = require('https');

const requestHandler = (req, res) => {
  const proxyReq = https.get('https://mtop.damai.cn/gw/mtop.common.getTimestamp/', (proxyRes) => {
    let responseData = '';

    proxyRes.on('data', (chunk) => {
      responseData += chunk;
    });

    proxyRes.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.end(responseData);
    });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy Error:', err);
    res.statusCode = 500;
    res.end();
  });
};

const server = http.createServer(requestHandler);
server.listen(8000, () => {
  console.log('Proxy server is running on port 8000');
});
