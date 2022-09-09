const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  // listen for a score being sent from the client
  socket.on('scores', (arg) => {
    console.log('arg', arg);
    // send the score to all clients
    io.emit('scores', arg);
  });
});

http.listen(8080, () => console.log('listening on port 8080'));
