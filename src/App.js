import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState();

  // this will wrap all other components
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <nav className="rounded px-2 py-2.5 font-normal text-pale-gold">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="https://www.svgrepo.com/show/51020/keyboard.svg"
                className="mr-3 h-6 sm:h-9"
                alt="logo"
              />
              <span className="self-center text-xl">Cthulhu's Keyboard</span>
            </Link>
            <ul className="mt-0 flex flex-row p-4">
              <li>
                <Link to="/about" className="p-0 py-2 pr-4 pl-3" aria-current="about">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/Login" className="p-0 py-2 pr-4 pl-3" aria-current="about">
                  LOGIN
                </Link>
              </li>
            </ul>
          </div>
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
