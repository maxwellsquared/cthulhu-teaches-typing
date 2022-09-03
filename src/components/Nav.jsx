import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav className="flex items-center justify-between py-10">
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
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
