const path = require('path');
const express = require('express');
const winston = require('winston');
const cors = require('cors');
const people = require('./people/router');
const messages = require('./messages/router');
const recurrences = require('./recurrences/router');
const scheduler = require('./recurrences/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // remove before prod.
app.use('/dist', express.static('dist'));

// Serve the front end.
app.get('/', function(req, res) {
  res.sendFile(path.normalize(path.join(__dirname, '..', 'index.html')));
});

// Serve the REST API.
app.use('/api/people', people);
app.use('/api/messages', messages);
app.use('/api/recurrences', recurrences);

app.listen(PORT, '0.0.0.0', function(err) {
  if (err) {
    // TODO: fix node error handling.
    winston.error(err);
    return;
  }

  winston.info(`Listening at http://localhost:${ PORT }`);

  scheduler.start();
});
