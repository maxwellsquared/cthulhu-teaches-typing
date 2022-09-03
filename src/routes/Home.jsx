import LayoutWrapper from '../components/LayoutWrapper';
import TypingField from '../components/TypingField';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';

// this should be the main page, displayed when URL is '/'
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  console.log('user from Home.jsx', user);
  
  return (
    <LayoutWrapper>
      <h1>HOME</h1>
      <TypingField />
    </LayoutWrapper>
  );
};

export default Home;
