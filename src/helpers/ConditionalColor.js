import RandomWords from './RandomWords';

// function accepts...
// 1. isCorrect (boolean) - whether the user's input is correct or not
// 2. currentRandomWordIndex (number) - the index of the current word in the random word array
// 3. the current userWord (string) - the word the user is currently typing, gets defined when the user types a space

// returns...
// adds a class to the word based on whether the user's input is correct or not
// if the user's input is correct, add the class 'correct' - color is green
// if the user's input is incorrect, add the class 'incorrect' - color is red


const ConditionalColor = (isCorrect, userWord) => {
  return isCorrect ? (
    <span className="text-pale-gold">{userWord} </span>
  ) : (
    <span className="text-blood-red">{userWord} </span>
  );
};



export default ConditionalColor;
