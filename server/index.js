const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

const port = process.env.PORT || 8080;

let numberInRoom = 0;

io.on('connect', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // receive message from client
  socket.on('FromClient', (results) => {
    // send message to ALL clients
    io.sockets.emit('FromAPI', results);
  });

  // waits for two players to connect
  socket.on('joinWaitingRoom', () => {
    console.log('player joined waiting room');
    numberInRoom++;
    if (numberInRoom === 2) {
      io.sockets.emit('startGame', 15);
      numberInRoom = 0;
    }
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
