import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LoginMessage = () => {
  return (
    <Link
      to="/login"
      className="flex max-w-sm items-center justify-center gap-8 rounded-lg bg-pale-gold px-4 py-3 text-lg text-cosmic-purple
			hover:bg-candle"
      role="alert"
    >
      <FiLogIn size={30} />
      <p>Log in to submit your score!</p>
    </Link>
  );
};

export default LoginMessage;
