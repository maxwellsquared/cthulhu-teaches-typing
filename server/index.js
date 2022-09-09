const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});
let scoresArr = [];
let highestWpm;
io.on('connection', (socket) => {
  // listen for a score being sent from the client
  socket.on('scores', (results) => {
    // add the score to an array
    scoresArr.push({
      name: results.userName,
      wpm: results.wpm,
      accuracy: results.accuracy,
      numTotalChars: results.numTotalChars,
      numCorrectChars: results.numCorrectChars,
      numMistakes: results.numMistakes,
    });

    // log each user's score
    console.log('scoresArr:', scoresArr);

    // if there are two scores, compare them
    if (scoresArr.length === 2) {
      // compare the wpm of each item in the array, return the highest
      const highestWpm = scoresArr.reduce((prev, current) =>
        prev.wpm > current.wpm ? prev : current
      );

      // emit the highest wpm to the client
      // io.emit('highestWpm', highestWpm);
    }
  });
});

http.listen(8080, () => console.log('listening on port 8080'));
