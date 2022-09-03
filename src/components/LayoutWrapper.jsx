// wraps all components
// imported into App.js
import SectionContainer from './SectionContainer';
import { NavLink } from 'react-router-dom';

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <main className="mb-auto">{children}</main>
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
