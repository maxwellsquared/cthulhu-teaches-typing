import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LoginMessage = () => {
  return (
    <Link
      to="/login"
      className="flex max-w-sm transform items-center justify-center gap-2 rounded-lg bg-beige px-4 py-3 text-lg
			text-dark-navy shadow-lg transition duration-500 hover:scale-105 hover:bg-darker-beige dark:bg-pale-gold dark:text-cosmic-purple dark:hover:bg-gold-hover"
      role="alert"
    >
      <FiLogIn size={25} />
      <p>Log in to submit your score!</p>
    </Link>
  );
};

export default LoginMessage;
