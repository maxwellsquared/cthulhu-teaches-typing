import { useContext } from 'react';
import { UserContext } from '../helpers/context';

// is used in the TypingField component
// IF user is logged in, display this component
// TODO: this is just a placeholder for now. This confirms that props can be passed from login, to the TypingField component, and then to the LoggedInWelcomeBanner component
const LoggedInWelcomeBanner = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h1>FUCK YAS {user.name}</h1>
      <p>This was created using useContext, not props.</p>
    </div>
  );
};

export default LoggedInWelcomeBanner;
