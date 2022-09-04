const wpmCalculator = function(totalChars, mistakes) {
  let time = 1;
  let correctChars = totalChars - mistakes;

  let wpmObject = {
    correctKeystrokes: correctChars / 5,
    incorrectKeystrokes: mistakes / 5,
    WPM: Math.round(this.correctKeystrokes / time)
  };

  return wpmObject;
  
};