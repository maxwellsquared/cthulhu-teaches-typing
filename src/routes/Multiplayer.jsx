import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../helpers/context';
import SubmittedWords from '../components/SubmittedWords';
import MultiplayerResultsModal from '../components/MultiplayerResultsModal';
import { BeatLoader } from 'react-spinners';
import io from 'socket.io-client';
import multiplayerRandomWords from '../helpers/multiplayerRandomWords';

// setup socket connection
const ENDPOINT = 'http://127.0.0.1:8080'; // PORT used in the server/index.js file
const socket = io(ENDPOINT);

const Multiplayer = function () {
  const { user, userScore, setUserScore, guestName } = useContext(UserContext);

  // timer functionality
  const initialTimer = 15; // use constant for initial timer and pass to counter--needed for WPM
  const [counter, setCounter] = useState(initialTimer);
  const [started, setStarted] = useState(false);

  // text to be typed
  const [randomWords, setRandomWords] = useState(multiplayerRandomWords()); // returns array of 225 words
  let initialRandomWords = randomWords.toString(); // converts array to string

  // inputs from user
  const [input, setInput] = useState('');
  const [leftWords, setLeftWords] = useState([]);
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(initialRandomWords.replace(/,/g, ' ')); // stores the characters on the right side of the cursor

  // stats

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
  const [placeholder, setPlaceholder] = useState('Type here!');
  const [incorrectCharCSS, setIncorrectCharCSS] = useState('');

  /// sockets
  const [scoresFromServer, setScoresFromServer] = useState([]); // array of scores from server
  const [remainingSeconds, setRemainingSeconds] = useState(5); //  seconds remaining before game starts

  const [disableTyping, setDisableTyping] = useState(true);
  const [waiting, setWaiting] = useState(true);

  // --- setups socket connection ---
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
      //joins waiting room
      socket.emit('waiting', 'waiting');
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });

    socket.on('FromAPI', (data) => {
      // add data to scoresFromServer
      setScoresFromServer((scoresFromServer) => [...scoresFromServer, data]);
    });

    socket.on('startGame', () => {
      // runs when numberInWaitingRoom === 2 on server
      startCountdown();
      // use setTimeout to start game after 5 seconds
      setTimeout(() => {
        setStarted(true);
        setDisableTyping(false);
      }, 5000);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // start countdown timer
  const startCountdown = () => {
    const interval = setInterval(() => {
      setRemainingSeconds((remainingSeconds) => remainingSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 5050);
  };

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
    // create data object to send to server
    setUserScore({
      user: user ? user.name : guestName,
      wpm: Math.floor(numCorrectChars / 5 / (initialTimer / 60)),
      accuracy: Math.floor((numCorrectChars / numTotalChars) * 100),
      numCorrectChars: numCorrectChars,
    });

    setIsComplete(true);
  };

  // --- UPDATES WORDS SECTIONS
  useEffect(() => {
    setFullDivStyle((prev) => {
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

  // --- SCREEN SHAKE ---
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

    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });

    if (event.slice(-1) === ' ') {
      // if space bar pressed

      setLastCharIndex(0); // reset lastCharIndex to 0 if space pressed. Used by characterCheck

      if (input === randomWords[0]) {
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

  // to send the score to the server when the game is over
  useEffect(() => {
    if (isComplete) {
      // send the score to the server
      socket.emit('FromClient', userScore);
    }
    // rerenders when isComplete changes
  }, [isComplete]);

  // function to compare all scores from scoresFromServer and return the highest wpm
  const getHighestWpm = (scores) => {
    let highestWpm = 0;
    let winnerStats = {};
    scores.forEach((score) => {
      if (score.wpm > highestWpm) {
        highestWpm = score.wpm;
        winnerStats = score;
      }
    });
    return winnerStats;
  };

  // once button clicked, emit to waiting room to start game
  // increment the number of players in the waiting room
  const joinWaitingRoom = () => {
    //increment the number of players in the waiting room
    socket.emit('joinWaitingRoom');
    // set waiting to be true
    setWaiting(false);
  };

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
  }

  return (
    <>
      <h1 className="mt-20 text-center text-7xl text-blood-red underline">1 vs 1 Mode</h1>
      <div className="input-container my-14">
        {user ? null : (
          <h1 className="-ml-14 mb-10 font-mono text-4xl text-pale-gold">
            Welcome{' '}
            <span className="font-serif text-5xl font-extrabold text-blood-red"> {guestName}</span>
          </h1>
        )}

        <div className={divClassName} style={fullDivStyle}>
          <div className="typing-left">
            <SubmittedWords words={leftWords} />
          </div>
          <div className={`typing-right ${started ? '' : 'blur'}`}>{rightChars}</div>
        </div>

        <input
          className={`rounded-t-lg font-sans ${incorrectCharCSS}`}
          placeholder={placeholder}
          disabled={disableTyping}
          radius="md"
          size="md"
          value={input}
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={(event) => detailedInput(event)}
          autoFocus="autofocus"
        />
        <span className={timerClass}>{formatTime(counter)}</span>

        {!disableTyping ? null : (
          <div className="mt-10 flex flex-col align-middle">
            <button
              className="h-24 w-80 rounded-lg bg-pale-gold py-1 px-6 text-center font-mono text-2xl text-cosmic-purple hover:bg-gold-hover"
              onClick={joinWaitingRoom}
            >
              {waiting ? (
                'Join Waiting Room'
              ) : (
                <>
                  <span className="text-base">Waiting for players to join</span>
                  <BeatLoader color="#8C3D34" size={8} />
                </>
              )}
            </button>
            {waiting ? null : (
              <h1 className="mt-5 ml-5 text-4xl text-pale-gold">
                Match starts in <span className="text-blood-red">{remainingSeconds}</span>
              </h1>
            )}
          </div>
        )}
        <MultiplayerResultsModal
          gameOver={isComplete}
          scoresFromServer={scoresFromServer}
          winner={getHighestWpm(scoresFromServer)}
        />
      </div>
    </>
  );
};

export default Multiplayer;
