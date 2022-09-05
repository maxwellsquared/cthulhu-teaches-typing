import wpmCalculator from '../helpers/wpmCalculator';

const Wpm = ({ correctCharacters, numMistakes }) => {
  const wpmObject = wpmCalculator(correctCharacters, numMistakes);
  console.log(wpmObject);

  return (
    <div className="font-mono">
      <div className="font-mono">WPM: {wpmObject.WPM}</div>
      <div className="font-mono">CORRECT KEYS: {wpmObject.correctKeystrokes}</div>
      <div className="font-mono">INCORRECT KEYS: {wpmObject.incorrectKeystrokes}</div>
    </div>
  );
};

export default Wpm;
