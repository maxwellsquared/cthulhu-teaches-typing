import LayoutWrapper from '../components/LayoutWrapper';
import TypingField from '../components/TypingField';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';

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
