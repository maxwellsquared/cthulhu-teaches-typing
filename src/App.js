import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserContext } from './helpers/context';
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
  const [userScore, setUserScore] = useState(); // this is the score of the user, gets set when the user finishes typing

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
          userScore,
          setUserScore,
        }}
      >
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}
