const http = require('http');
const electronApp = require('electron').app;

const express = require('express')
const app = express()

// every worker gets unique port, get it from a process environment variables
var port = process.env.ELECTRON_WORKER_PORT,
    host = process.env.ELECTRON_WORKER_HOST,
    workerId = process.env.ELECTRON_WORKER_ID; // worker id useful for logging



electronApp.on('ready', function() {
  // you can use any webserver library/framework you like (connect, express, hapi, etc)
  var server = app.use('/workers', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.json({lol: 'lol'});

    req.pipe(res);
  });

  server.listen(port, host);
});