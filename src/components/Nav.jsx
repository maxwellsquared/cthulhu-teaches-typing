import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <div className="flex items-center justify-between">
          <div className="mr-3">CTHULHU TEACHES TYPES</div>
        </div>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          <Link to="/about" className="p-1 font-medium sm:p-4">
            About
          </Link>{' '}
          |{' '}
        </div>
        <div className="hidden sm:block">
          <Link to="/login" className="p-1 font-medium sm:p-4">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
