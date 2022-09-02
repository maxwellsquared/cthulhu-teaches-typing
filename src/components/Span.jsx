const Span = ({ index, word, color, isCurrentWord, isLast, textDecoration }) => {
  const style = {
    color: color,
  };
  return (
    <span key={index} style={style}>
      {word} {isLast ? '' : ' '}
    </span>
  );
};

export default Span;


// scrap logging in and creating an account
// for demo day...
// literally create 3 seeds users, give them username and password
// have login be a lookup for username and password mathcing
// react - useContext to store the user. so it can survice re renders
// a user can have many keybaords
// name and id
// seed data - 3 users, 3 keyboards
