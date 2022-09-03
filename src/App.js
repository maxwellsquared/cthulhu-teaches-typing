import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState();

  console.log('user in app', user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <nav>
        <ul>
          <li>
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}
