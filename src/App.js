import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';
import { UserContext } from './components/UserContext';

export default function App() {
  const value = 'Curtis Warcup';
  //If you want to change the context value, simply update the value prop

  console.log(UserContext);
  return (
    <UserContext.Provider value={value}>
      <LayoutWrapper>
        <HomepageHeader />
        <TypingField />
      </LayoutWrapper>
    </UserContext.Provider>
  );
}
