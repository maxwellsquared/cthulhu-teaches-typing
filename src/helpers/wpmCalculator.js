const wpmCalculator = function (correctCharacters, numMistakes) {
  let time = 1;

  let wpmObject = {
    correctKeystrokes: correctCharacters / 5,
    incorrectKeystrokes: numMistakes / 5,
    WPM: Math.round(correctCharacters / 5 / time),
  };

  return wpmObject;
};

export default wpmCalculator;
