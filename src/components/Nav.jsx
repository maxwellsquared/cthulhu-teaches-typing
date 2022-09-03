import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="rounded px-2 py-2.5 font-normal text-pale-gold">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center hover:text-candle">
          <img
            src="https://www.svgrepo.com/show/51020/keyboard.svg"
            className="mr-3 h-6 sm:h-9"
            alt="logo"
          />
          <span className="self-center text-xl">Cthulhu's Keyboard</span>
        </Link>
        <ul className="mt-0 flex flex-row p-4 font-light">
          <li>
            <Link
              to="/login"
              className="mx-3 rounded-lg bg-pale-gold p-0 py-1 px-6  text-black"
              aria-current="about"
            >
              LOGIN
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="mx-3 rounded-lg bg-pale-gold p-0 py-1 px-4 text-black"
              aria-current="about"
            >
              SIGNUP
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
