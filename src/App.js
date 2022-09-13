import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { CodeContext, UserContext, randomWordsContext } from './helpers/context';
import Multiplayer from './routes/Multiplayer';
import Login from './routes/Login';
import Home from './routes/Home';
import User from './routes/User';
import Nav from './components/Nav';
import Leaderboard from './routes/Leaderboard';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import ForgotPassword from './routes/ForgotPassword';
import CreateKeyboard from './routes/CreateKeyboard';
import RandomWords from './helpers/RandomWords';

//!! toggle dark mode
import { ThemeProvider } from './helpers/ThemeContext';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState(); // user state, set at login
  const [userKeyboards, setUserKeyboards] = useState(); // array of keyboards for the user, set at login
  const [currentKeyboard, setCurrentKeyboard] = useState(); // this is the id of the current keyboard, set when user goes to TypingField
  const [codeEntered, setCodeEntered] = useState();
  const [userScore, setUserScore] = useState(); // this is the score of the user, gets set when the user finishes typing
  const [guestName, setGuestName] = useState(
    uniqueNamesGenerator({ dictionaries: [adjectives, animals] }).toUpperCase()
  ); // this is the name of the guest user, set when user goes to TypingField

  // context for randomWords
  const [randomWords, setRandomWords] = useState(RandomWords({ time: 1, numWords: 100 }));

  useEffect(() => {
    // continually updates, checking if no user is signed in. if there isnt, set the current user to the localStorage data for user, keyboards, and current keyboard.
    if (
      !user &&
      window.localStorage.getItem('user') !== 'undefined' &&
      window.localStorage.getItem('keyboards') !== 'undefined'
    ) {
      setUser(JSON.parse(window.localStorage.getItem('user')));
      setUserKeyboards(JSON.parse(window.localStorage.getItem('keyboards')));
    }
  });

  useEffect(() => {
    // when user is signed in, userkeyboards change, or currentkeyboard changes update the local data.
    window.localStorage.setItem('user', JSON.stringify(user));
    window.localStorage.setItem('keyboards', JSON.stringify(userKeyboards));
    window.localStorage.setItem('currentKeyboard', currentKeyboard);
  }, [user, userKeyboards, currentKeyboard]);

  // this will wrap all other components
  return (
    <BrowserRouter>
      <ThemeProvider>
        <randomWordsContext.Provider value={{ randomWords, setRandomWords }}>
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
              guestName,
              setGuestName,
            }}
          >
            <CodeContext.Provider value={{ codeEntered, setCodeEntered }}>
              <div className="flex min-h-screen flex-col justify-between bg-beige transition-all dark:bg-cosmic-purple">
                <Nav />

                <LayoutWrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/multiplayer" element={<Multiplayer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/create-keyboard" element={<CreateKeyboard />} />
                  </Routes>
                </LayoutWrapper>

                <footer>
                  <div className="dark:hover-text-candle container flex w-full items-center justify-between font-light text-kinda-teal dark:text-pale-gold">
                    <Link to="/">
                      <span className="self-center pl-64 text-xl hover:text-dark-navy dark:hover:text-candle">
                        HOME
                      </span>
                    </Link>
                    <ul className="mt-0 flex flex-row p-4">
                      <li>
                        <Link
                          to="/leaderboard"
                          className="p-0 py-2 pr-4 pl-3 hover:text-dark-navy dark:hover:text-candle"
                        >
                          LEADERBOARD
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/multiplayer"
                          className="p-0 py-2 pl-3 hover:text-dark-navy dark:hover:text-candle"
                          aria-current="multiplayer"
                        >
                          MULTIPLAYER
                        </Link>
                      </li>
                    </ul>
                  </div>
                </footer>
              </div>
            </CodeContext.Provider>
          </UserContext.Provider>
        </randomWordsContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
