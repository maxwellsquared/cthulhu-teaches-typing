import { UserContext } from '../helpers/context';
import { useContext } from 'react';

const KeyboardDropdown = () => {
  const { userKeyboards, currentKeyboard, setCurrentKeyboard } = useContext(UserContext);

  if (currentKeyboard === undefined) {
    setCurrentKeyboard(userKeyboards[0].name);
  }

  // set the setCurrentKeyboard state to the keyboard that was clicked
  const handleKeyboardClick = (keyboard) => {
    setCurrentKeyboard(keyboard);
  };
	

  return (
    <select
      className="border border-gray-300 bg-gray-500 text-gray-900"
      onChange={(event) => handleKeyboardClick(event.currentTarget.value)}
    >
      {userKeyboards.map((keyboard) => (
        <option key={keyboard.id} value={keyboard.name}>
          {keyboard.name}
        </option>
      ))}
    </select>
  );
};

export default KeyboardDropdown;
