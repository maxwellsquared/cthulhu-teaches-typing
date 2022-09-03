import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState();

  // useRef to store user data
  const loggedInUserRef = useRef(user); // initialize ref to null, no user yet

  // this will wrap all other components
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <h1>This is the main, App.js</h1>
        <nav>
          <ul>
            <li>
              {/* Link only updates the URL */}
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* reacts to changes to the URL */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
