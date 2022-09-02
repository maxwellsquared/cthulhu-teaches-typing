import { useState, useEffect } from 'react';
import RandomWords from '../helpers/RandomWords';
import Span from './Span';

export default function TypingField() {
  const [currentlyTypedWord, setCurrentlyTypedWord] = useState(''); // This is the word that the user is currently typing
  const [randomWordArray, setRandomWordArray] = useState([]); // used to store the random words
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // used to keep track of the current word index
  const [isCorrect, setIsCorrect] = useState(); // used to keep track of whether the current word is correct or not
  const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // used to keep track of the number of correct words
  const [numberOfWords, setNumberOfWords] = useState(50); // used to keep track of the number of words to be typed

  const initialRandomWords = RandomWords(numberOfWords);

  useEffect(() => {
    // generate random words on page load
    setRandomWordArray(initialRandomWords);
  }, [numberOfWords]);

  // function to get current work from the random word array
  // used to compare with the currently typed word with the current word
  const getCurrentWord = (index) => {
    return randomWordArray[index];
  };

  // !! function to update state from the input
  const handleInput = (event) => {
    // get the value of the input
    const inputValue = event.target.value;

    // update the state of the input
    setCurrentlyTypedWord(inputValue);

    // compare the input value to the current word
    const currentWord = getCurrentWord(currentWordIndex);
    // need to compare the input value to the current word, but only the length of the input value
    if (inputValue === currentWord.slice(0, inputValue.length)) {
      console.log('correct');
      setIsCorrect(true);
    } else {
      // if input is a space, do not log incorrect
      if (inputValue.slice(-1) !== ' ') {
        console.log('incorrect');
        setIsCorrect(false);
      }
    }

    // if current input is a space, move to the next word by incrementing the index
    if (inputValue.endsWith(' ')) {
      if (isCorrect) {
        setNumOfCorrectWords(numOfCorrectWords + 1);
      }
      setCurrentWordIndex(currentWordIndex + 1); // increment the index
      setCurrentlyTypedWord(''); // reset the input value
    }
  };

  // are the words user has to type out
  const displayWordsArr = randomWordArray.map((word, index) => {
    // check if the current word is the word the user is currently typing
    const isCurrentWord = index === currentWordIndex;
    // check if the current word is the last word
    const isLast = index === randomWordArray.length - 1;

    // if the current word is the word the user is currently typing, set the color to blue
    // otherwise, set the color to black
    const color = isCurrentWord ? 'blue' : 'black';

    return (
      <Span
        key={index}
        index={index}
        word={word}
        color={color}
        isCurrentWord={isCurrentWord}
        isLast={isLast}
      />
    );
  });

  // !! needs to be separated into a different component

  return (
    <>
      <h1>Press any key to start</h1>
      <div className="font-serif">{displayWordsArr}</div>
      <input
        placeholder="Type here"
        radius="md"
        size="md"
        value={currentlyTypedWord}
        onChange={(event) => handleInput(event)}
      />
      <p>current word: {randomWordArray[currentWordIndex]}</p>
      <p>number of correct words: {numOfCorrectWords}</p>
    </>
  );
}
