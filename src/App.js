import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { UserContext, ModalContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';
import Nav from './components/Nav';
import Leaderboard from './routes/Leaderboard';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState();
  const [modal, setModal] = useState(false);

  // this will wrap all other components
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Nav />

        <LayoutWrapper>
          <Routes>
            {/* reacts to changes to the URL */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </LayoutWrapper>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
