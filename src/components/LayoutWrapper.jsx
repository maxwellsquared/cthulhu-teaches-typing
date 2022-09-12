import { Link } from 'react-router-dom';

const LayoutWrapper = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl flex-col justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0 ">
      <div className="main-height flex flex-col justify-between font-sans">
        <main className="my-auto flex flex-col">{children}</main>
        <footer>
          <div className="dark:hover-text-candle container -my-5 flex flex-wrap items-center justify-between font-light text-kinda-teal dark:text-pale-gold">
            <Link to="/" className="flex items-center">
              <span className="self-center text-xl hover:text-dark-navy dark:hover:text-candle">
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
                  className="p-0 py-2 pr-4 pl-3 hover:text-dark-navy dark:hover:text-candle"
                  aria-current="multiplayer"
                >
                  MULTIPLAYER
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LayoutWrapper;
