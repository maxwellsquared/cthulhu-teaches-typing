import { useEffect, useState, useContext } from 'react';
// import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8080';

import { UserContext } from '../helpers/context';
import RandomWords from '../helpers/RandomWords';
import SubmittedWords from '../components/SubmittedWords';
import SocketTypingField from '../components/SocketTypingField';

const About = function () {
  const { user, userKeyboards, userScore, setUserScore } = useContext(UserContext);

  // timer functionality
  const initialTimer = 5; // use constant for initial timer and pass to counter--needed for WPM
  const [counter, setCounter] = useState(initialTimer);
  const [started, setStarted] = useState(false);

  // text to be typed
  const [randomWords, setRandomWords] = useState(RandomWords({ time: 1, numWords: 225 })); // returns array of 225 words
  const initialRandomWords = randomWords.toString(); // converts array to string

  // inputs from user
  const [input, setInput] = useState('');
  const [leftWords, setLeftWords] = useState([]);
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(initialRandomWords.replace(/,/g, ' ')); // stores the characters on the right side of the cursor
  const [lastKey, setLastKey] = useState(); // stores the last character typed

  // stats
  const [correctChars, setCorrectChars] = useState(0); // stores number of correct characters entered
  const [totalChars, setTotalChars] = useState(0); // stores total number of characters entered
  const [mistakes, setMistakes] = useState(0); // set number of mistakes player has made
  const [wordsPerMinute, setWordsPerMinute] = useState('meatball'); // set WPM to pass along
  const [accuracy, setAccuracy] = useState('gabagool');
  const [isComplete, setIsComplete] = useState(false);

  // changes classNames
  const [xPosition, setXPosition] = useState(0); // set number of characters typing division is offset by
  const [divClassName, setDivClassName] = useState('typing'); // give the typing div the 'typing shaken' class and it'll turn red and shake
  const [timerClass, setTimerClass] = useState('timer');
  const [fullDivStyle, setFullDivStyle] = useState({
    position: 'relative', // set typing division style (in order to set position)
    left: '0ch',
  });

  //  used in characterCheck to check if the last character typed was correct
  const [lastCharIndex, setLastCharIndex] = useState(0);
  const [backspacePressed, setBackspacePressed] = useState(false);
  const [numCorrectChars, setNumCorrectChars] = useState(0);
  const [numTotalChars, setNumTotalChars] = useState(0);
  const [numMistakes, setNumMistakes] = useState(0);
  const [placeholder, setPlaceholder] = useState('Type here!');
  const [incorrectCharCSS, setIncorrectCharCSS] = useState('');

  /// sockets
  const [textFromServer, setTextFromServer] = useState('');

  // setups socket connection
  // const socket = io('ws://localhost:8080'); // url of the server
  useEffect(() => {
    //!! from article
    const socket = socketIOClient(ENDPOINT);

    socket.on('FromAPI', (data) => {
      setTextFromServer(data);
    });
    // listen for a score being sent from the client
    // socket.on('gameOver', (data) => {
    //   console.log('winner in client :', data);
    //   // setTextFromServer(`Game over!  ${winner.name} has won with ${winner.wpm} words per minute!`);
    // });
  }, []);

  // TODO if a game is complete, send the score to the sockets server
  useEffect(() => {
    // if game is complete, create an object with the user's score
    // send the object to the server
    if (isComplete) {
      const finalResult = {
        userName: user.name,
        wpm: wordsPerMinute,
        accuracy: accuracy,
        numTotalChars: numTotalChars,
        numCorrectChars: numCorrectChars,
        numMistakes: numMistakes,
      };
      console.log('finalResult', finalResult); // log the final result
      // where to send the score, access on server with arg.score
      socket.emit('scores', finalResult);
    }
  }, [isComplete]);

  /// sockets above

  // ---- TIMER FUNCTION ----
  useEffect(() => {
    // checks if started or counter state changes, timer begins when the test starts. updates every second.
    if (started) {
      setPlaceholder('');
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter < 10) setTimerClass('timer timer-countdown'); // set the timer red for the last 10 seconds
      if (counter === 0) {
        gameOver(); // call gameOver, calculate states and display modal
      }
      return () => clearInterval(timer);
    }
  }, [counter, started]);

  // ---- GAME OVER ----
  const gameOver = function () {
    // submit score to socket server
    setAccuracy(Math.floor(100 * (1 - numMistakes / numTotalChars)));
    setWordsPerMinute(Math.floor(numCorrectChars / 5 / (initialTimer / 60)));
    setUserScore({
      wpm: Math.floor(numCorrectChars / 5 / (initialTimer / 60)),
      accuracy: Math.floor((numCorrectChars / numTotalChars) * 100),
    });
    setIsComplete(true);
  };

  // --- UPDATES WORDS SECTIONS
  useEffect(() => {
    setFullDivStyle((prev) => {
      // !! stretch
      // if word mistake in the word and don't correct it, and update the word section, then we pass the mistake into the total mistake
      // only update total mistakes on moving the word over
      // allows you to pass a style into the entire div
      return { ...prev, left: `${xPosition}ch` };
    });
  }, [leftChars]);

  // take the word off rightChars and pass the whole word to SubmittedWords
  const moveChars = function (length, isCorrect) {
    setLeftWords((prev) => [...prev, { word: randomWords[0], isCorrect: isCorrect }]);
    setLeftChars((prev) => prev + `${randomWords[0]} `);
    setRightChars((prev) => prev.slice(length + 1));
    // set the amount to move the div over by
    setXPosition((prev) => prev - (length + 1));
  };

  // --- SCREENSHAKE ---
  const screenShake = () => {
    setDivClassName('typing shaken');
    setTimeout(() => {
      setDivClassName('typing');
    }, 250);
  };

  // ---- INPUT FUNCTION ----
  const handleInput = function (event) {
    if (event === ' ' && input === '') {
      return;
    }

    characterCheck(randomWords[0], lastCharIndex, event, backspacePressed);

    setLastKey(input[input.length - 1]); // set the last key to be the last character of the input string

    setTotalChars((prev) => prev + 1);
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });

    if (!started) {
      // starts test status to 'started == true' on first input
      setStarted(true);
    }

    if (event.slice(-1) === ' ') {
      // if space bar pressed

      setLastCharIndex(0); // reset lastCharIndex to 0 if space pressed. Used by characterCheck

      if (input === randomWords[0]) {
        setCorrectChars((prev) => prev + randomWords[0].length + 1);
        moveChars(randomWords[0].length, true); // move over characters and pass 'correct' to the styling component
      }
      if (input !== randomWords[0]) {
        moveChars(randomWords[0].length, false); // move over characters and pass 'mistake' to styling
        screenShake();
      }
      setRandomWords((prev) => [...prev.slice(1)]);
      setInput('');
    } else {
      setInput(event);
    }
  };

  // takes in the current random word and the last key pressed and compares them
  const characterCheck = (word, charIndexOfWord, keyPressed, backspacePressed) => {
    if (backspacePressed) {
      setLastCharIndex((prev) => prev - 1);
      return;
    }

    let lastCharFromKey = keyPressed[keyPressed.length - 1];

    setLastCharIndex((prev) => prev + 1);

    // don't check if the last character is a space
    if (lastCharFromKey === ' ') {
      return;
    }

    setNumTotalChars((prev) => prev + 1);

    if (word[charIndexOfWord] === lastCharFromKey) {
      setNumCorrectChars((prev) => prev + 1);
      setIncorrectCharCSS('');
    } else {
      setNumMistakes((prev) => prev + 1);
      setIncorrectCharCSS('bg-incorrectInput');
    }
  };

  // ---- BACKSPACE FUNCTION ----
  const detailedInput = (event) => {
    if (event.key === 'Backspace') {
      setBackspacePressed(true);
    } else {
      setBackspacePressed(false);
    }
  };

  return (
    <>
      <h1>About</h1>
      <h1 className="font-mono text-green-500">Words Per Minute: {textFromServer}</h1>

      <div className="input-container my-20">
        <div className={timerClass}>TIME: {counter}</div>
        <div className={divClassName} style={fullDivStyle}>
          <div className="typing-left">
            <SubmittedWords words={leftWords} />
          </div>
          <div className="typing-right">{rightChars}</div>
        </div>

        <input
          className={`rounded-t-lg font-sans ${incorrectCharCSS}`}
          placeholder={placeholder}
          radius="md"
          size="md"
          value={input}
          // ^ sets to display nothing and not have any extra input chars
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={(event) => detailedInput(event)}
          autoFocus="autofocus"
        />
      </div>
    </>
  );
};

export default About;
