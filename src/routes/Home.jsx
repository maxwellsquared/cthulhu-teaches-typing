import LayoutWrapper from '../components/LayoutWrapper';
import TypingField from '../components/TypingField';

// this should be the main page, displayed when URL is '/'
const Home = () => {
  return (
    <LayoutWrapper>
      <h1>HOME</h1>
      <TypingField />
    </LayoutWrapper>
  );
};

export default Home;
