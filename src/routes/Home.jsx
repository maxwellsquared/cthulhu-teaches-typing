import TypingField from '../components/TypingField';
import KeyboardDropdown from '../components/KeyboardDropdown';
import LoginMessage from '../components/LoginMessage';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';

// this should be the main page, displayed when URL is '/'
const Home = () => {
  const { user, userKeyboards } = useContext(UserContext);
  return (
    <>
      <TypingField />
      <div className="self-center">{userKeyboards && user ? null : <LoginMessage />}</div>
    </>
  );
};

export default Home;
