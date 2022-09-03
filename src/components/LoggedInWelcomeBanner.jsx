import { useContext } from 'react';
import { UserContext } from '../helpers/context';

// is used in the TypingField component
// IF user is logged in, display this component
// TODO: this is just a placeholder for now. This confirms that props can be passed from login, to the TypingField component, and then to the LoggedInWelcomeBanner component
const LoggedInWelcomeBanner = ({ userRef }) => {
  console.log('userRef in LoggedInWelcomeBanner', userRef);
  if (userRef) {
    return (
      <div>
        <h1>Welcome {userRef.current.name}</h1>
        <p>Your email is {userRef.current.email}</p>
        <p>This was created using useContext, not props.</p>
      </div>
    );
  }
  return null;
};

export default LoggedInWelcomeBanner;
