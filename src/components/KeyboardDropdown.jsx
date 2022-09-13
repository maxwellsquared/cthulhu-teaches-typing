import { UserContext } from '../helpers/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// component for the TypingField to display the current keyboard and all keyboards for the user
const KeyboardDropdown = () => {
  const navigate = useNavigate();
  const { userKeyboards, currentKeyboard, setCurrentKeyboard } = useContext(UserContext);
  // userKeyboards is an array of objects, each object is a keyboard
  // currentKeyboard is the id of the current keyboard
  // setCurrentKeyboard is a function that sets the current keyboard

  // sets a default keyboard if the user has no keyboards
  if (currentKeyboard === undefined || currentKeyboard === null) {
    setCurrentKeyboard(userKeyboards[0].id);
  }
  console.log(userKeyboards);

  // set the setCurrentKeyboard state to the keyboard that was clicked
  const handleKeyboardClick = (keyboard) => {
    if (keyboard === '0') {
      setCurrentKeyboard('1');
      navigate('/create-keyboard');
    } else {
      setCurrentKeyboard(keyboard);
    }
  };

  return (
    <div className="justify flex items-center gap-2">
      <label
        htmlFor="keyboards"
        className="block font-mono text-base text-kinda-teal dark:text-pale-gold"
      >
        Selected Keyboard:
      </label>
      <select
        // eslint-disable-next-line eqeqeq
        value={currentKeyboard || currentKeyboard != '0' ? currentKeyboard : 1}
        className="rounded-lg border bg-darker-beige p-1 text-dark-navy dark:bg-lighter-purple dark:text-pale-gold dark:focus:border-blood-red dark:focus:ring-blood-red"
        onChange={(event) => handleKeyboardClick(event.currentTarget.value)}
      >
        {userKeyboards.map((keyboard) => (
          <option key={keyboard.id} value={keyboard.id}>
            {keyboard.name}
          </option>
        ))}
        <option value={0}>Create New</option>
      </select>
    </div>
  );
};

export default KeyboardDropdown;
