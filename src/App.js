import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';

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
