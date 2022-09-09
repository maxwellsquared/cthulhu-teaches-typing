const internal = require('stream');

const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

const port = 8080;

let interval;

io.on('connect', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // receive message from client
  socket.on('FromClient', (results) => {
    console.log('Message from client:', results);
    const response = `Server received: ${results.user}, with a WPM of ${results.wpm}`;
    // send message to ALL clients
    io.sockets.emit('FromAPI', response);
  });
});

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit('FromAPI', response);
// };

http.listen(port, () => console.log(`Listening on port ${port}`));
