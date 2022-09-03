// wraps all components
// imported into App.js
import SectionContainer from './SectionContainer';
import HomepageHeader from './HomepageHeader';
import Nav from './Nav';

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <Nav />
        <main className="mb-auto">{children}</main>
        {/* <Footer /> */}
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
