// wraps all components
// imported into App.js
import SectionContainer from './SectionContainer';

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <nav className="flex items-center justify-between py-10">
          <div>
            <div className="flex items-center justify-between">
              <a href={'/'} className="mr-3">
                CTHULHU TEACHES TYPES
              </a>
            </div>
          </div>
          <div className="flex items-center text-base leading-5">
            <a href={'/about'} className="p-1 font-medium sm:p-4">
              About
            </a>

            <a href={'/login'} className="p-1 font-medium sm:p-4">
              Login
            </a>
          </div>
        </nav>
        <main className="mb-auto">{children}</main>
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
