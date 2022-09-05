import { useState, useEffect } from 'react';
import RandomWords from '../helpers/RandomWords';

export default function TypingField() {
  // timer functionality
  const [counter, setCounter] = useState(60);
  const [started, setStarted] = useState(false);

  // text to be typed
  const [randomWords, setRandomWords] = useState(RandomWords({ time: 1, numWords: 225 })); // returns array of 225 words
  const initialRandomWords = randomWords.toString(); // converts array to string

  // inputs from user
  const [input, setInput] = useState('');
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(initialRandomWords.replace(/,/g, ' ')); // stores the characters on the right side of the cursor
  const [lastKey, setLastKey] = useState(); // stores the last character typed

  // stats
  const [correctChars, setCorrectChars] = useState(0); // stores number of correct characters entered
  const [totalChars, setTotalChars] = useState(0); // stores total number of characters entered
  const [mistakes, setMistakes] = useState(0); // set number of mistakes player has made

  // changes classNames
  const [xPosition, setXPosition] = useState(0); // set number of characters typing division is offset by
  const [divClassName, setDivClassName] = useState('typing'); // give the typing div the 'typing shaken' class and it'll turn red and shake
  const [timerClass, setTimerClass] = useState('timer');
  const [fullDivStyle, setFullDivStyle] = useState({
    position: 'relative', // set typing division style (in order to set position)
    left: '0ch',
  });

  // ?? in progress to track index of last character typed
  const [lastCharIndex, setLastCharIndex] = useState(0);

  // console.log('input: ', input);
  // console.log('leftChars: ', leftChars);
  // console.log('rightChars: ', rightChars);
  // console.log('lastKey: ', lastKey);
  // console.log('correctChars: ', correctChars);
  // console.log('totalChars: ', totalChars);
  // console.log('mistakes: ', mistakes);

  // ---- TIMER FUNCTION ----
  useEffect(() => {
    // checks if started or counter state changes, timer begins when the test starts. updates every second.
    if (started) {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter < 10) setTimerClass('timer timer-countdown'); // set the timer red for the last 10 seconds
      return () => clearInterval(timer);
    }
  }, [counter, started]);

  // --- UPDATES WORDS SECTIONS
  useEffect(() => {
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });
  }, [leftChars]);

  // take the first character off RightCars and add it to LeftChars
  const moveChars = function (length) {
    setLeftChars((prev) => prev + `${randomWords[0]} `);
    setRightChars((prev) => prev.slice(length + 1));
    // set the amount to move the div over by
    setXPosition((prev) => prev - (length + 1));
  };

  // ---- INPUT FUNCTION ----
  const handleInput = function (event) {
    if (event === ' ' && input === '') {
      return;
    } else {
      // ?? work in progress

      characterCheck(randomWords[0], lastCharIndex, event);

      setLastKey(input[input.length - 1]); // set the last key to be the last character of the input string
      // !! not sure if we need setLastKey

      setTotalChars((prev) => prev + 1);
      setFullDivStyle((prev) => {
        return { ...prev, left: `${xPosition}ch` };
      });

      if (!started) {
        setStarted(true); // starts test status to 'started == true' on first input
      }
      if (event.slice(-1) === ' ') {
        // if space bar pressed

        console.log('reset setLastCharIndex to 0');
        setLastCharIndex(0);
        if (input === randomWords[0]) {
          setCorrectChars((prev) => prev + randomWords[0].length + 1);
        }
        setRandomWords((prev) => [...prev.slice(1)]);
        moveChars(randomWords[0].length);
        setInput('');
      } else {
        setInput(event);
      }
    }
  };


  // takes in the current random word and the last key pressed and compares them
  const characterCheck = (word, charIndexOfWord, keyPressed) => {
    let lastCharFromKey = keyPressed[keyPressed.length - 1];

    setLastCharIndex((prev) => prev + 1);

    if (word[charIndexOfWord] === lastCharFromKey) {
      console.log('correct letter for that word');
    } else {
      if (keyPressed[keyPressed.length - 1] !== ' ') {
        console.log('incorrect letter for that word');
      }
    }
  };

  return (
    <>
      <div className={divClassName} style={fullDivStyle}>
        <div className="typing-left">{leftChars}</div>
        <div className="typing-right">{rightChars}</div>
      </div>
      <input
        className="font-sans"
        placeholder=""
        radius="md"
        size="md"
        value={input}
        // ^ sets to display nothing and not have any extra input chars
        onChange={(event) => handleInput(event.target.value)}
        autoFocus="autofocus"
      />
      <div className={timerClass}>TIME: {counter}</div>
      <div className="testing-info">
        <div className="font-mono">LAST KEY: '{lastKey}'</div>
        <div className="font-mono">TOTAL ENTRIES: {totalChars}</div>
        <div className="font-mono">SUCCESSFUL ENTRIES: {correctChars}</div>
        <div className="font-mono">MISTAKES: {mistakes}</div>
      </div>
    </>
  );
}
