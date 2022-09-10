import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CodeContext, UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';
import User from './routes/User';
import Nav from './components/Nav';
import Leaderboard from './routes/Leaderboard';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState(); // user state, set at login
  const [userKeyboards, setUserKeyboards] = useState(); // array of keyboards for the user, set at login
  const [currentKeyboard, setCurrentKeyboard] = useState(); // this is the id of the current keyboard, set when user goes to TypingField
  const [codeEntered, setCodeEntered] = useState();

  useEffect(() => {
    // continually updates, checking if no user is signed in. if there isnt, set the current user to the localStorage data for user, keyboards, and current keyboard.
    if (!user && (window.localStorage.getItem("user") !== 'undefined') && (window.localStorage.getItem("keyboards") !== 'undefined')) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
      setUserKeyboards(JSON.parse(window.localStorage.getItem("keyboards")));
      setCurrentKeyboard(window.localStorage.getItem("currentKeyboard"));
    }
  });

  useEffect(() => {
    // when user is signed in, userkeyboards change, or currentkeyboard changes update the local data.
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("keyboards", JSON.stringify(userKeyboards));
    window.localStorage.setItem("currentKeyboard", currentKeyboard);

  }, [user, userKeyboards, currentKeyboard]);

  // this will wrap all other components
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
          userKeyboards,
          setUserKeyboards,
          currentKeyboard,
          setCurrentKeyboard,
        }}
      >
        <CodeContext.Provider value={{ codeEntered, setCodeEntered }}>

          <Nav />

          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </LayoutWrapper>
        </CodeContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
