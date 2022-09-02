import { UserContext } from '../helpers/context';
import { useContext } from 'react';

const HomepageHeader = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <h1 className="bg-blood-red text-3xl font-bold underline">HomepageHeader</h1>
      {user.name ? <h1> User has a of {user.name}</h1> : <h1>User has no name</h1>}
      <button onClick={() => setUser({ name: 'Curtis' })}>CLICK ME</button>
    </>
  );
};

export default HomepageHeader;
