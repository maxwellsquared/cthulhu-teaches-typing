import { useState, useEffect, useContext } from 'react';
import RandomWords from '../helpers/RandomWords';
import LoggedInWelcomeBanner from './LoggedInWelcomeBanner';

import { UserContext } from '../helpers/context';

export default function TypingField() {
  // timer functionality
  const [counter, setCounter] = useState(60);
  const [started, setStarted] = useState(false);

  // user functionality
  const { user, setUser } = useContext(UserContext);

  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(''); // stores the characters on the left side of the cursor
  const [nextChar, setNextChar] = useState(); // stores the correct next character to type
  const [lastKey, setLastKey] = useState(); // stores the last character typed

  const [correctChars, setCorrectChars] = useState(0); // stores number of correct characters entered
  const [totalChars, setTotalChars] = useState(0); // stores total number of characters entered
  const [mistakes, setMistakes] = useState(0); // set number of mistakes player has made

  const [xPosition, setXPosition] = useState(0); // set number of characters typing division is offset by
  const [divClassName, setDivClassName] = useState('typing'); // give the typing div the 'typing shaken' class and it'll turn red and shake
  const [timerClass, setTimerClass] = useState('timer');
  const [fullDivStyle, setFullDivStyle] = useState({
    position: 'relative', // set typing division style (in order to set position)
    left: '0ch',
  });

  // state variables for testing
  const [successfulTyping, setsuccessfulTyping] = useState('enter some text first');
  const [testText, setTestText] = useState();

  // const [timeLimit, setTimeLimit] = useState(); // stores the time limit for the test
  const timeLimit = 1; // temporary hardcoded 1 minute time limit
  const numWords = timeLimit * 225; // sets length of text to be typed

  // ---- CALLED ON PAGE LOAD ----
  useEffect(() => {
    //set random words based on time limit as a string
    const initialRandomWords = RandomWords(numWords).toString();
    // set right characters to random words
    setRightChars(initialRandomWords.replace(/,/g, ' ')); // replaces commas with spaces
    setLeftChars('');
    setTotalChars(0);
    setMistakes(0);
    console.log('user from TypingField.jsx', user); // log user
  }, []);

  // ---- CALLED ON UPDATE ----
  useEffect(() => {
    setNextChar(rightChars[0]); // set the next character to be the first character of the right string
    setMistakes(totalChars - correctChars);
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });
  });

  // ---- TIMER FUNCTION ----
  useEffect(() => {
    // checks if started or counter state changes, timer begins when the test starts. updates every second.
    if (started) {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter < 10) setTimerRed(); // set the timer red for the last 10 seconds
      return () => clearInterval(timer);
    }
  }, [counter, started]);

  // make the timer red
  const setTimerRed = function () {
    setTimerClass('timer timer-countdown');
  };

  // take the first character off RightCars and add it to LeftChars
  const moveChars = function () {
    let xSize = 1;
    // let leftXSize = 0;
    setLeftChars((prevState) => {
      return prevState + rightChars[0];
    });
    setRightChars(rightChars.slice(1));
    // set the amount to move the div over by
    setXPosition((prev) => {
      return prev - xSize;
    });
  };

  // successful entry of a character
  const userSuccess = function () {
    setsuccessfulTyping('YAY!!!!!');
    setCorrectChars((prev) => {
      return prev + 1;
    });
    moveChars();
    setDivClassName('typing'); // removing this causes the shaken animations to trigger for some reason???
  };

  // unsuccessful entry of a character
  const userMistake = function () {
    setsuccessfulTyping('BIG BUMMER');
    setDivClassName('typing shaken'); // give the whole typing div a shake and flash red
    setTimeout(() => {
      setDivClassName('typing'); // set the typing div back to normal after 250ms
    }, 250);
  };

  // ---- INPUT FUNCTION ----
  const handleInput = function (event) {
    setStarted(true); // starts test status to 'started == true' on first input

    // get the value of the input and set the last key to that character
    let inputValue = event.target.value;

    setLastKey(inputValue[inputValue.length - 1]);

    if (inputValue === ' ' && nextChar === ' ') {
      moveChars(true);
      return;
    }
    if (inputValue === ' ') {
      return; // do nothing if the user types space and doesn't need to
    }
    setTotalChars((prev) => {
      return prev + 1;
    });

    setTestText(() => {
      return `Next char is '${nextChar}.' Input was '${inputValue}' and that's ok.`;
    });

    if (inputValue !== nextChar) {
      userMistake();
      return;
    }

    userSuccess();
  };

  return (
    <>
      {user ? <LoggedInWelcomeBanner /> : null}
      <h1>NOT LOGGED IN</h1>
      <h1>TypingField Test</h1>
      <div className={divClassName} style={fullDivStyle}>
        <div className="typing-left">{leftChars}</div>
        <div className="typing-right">{rightChars}</div>
      </div>
      <input
        placeholder="Type here"
        radius="md"
        size="md"
        value=""
        // ^ sets to display nothing and not have any extra input chars
        onChange={(event) => handleInput(event)}
      />
      <div className={timerClass}>TIME: {counter}</div>
      <div className="testing-info">
        <div className="font-mono">LAST KEY: '{lastKey}'</div>
        <div className="font-mono">TOTAL ENTRIES: {totalChars}</div>
        <div className="font-mono">SUCCESSFUL ENTRIES: {correctChars}</div>
        <div className="font-mono">MISTAKES: {mistakes}</div>
        <div className="font-mono">CHARACTER RESULT: {successfulTyping}</div>
        <div className="font-mono">Test info: {testText}</div>
      </div>
    </>
  );
}
