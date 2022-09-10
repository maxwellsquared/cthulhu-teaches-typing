export default function SingleWord(props) {
  const setStyle = function (correct) {
    if (correct) return 'correct';
    return 'mistake';
  };

  return (
    <>
      <span className={setStyle(props.isCorrect)}>{props.word}&nbsp;</span>
    </>
  );
}
