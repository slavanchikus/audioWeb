const express = require('express');
const bodyParser = require('body-parser');

const connectRoutes = require('./routes/index');

const app = express();
const port = 8000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || port, () => {
  console.log(`We are live on ${port}`);
  connectRoutes(app);
});
