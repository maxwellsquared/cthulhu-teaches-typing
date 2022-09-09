const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

const port = 8080;

io.on('connect', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // receive message from client
  socket.on('FromClient', (results) => {
    console.log('Message from client:', results);
    // send message to ALL clients

    io.sockets.emit('FromAPI', results);
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
