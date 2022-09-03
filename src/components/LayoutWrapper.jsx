// wraps all components
// imported into App.js
import SectionContainer from './SectionContainer';
import HomepageHeader from './HomepageHeader';

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <header className="flex items-center justify-between py-10">
          <div>
            <div className="flex items-center justify-between">
              <div className="mr-3">SANS FONT</div>
            </div>
          </div>
          <div className="navbuttons flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {['About', 'More'].map((link) => (
                <a key={link} href={'/link'} className="p-1 font-medium sm:p-4">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        {/* <Footer /> */}
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
