'use strict';
const app = require('../app');
const handler = require('../handler');
const authenticate = require('../middlewares/authenticate');

const middleware = (req, res) => {
  console.log('Entered Middleware');
  return res.status(200).json({
    message: 'Go Serverless v1.0! Your function executed successfully!',
  });
};

app.get('/', middleware);
app.get('/authorized', authenticate, middleware);

module.exports.handler = handler(app);
