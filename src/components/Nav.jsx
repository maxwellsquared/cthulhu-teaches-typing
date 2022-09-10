import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../helpers/context';

import { BiCog } from 'react-icons/bi';
import KeyboardDropdown from './KeyboardDropdown';
import LoginMessage from './LoginMessage';

const Nav = () => {
  const { user, userKeyboards } = useContext(UserContext);

  // simulate a user user logging out by refreshing the page, which will reset the user context
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <nav className="rounded px-2 py-2.5 font-normal text-pale-gold">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="logo-text">
          <Link to="/" className="flex items-center hover:text-candle">
            <img src="./images/logo.png" className="mr-3 h-20 sm:h-20" alt="logo" />
            <span className="logo-drip">CTHULHU</span>{' '}
            <span className="logo-lite">&nbsp;TEACHES TYPING</span>
          </Link>
        </div>
        <ul className="flex items-center  gap-2 font-light">
          {user ? (
            <>
              {user && userKeyboards ? <KeyboardDropdown /> : null}

              <li>
                <Link
                  to="/user"
                  aria-current="User Settings"
                  className="mx-2 flex gap-2 hover:text-blood-red"
                >
                  <BiCog className="text-2xl" />
                  <span>{user.name}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="mx-3 rounded-lg bg-pale-gold py-1 px-6 text-black"
                  aria-current="logout"
                  onClick={refreshPage}
                >
                  LOGOUT
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="mx-3 rounded-lg bg-pale-gold p-0 py-1 px-6 text-lg text-cosmic-purple shadow-lg hover:bg-gold-hover"
                  aria-current="login"
                >
                  LOGIN
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="mx-3 rounded-lg bg-pale-gold p-0 py-1 px-6 text-lg text-cosmic-purple shadow-lg hover:bg-gold-hover"
                  aria-current="login"
                >
                  SIGNUP
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
