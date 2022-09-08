import { UserContext } from '../helpers/context';
import { useContext } from 'react';

// component for the TypingField to display the current keyboard and all keyboards for the user
const KeyboardDropdown = () => {
  const { userKeyboards, currentKeyboard, setCurrentKeyboard } = useContext(UserContext);
  // userKeyboards is an array of objects, each object is a keyboard
  // currentKeyboard is the id of the current keyboard
  // setCurrentKeyboard is a function that sets the current keyboard

  // sets a default keyboard if the user has no keyboards
  if (currentKeyboard === undefined) {
    setCurrentKeyboard(userKeyboards[0].id);
  }

  // set the setCurrentKeyboard state to the keyboard that was clicked
  const handleKeyboardClick = (keyboard) => {
    setCurrentKeyboard(keyboard);
  };

  console.log('currentKeyboard: ', currentKeyboard);

  return (
    <div className="justify flex items-center gap-4">
      <label htmlFor="keyboards" className="block font-mono text-lg text-pale-gold ">
        Select your keyboard
      </label>
      <select
        className="rounded-lg border bg-lighter-purple p-2 text-pale-gold focus:border-blood-red focus:ring-blood-red"
        onChange={(event) => handleKeyboardClick(event.currentTarget.value)}
      >
        {userKeyboards.map((keyboard) => (
          <option key={keyboard.id} value={keyboard.id}>
            {keyboard.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default KeyboardDropdown;
