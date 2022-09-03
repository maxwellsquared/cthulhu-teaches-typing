import { useState } from 'react';

import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';
import { Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import Login from './components/Login';
import { UserContext } from './helpers/context';
import Home from './components/Home';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}
