import { useState, useEffect } from 'react';
import RandomWords from '../helpers/RandomWords';
import Span from './Span';

export default function TypingField() {
  const [leftChars, setLeftChars] = useState(''); // stores the characters on the left side of the cursor
  const [rightChars, setRightChars] = useState(''); // stores the characters on the left side of the cursor
  const [nextChar, setNextChar] = useState(); // stores the correct next character to type

  const [lastKey, setLastKey] = useState(); // stores the last character typed
  const [freshInput, setFreshInput] = useState(false); // stores whether the last input has been evaluated

  const [correctChars, setCorrectChars] = useState(0); // stores number of correct characters entered
  const [totalChars, setTotalChars] = useState(0); // stores total number of characters entered
  const [mistakes, setMistakes] = useState(0); // set number of mistakes player has made

  // state variables for testing
  const [thisWorks, setThisWorks] = useState('no');
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
  });

  // take the first character off RightCars and add it to LeftChars
  const moveChars = function () {
    setLeftChars((prevState) => {
      return prevState + rightChars[0];
    });

    setRightChars(rightChars.slice(1));
  };

  // successful entry of a character
  const userSuccess = function () {
    setThisWorks('YAY!!!!!');
    setCorrectChars((prev) => {
      return prev + 1;
    });
    moveChars();
  };

  // unsuccessful entry of a character
  const userMistake = function () {
    setThisWorks('BIG BUMMER');
  };

  // handle user input
  const handleInput = function (event) {
    // get the value of the input and set the last key to that character
    let inputValue = event.target.value;
    if (inputValue === ' ' && nextChar === ' ') {
      moveChars();
      return;
    }
    if (inputValue === ' ') {
      return;
    }
    setTotalChars((prev) => {
      return prev + 1;
    });

    setTestText(`Next char is '${nextChar}.' Input was '${inputValue}' and that's ok`);

    if (inputValue !== nextChar) {
      userMistake();
      return;
    }

    setLastKey(inputValue[inputValue.length - 1]);
    // this is doubled! check it out later.
    if (inputValue !== lastKey) userMistake();

    //
    setFreshInput(true);
    userSuccess();
  };

  //     3. If the character typed === the next character:
  //     a. (IF NOT SPACE) successfulCharacters ++
  //     b. call moveChar() // => Remove first character in right string, add to left string
  //     d. Strings container x-position -= 1 character-width
  //     e. User feedback (ding!)
  //  4. If the character typed !== the next character:
  //     a. User feedback (BZZZZ! WRONGO! screenshake)
  //     b. Mistakes ++

  return (
    <>
      <h1>New TypingField Test</h1>
      <div className="typing-area">
        <div className="font-mono">TYPED: {leftChars}</div>
        <div className="font-mono">TO TYPE: {rightChars}</div>
        <hr></hr>
        <div className="font-mono">LAST KEY: {lastKey}</div>
        <div className="font-mono">TOTAL ENTRIES: {correctChars}</div>
        <div className="font-mono">SUCCESSFUL ENTRIES: {correctChars}</div>
        <div className="font-mono">MISTAKES: {totalChars - correctChars}</div>
        <div className="font-mono">DOES THIS WORK?: {thisWorks}</div>
        <div className="font-mono">Test info: {testText}</div>
      </div>
      <input
        placeholder="Type here"
        radius="md"
        size="md"
        value=""
        // ^ sets to display nothing and not have any extra input chars
        onChange={(event) => handleInput(event)}
      />
    </>
  );
}

// export default function TypingFieldOld() {
//   const [currentlyTypedWord, setCurrentlyTypedWord] = useState(''); // This is the word that the user is currently typing
//   const [randomWordArray, setRandomWordArray] = useState([]); // used to store the random words
//   const [currentWordIndex, setCurrentWordIndex] = useState(0); // used to keep track of the current word index
//   const [isCorrect, setIsCorrect] = useState(); // used to keep track of whether the current word is correct or not
//   const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // used to keep track of the number of correct words
//   const [numberOfWords, setNumberOfWords] = useState(50); // used to keep track of the number of words to be typed

//   const initialRandomWords = RandomWords(numberOfWords);

//   useEffect(() => {
//     // generate random words on page load
//     setRandomWordArray(initialRandomWords);
//   }, [numberOfWords]);

//   // function to get current work from the random word array
//   // used to compare with the currently typed word with the current word
//   const getCurrentWord = (index) => {
//     return randomWordArray[index];
//   };

//   // !! function to update state from the input
//   const handleInput = (event) => {
//     // get the value of the input
//     const inputValue = event.target.value;

//     // update the state of the input
//     setCurrentlyTypedWord(inputValue);

//     // compare the input value to the current word
//     const currentWord = getCurrentWord(currentWordIndex);
//     // need to compare the input value to the current word, but only the length of the input value
//     if (inputValue === currentWord.slice(0, inputValue.length)) {
//       console.log('correct');
//       setIsCorrect(true);
//     } else {
//       // if input is a space, do not log incorrect
//       if (inputValue.slice(-1) !== ' ') {
//         console.log('incorrect');
//         setIsCorrect(false);
//       }
//     }

//     // if current input is a space, move to the next word by incrementing the index
//     if (inputValue.endsWith(' ')) {
//       if (isCorrect) {
//         setNumOfCorrectWords(numOfCorrectWords + 1);
//       }
//       setCurrentWordIndex(currentWordIndex + 1); // increment the index
//       setCurrentlyTypedWord(''); // reset the input value
//     }
//   };

//   // are the words user has to type out
//   const displayWordsArr = randomWordArray.map((word, index) => {
//     // check if the current word is the word the user is currently typing
//     const isCurrentWord = index === currentWordIndex;
//     // check if the current word is the last word
//     const isLast = index === randomWordArray.length - 1;

//     // if the current word is the word the user is currently typing, set the color to blue
//     // otherwise, set the color to black
//     const color = isCurrentWord ? 'blue' : 'black';

//     return (
//       <Span
//         key={index}
//         index={index}
//         word={word}
//         color={color}
//         isCurrentWord={isCurrentWord}
//         isLast={isLast}
//       />
//     );
//   });

//   // !! needs to be separated into a different component

//   return (
//     <>
//       <h1>Press any key to start</h1>
//       <div className="font-mono">{displayWordsArr}</div>
//       <input
//         placeholder="Type here"
//         radius="md"
//         size="md"
//         value={currentlyTypedWord}
//         onChange={(event) => handleInput(event)}
//       />
//       <p>current word: {randomWordArray[currentWordIndex]}</p>
//       <p>number of correct words: {numOfCorrectWords}</p>
//     </>
//   );
// }
