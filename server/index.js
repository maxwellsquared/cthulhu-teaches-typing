const internal = require('stream');

const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});

// // array to hold all the scores
// let scoresArr = [];

// // function to return the winner with the highest score when the scoreArr is longer than two
// const getWinner = function () {
//   const winner = scoresArr.reduce((acc, curr) => {
//     return acc.wpm > curr.wpm ? acc : curr;
//   });

//   console.log('winner', winner);
//   io.emit('gameOver', winner);
// };

// io.on('connection', (socket) => {
//   // listen for a score being sent from the client
//   socket.on('scores', (results) => {
//     console.log('scores results', results);
//     // add the score to an array
//     scoresArr.push({
//       name: results.userName,
//       wpm: results.wpm,
//       accuracy: results.accuracy,
//       numTotalChars: results.numTotalChars,
//       numCorrectChars: results.numCorrectChars,
//       numMistakes: results.numMistakes,
//     });
//     console.log('scoresArr', scoresArr);
//     // emit the winner when the game is over
//   });

//   socket.on('gameOver', () => {
//     // console.log('game over has been emitted');
//     // const winner = scoresArr.reduce((acc, curr) => {
//     //   return acc.wpm > curr.wpm ? acc : curr;
//     // });
//     let winner = 'dog shit';

//     console.log('winner', winner);
//     io.emit('gameOver', winner);
//   });
// });

// http.listen(8080, () => console.log('listening on port 8080'));

//// !! fresh attempt

// const express = require('express');
// const http = require('http', {
//   cors: { origin: '*' },
// });
// const http = require('http');

// const socketIo = require('socket.io');
// const socketIo = require('socket.io')(http, {
//   cors: { origin: 'http://localhost:3001/about', methods: ['GET', 'POST'] },
// });

const port = 8080;
// const index = require('./app.js');

// const app = express(index);
// app.use(index);
// const server = http.createServer(app);
// const io = socketIo(server);

// let gameResult = null;
// let interval;

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   if (internal) {
//     console.log('game is over');
//     clearGameResult(gameResult);
//   }
//   interval = setInterval(() => getResultAndEmit(socket), 1000);
//   // gameResult = setGameResult(() => getResultAndEmit(socket), 1000);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//     // clearGameResult(gameResult);
//     clearInterval(internal);
//   });
// });

// const getResultAndEmit = (socket) => {
//   const result = Math.floor(Math.random() * 10);
//   socket.emit('fromAPI', result);
// };

// const clearGameResult = (gameResult) => {
//   gameResult = null;
// };

// const setGameResult = (callback, interval) => {
//   return setInterval(callback, interval);
// };

let interval;

io.on('connect', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // when client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

http.listen(port, () => console.log(`Listening on port ${port}`));
