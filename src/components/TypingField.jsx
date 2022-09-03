import { useState, useEffect } from 'react';
import RandomWords from '../helpers/RandomWords';

export default function TypingField() {
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(''); // stores the characters on the left side of the cursor
  const [nextChar, setNextChar] = useState(); // stores the correct next character to type

  const [lastKey, setLastKey] = useState(); // stores the last character typed

  const [correctChars, setCorrectChars] = useState(0); // stores number of correct characters entered
  const [totalChars, setTotalChars] = useState(0); // stores total number of characters entered
  const [mistakes, setMistakes] = useState(0); // set number of mistakes player has made

  const [xPosition, setXPosition] = useState(0); // set number of characters typing division is offset by

  const [divClassName, setDivClassName] = useState('typing'); // give the typing div the 'typing shaken' class and it'll turn red and shake

  // set style(s) for the full typing area
  const [fullDivStyle, setFullDivStyle] = useState({
    position: 'relative',
    left: '0ch',
  });

  // state variables for testing
  const [successfulTyping, setsuccessfulTyping] = useState('enter some text first');
  const [testText, setTestText] = useState();

  // const [timeLimit, setTimeLimit] = useState(); // stores the time limit for the test
  const timeLimit = 1; // temporary hardcoded 1 minute time limit
  const numWords = timeLimit * 225; // sets length of text to be typed

  // page load
  useEffect(() => {
    //set random words based on time limit as a string
    const initialRandomWords = RandomWords(numWords).toString();
    // set right characters to random words
    setRightChars(initialRandomWords.replace(/,/g, ' ')); // replaces commas with spaces
    setLeftChars('');
    setTotalChars(0);
    setMistakes(0);
  }, []);

  // called on update
  useEffect(() => {
    setNextChar(rightChars[0]); // set the next character to be the first character of the right string
    setMistakes(totalChars - correctChars);
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });
  });

  // take the first character off RightCars and add it to LeftChars
  const moveChars = function (withSpace) {
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

  // handle user input
  const handleInput = function (event) {
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
      <h1>New TypingField Test</h1>
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
      <div className="testing-info">
        <div className="font-mono">LAST KEY: '{lastKey}'</div>
        <div className="font-mono">TOTAL ENTRIES: {correctChars}</div>
        <div className="font-mono">SUCCESSFUL ENTRIES: {correctChars}</div>
        <div className="font-mono">MISTAKES: {mistakes}</div>
        <div className="font-mono">CHARACTER RESULT: {successfulTyping}</div>
        <div className="font-mono">Test info: {testText}</div>
      </div>
    </>
  );
}
