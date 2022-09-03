import { useState } from 'react';

import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';
import { Routes, Route } from 'react-router-dom';
import About from './routes/About';
import Login from './routes/Login';
import { UserContext } from './helpers/context';
import Home from './routes/Home';
import Nav from './components/Nav';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LayoutWrapper children={<Home />} />}></Route>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}
