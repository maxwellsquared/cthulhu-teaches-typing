import { useState, useEffect, useContext } from 'react';
import RandomWords from '../helpers/RandomWords';
import LoggedInWelcomeBanner from './LoggedInWelcomeBanner';
import {Howl, Howler} from 'howler';
import { UserContext } from '../helpers/context';

// const sfx = {
//   thwock: new Howl({src: '../../../public/sounds/thwock.wav'})
// };

const keyStroke = new Howl({src: './sounds/thwock.wav', volume: 0.1});
const countdown = new Howl({src: './sounds/countdown-tick.wav', rate: 1.1});
const bell = new Howl({src: './sounds/bell-tolling.mp3'});

export default function TypingField() {
  // const [timeLimit, setTimeLimit] = useState(); // stores the time limit for the numWords
  const timeLimit = 1; // temporary hardcoded 1 minute time limit
  const numWords = timeLimit * 225; // sets length of text to be typed

  // timer functionality
  const [counter, setCounter] = useState(15);
  const [started, setStarted] = useState(false);

  // user functionality
  const { user, setUser } = useContext(UserContext);

  const [randomWords, setRandomWords] = useState(RandomWords(numWords));
  const initialRandomWords = randomWords.toString();
  const [submissions, setSubmissions] = useState([]);

  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(initialRandomWords.replace(/,/g, ' ')); // stores the characters on the right side of the cursor
  const [nextChar, setNextChar] = useState([]); // stores the correct next character to type
  const [lastKey, setLastKey] = useState(); // stores the last character typed

  const [input, setInput] = useState('');
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
  const [soundStarted, setSoundStarted] = useState(false);

  // ---- CALLED ON UPDATE ----
  const handleKeyPress = () => {
    setNextChar(rightChars[0]); // set the next character to be the first character of the right string
    //setMistakes(totalChars - correctChars);
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });
  };

  // ---- TIMER FUNCTION ----
  useEffect(() => {
    // checks if started or counter state changes, timer begins when the test starts. updates every second.
    if (started) {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter < 10) {
        setTimerRed(); // set the timer red for the last 10 seconds
        playCountdown();
      }
      if (counter === 0) bell.play();
      return () => clearInterval(timer);
    }
  }, [counter, started]);

  // --- UPDATES WORDS SECTIONS
  useEffect(() => {
    setFullDivStyle((prev) => {
      return { ...prev, left: `${xPosition}ch` };
    });
  }, [leftChars]);

  // make the timer red
  const setTimerRed = function () {
    setTimerClass('timer timer-countdown');
  };

  // setup countdown noise
  const playCountdown = function() {
    let localTruth = false;
    if (soundStarted) localTruth = true;
    if (!soundStarted) countdown.play();
    setSoundStarted(true);
  };

  // take the first character off RightCars and add it to LeftChars
  const moveChars = function (length) {
    setLeftChars((prev) => prev + `${randomWords[0]} `);
    setRightChars((prev) => prev.slice(length + 1));
    // set the amount to move the div over by
    setXPosition((prev) => prev - (length + 1));
  };


  // ---- INPUT FUNCTION ----
  const handleInput = function (event) {
    keyStroke.play();
    if (event === ' ' && input === '') {
      // spacebar without any input does nothing
    } else {
      setTotalChars((prev) => prev + 1);
      console.log('input:', input);
      if (!started) {
        setStarted(true); // starts test status to 'started == true' on first input
      }
      if (event.slice(-1) === ' ') {
        // if space bar pressed
        console.log(input, randomWords[0]);
        if (input === randomWords[0]) {
          setCorrectChars((prev) => prev + randomWords[0].length + 1);
        }
        setSubmissions((prev) => [...prev, input]);
        setRandomWords((prev) => [...prev.slice(1)]);
        moveChars(randomWords[0].length);
        setInput('');
      } else {
        setInput(event);
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
        placeholder="Type here"
        radius="md"
        size="md"
        value={input}
        // ^ sets to display nothing and not have any extra input chars
        onChange={(event) => handleInput(event.target.value)}
        onKeyPress={() => handleKeyPress()}
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
