const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/botRoutes');
routes(app);

app.listen(port);

console.log('github bot RESTful API server started on: ' + port);
