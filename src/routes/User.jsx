import { useContext } from 'react';
import { UserContext } from '../helpers/context';

const User = () => {
  const { user } = useContext(UserContext);


  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </div>
      ) : (
        <div>
          <h1>Oops!</h1>
          <p>You must be logged in to view this page.</p>
        </div>
      )}
    </>
  );
};

export default User;
