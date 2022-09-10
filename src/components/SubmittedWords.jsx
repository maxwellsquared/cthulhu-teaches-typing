import SingleWord from './SingleWord';

export default function SubmittedWords(props) {
  return (
    <>
      {props.words.map((item, i) => (
        <SingleWord key={i} word={item.word} isCorrect={item.isCorrect} />
      ))}
    </>
  );
}
