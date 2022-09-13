import { useState, useEffect, useContext } from 'react';
import RandomWords from '../helpers/RandomWords';
import difficultRandomWords from '../helpers/difficultRandomWords';
import ResultsModal from './ResultsModal';
import { CodeContext, randomWordsContext } from '../helpers/context';
import SubmittedWords from './SubmittedWords';
import DifficultyDropdown from './DifficultyDropdown';
import codeRandomWords from '../helpers/codeRandomWords';
import codeLanguageRandom from '../helpers/codeLanguageRandom';
import binaryCode from '../helpers/binaryCode';
import {Howl, Howler} from 'howler';

// setup howler sounds
const keyStroke = new Howl({src: './sounds/thwock.wav', volume: 0.1});
const countdown = new Howl({src: './sounds/countdown-tick.wav', rate: 1.1});
const bell = new Howl({src: './sounds/bell-tolling.mp3'});
const splat = new Howl({src: './sounds/splat.mp3'});

export default function TypingField() {
  const { codeEntered, setCodeEntered } = useContext(CodeContext);
  const { randomWords, setRandomWords } = useContext(randomWordsContext); // use context to get randomWords

  // timer functionality
  const initialTimer = 15; // use constant for initial timer and pass to counter--needed for WPM
  const [counter, setCounter] = useState(initialTimer);
  const [started, setStarted] = useState(false);
  const [soundStarted, setSoundStarted] = useState(false); // sound for countdown


  // text to be typed
  let initialRandomWords = randomWords.toString(); // converts array to string

  // inputs from user
  const [input, setInput] = useState('');
  const [keyStrokes, setKeyStrokes] = useState([]); // stores keystrokes for Konami Code
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
  const [leftWords, setLeftWords] = useState([]);
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(initialRandomWords.replace(/,/g, ' ')); // stores the characters on the right side of the cursor

  // --- stats ---
  const [wordsPerMinute, setWordsPerMinute] = useState('meatball'); // set WPM to pass along
  const [accuracy, setAccuracy] = useState('gabagool');
  const [isComplete, setIsComplete] = useState(false);

  // changes classNames
  const [xPosition, setXPosition] = useState(0); // set number of characters typing division is offset by
  const [divClassName, setDivClassName] = useState('typing text-pale-gold'); // give the typing div the 'typing shaken' class and it'll turn red and shake
  const [timerClass, setTimerClass] = useState('timer text-dark-navy dark:text-pale-gold'); // give the timer the 'timer red' class and it'll turn red
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

  // ---- TIMER FUNCTION ----
  useEffect(() => {
    // checks if started or counter state changes, timer begins when the test starts. updates every second.
    if (started) {
      setPlaceholder('');
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter < 10) {
        setTimerClass('timer timer-countdown'); // set the timer red for the last 10 seconds
        playCountdown();
      }
      if (counter === 0) gameOver(); // call gameOver, calculate states and display modal
      return () => clearInterval(timer);
    }
  }, [counter, started]);

    // setup countdown noise
    const playCountdown = function() {
      let localTruth = false;
      if (soundStarted) localTruth = true;
      if (!soundStarted) countdown.play();
      setSoundStarted(true);
    };
  

  // ---- GAME OVER ----
  const gameOver = function () {
    bell.play();
    setAccuracy(Math.floor(100 * (1 - numMistakes / numTotalChars)));
    setWordsPerMinute(Math.floor(numCorrectChars / 5 / (initialTimer / 60)));
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
    // set the amount to move the div over by one character
    setXPosition((prev) => prev - (length + 1));
  };

  // --- SCREEN SHAKE ---
  const screenShake = () => {
    setDivClassName('typing dark:text-pale-gold text-dark-navy shaken');
    setTimeout(() => {
      setDivClassName('typing dark:text-pale-gold text-dark-navy');
    }, 250);
  };

  // ---- INPUT FUNCTION ----
  const handleInput = function (event) {
    keyStroke.play();
    if (event === ' ' && input === '') {
      return;
    }

    characterCheck(randomWords[0], lastCharIndex, event, backspacePressed);

    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });

    if (!started) {
      setStarted(true); // starts test status to 'started == true' on first input
    }

    // if space bar pressed
    if (event.slice(-1) === ' ') {
      setLastCharIndex(0); // reset lastCharIndex to 0 if space pressed. Used by characterCheck

      if (input === randomWords[0]) {
        moveChars(randomWords[0].length, true); // move over characters and pass 'correct' to the styling component
      }
      if (input !== randomWords[0]) {
        moveChars(randomWords[0].length, false); // move over characters and pass 'mistake' to styling
        splat.play();
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

    const lastCharFromKey = keyPressed[keyPressed.length - 1];

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
      setIncorrectCharCSS('bg-incorrectInput dark:bg-incorrectInput');
    }
  };

  // ---- BACKSPACE FUNCTION AND CODE CHECK ----
  const detailedInput = (event) => {
    if (event.key === 'Backspace') {
      setBackspacePressed(true);
    } else {
      setBackspacePressed(false);
    }

    setKeyStrokes((prev) => [...prev, event.key]);

    if (compareArrays(keyStrokes, konamiCode)) {
      setCodeEntered(true);
    }
  };

  // --- compare arrays ----
  const compareArrays = function (array1, array2) {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  };

  // --- format time ---
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
  }

  const [difficulty, setDifficulty] = useState('standard');
  // function to return 'standard' or 'complex' depending on the difficulty
  const changeDifficulty = (difficulty) => {
    let updatedWords;

    if (difficulty === 'standard') {
      setDifficulty('standard');
      setRandomWords(RandomWords({ time: 1, numWords: 225 }));
      updatedWords = randomWords.toString();
      setRightChars(updatedWords.replace(/,/g, ' '));
    }

    if (difficulty === 'complex') {
      setDifficulty('complex');
      setRandomWords(difficultRandomWords({ time: 1, numWords: 100 }));
      updatedWords = randomWords.toString();
      setRightChars(updatedWords.replace(/,/g, ' '));
    }

    if (difficulty === 'code') {
      setDifficulty('code');
      setRandomWords(codeRandomWords({ time: 1, numWords: 100 }));
      updatedWords = randomWords.toString();
      setRightChars(updatedWords.replace(/,/g, ' '));
    }

    if (difficulty === 'impossible') {
      setDifficulty('impossible');
      setRandomWords(codeLanguageRandom({ time: 1, numWords: 100 }));
      updatedWords = randomWords.toString();
      setRightChars(updatedWords.replace(/,/g, ' '));
    }

    if (difficulty === 'binary') {
      setDifficulty('binary');
      setRandomWords(binaryCode({ time: 1, numWords: 100 }));
      updatedWords = randomWords.toString();
      setRightChars(updatedWords.replace(/,/g, ' '));
    }
  };

  // update the rightChars when the difficulty is changed, only runs when the difficulty is changed
  useEffect(() => {
    let updatedWords = randomWords.toString();
    setRightChars(updatedWords.replace(/,/g, ' '));
  }, [difficulty]);

  return (
    <>
      <ResultsModal difficulty={difficulty} gameOver={isComplete} wpm={wordsPerMinute} accuracy={accuracy} />
      <div style={{ color: 'white', visibility: codeEntered ? 'visible' : 'hidden' }}>
        CONGRATULATION!!!! VISIBLE
      </div>
      <div className="input-container mt-20 mb-10">
        <div className={divClassName} style={fullDivStyle}>
          <div className="typing-left">
            <SubmittedWords words={leftWords} />
          </div>
          <div className="typing-right text-dark-navy dark:text-pale-gold">{rightChars}</div>
        </div>

        <input
          className={`rounded-t-lg font-sans ${incorrectCharCSS} bg-beige text-dark-navy placeholder:text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold dark:placeholder:text-pale-gold`}
          placeholder={placeholder}
          radius="md"
          size="md"
          value={input}
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={(event) => detailedInput(event)}
          autoFocus="autofocus"
        />
        <span className={timerClass}>{formatTime(counter)}</span>
      </div>
      {started ? (
        <div className="invisible">
          <DifficultyDropdown changeDifficulty={changeDifficulty} difficulty={difficulty} />
        </div>
      ) : (
        <DifficultyDropdown changeDifficulty={changeDifficulty} difficulty={difficulty} />
      )}
    </>
  );
}
