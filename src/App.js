import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';
import Nav from './components/Nav';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState();

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
          </Routes>
        </LayoutWrapper>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
