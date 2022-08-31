const Span = ({ index, word, color, isCurrentWord, isLast, textDecoration }) => {
  const style = {
    color: color,
  };
  return (
    <span key={index} style={style}>
      {word} {isLast ? '' : ','}
    </span>
  );
};

export default Span;
