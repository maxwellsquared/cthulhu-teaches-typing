import { useState } from 'react';

import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';

import { UserContext } from './helpers/context';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LayoutWrapper>
        <HomepageHeader />
        <TypingField />
      </LayoutWrapper>
    </UserContext.Provider>
  );
}
