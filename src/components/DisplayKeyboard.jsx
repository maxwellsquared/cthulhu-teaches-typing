import { UserContext } from '../helpers/context';
import { useState, useEffect, useContext } from 'react';
import KeyboardLaptop from './KeyboardLaptop';
import KeyboardFull from './KeyboardFull';
import KeyboardTenkeyless from './KeyboardTenkeyless';
import Keyboard65 from './Keyboard65';
import Keyboard75 from './Keyboard75';

export default function DisplayKeyboard(props) {
  const [ keyboardType, setKeyboardType] = useState();
  const [ color1, setColor1] = useState('#202020');
  const [color2, setColor2] = useState('#808080');
  // const [bgStyle, setBgStyle] = useState({fill: '#666666', "fill-rule": "evenodd"});
  const { userKeyboards, currentKeyboard, setCurrentKeyboard } = useContext(UserContext);

  useEffect(() => {
    let myKeyboardType = null;
    let myColor1 = '#202020';
    let myColor2 = '#808080';
    for (const kb of userKeyboards) {
      if (kb.id == currentKeyboard) {
        myKeyboardType = kb.keyboard_type;
        myColor1 = kb.color1;
        myColor2 = kb.color2;
      };
    };
    setKeyboardType(myKeyboardType);
    setColor1(myColor1);
    setColor2(myColor2);
  }, [currentKeyboard])

  return (
    <div className="container-keyboard" style={{width: "65%"}}>
      {keyboardType === 'full' ? ( <KeyboardFull color1={color1} color2={color2} /> ) : null}
      {keyboardType === 'laptop' ? ( <KeyboardLaptop color1={color1} color2={color2} /> ) : null}
      {keyboardType === 'tenkeyless' ? ( <KeyboardTenkeyless color1={color1} color2={color2} /> ) : null}
      {keyboardType === '75%' ? ( <Keyboard75 color1={color1} color2={color2} /> ) : null}
      {keyboardType === '65%' ? ( <Keyboard65 color1={color1} color2={color2} /> ) : null}


    </div>
  );
}