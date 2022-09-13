import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';
import { BiCog } from 'react-icons/bi';
import KeyboardDropdown from './KeyboardDropdown';
import ThemeToggle from './ThemeToggle';
import DisplayKeyboard from './DisplayKeyboard';

const Nav = () => {
  const { user, userKeyboards } = useContext(UserContext);

  // simulate a user user logging out by refreshing the page, which will reset the user context
  function refreshPage() {
    // when logging out, clear local data.
    window.localStorage.clear();
    window.location.reload(false);
  }

  return (
    <nav className="rounded px-2 py-2.5 text-dark-navy dark:text-pale-gold">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="logo-text text-dark-navy dark:text-pale-gold">
          <Link
            to="/"
            className="flex items-center font-sans hover:text-kinda-teal dark:hover:text-candle"
          >
            <img src="./images/logo.png" className="mr-3 h-20 sm:h-20" alt="logo" />
            <div className="font-brother-1816 flex flex-col text-3xl">
              <span className="font-black tracking-huge">CTHULHU</span>
              <span className="font-extralight">TEACHES TYPING</span>
            </div>
          </Link>
        </div>
        <ul className="flex items-center  gap-2 font-light">
          {user && user !== 'null' ? (
            <>
              {user && userKeyboards ? <KeyboardDropdown /> : null}
              {user && userKeyboards ? <DisplayKeyboard /> : null}
              <li>
                <Link
                  to="/user"
                  aria-current="User Settings"
                  className="mx-2 flex gap-2 hover:text-kinda-teal dark:hover:text-blood-red"
                >
                  <BiCog className="text-2xl" />
                  <span>{user.name}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="mx-3 rounded-lg bg-darker-beige py-1 px-6 dark:bg-pale-gold dark:text-cosmic-purple"
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
                  className="mx-3 rounded-lg bg-darker-beige p-0 py-1 px-6 text-lg shadow-lg hover:bg-kinda-teal  dark:bg-pale-gold dark:text-cosmic-purple dark:hover:bg-gold-hover"
                  aria-current="login"
                >
                  LOGIN
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="mx-3 rounded-lg bg-darker-beige p-0 py-1 px-6 text-lg shadow-lg hover:bg-kinda-teal dark:bg-pale-gold dark:text-cosmic-purple dark:hover:bg-gold-hover"
                  aria-current="login"
                >
                  SIGNUP
                </Link>
              </li>
            </>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
