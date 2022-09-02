import { useContext } from 'react';
import { UserContext } from './UserContext';

const HomepageHeader = () => {
  const value = useContext(UserContext);

  return (
    <>
      <h1 className="bg-blood-red text-3xl font-bold underline">HomepageHeader</h1>
      <h3>Welcome {value}</h3>
    </>
  );
};

export default HomepageHeader;
