const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './')));

app.get('*', (req, res) => {
  var path = req.params[0];
  res.sendFile(path);
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), () => {
  var port = app.get('port');
  console.log('> Listening at http://localhost:%s', port);
});
