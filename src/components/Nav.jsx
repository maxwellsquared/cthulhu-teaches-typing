import { Link } from 'react-router-dom';

const Nav = () => {
  return (
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
            <Link to="/Login" className="p-0 py-2 pr-4 pl-3" aria-current="about">
              LOGIN
            </Link>
          </li>
          <li>
            <Link to="/Login" className="p-0 py-2 pr-4 pl-3" aria-current="about">
              SIGNUP
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
