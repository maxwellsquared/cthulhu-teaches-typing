const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

const port = 8080;

let numberinRoom = 0;

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

  // waits for two players to connect
  socket.on('joinWaitingRoom', () => {
    console.log('player joined waiting room');
    numberinRoom++;
    if (numberinRoom === 2) {
      //! works!
      io.sockets.emit('startGame', 5);
      numberinRoom = 0;
    }
  });

  // when two players are connected, start game
  // socket.on('startGame', (numberInRoom) => {
  //   if (numberInRoom > 1) {
  //     console.log('starting game');
  //     io.sockets.emit('startGame', 5);
  //     // set timeout for 5 seconds
  //     setTimeout(() => {
  //       io.sockets.emit('beginGame', room);
  //       console.log('game started');
  //     }, 5000);
  //   }
  // });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
