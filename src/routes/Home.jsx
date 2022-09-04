import TypingField from '../components/TypingField';

// this should be the main page, displayed when URL is '/'
const Home = () => {
  return (
    <>
      <div className="align my-10 flex flex-col items-center">
        <div className="text-7xl font-extrabold tracking-wide text-pale-gold">CTHULHU</div>
        <div className="flex gap-5">
          <div className="text-4xl font-light tracking-widest text-pale-gold">TEACHES </div>
          <div className="text-4xl font-light tracking-widest text-pale-gold">TYPING</div>
        </div>
      </div>
      <TypingField />
    </>
  );
};

export default Home;
