import { useState, useEffect, useContext } from 'react';
import {ReactComponent as KeyboardBG} from './keyboards/mac-bg.svg'
import {ReactComponent as KeyboardKeys} from './keyboards/mac-keys.svg'


export default function KeyboardLaptop(props) {
  // const [ color1, setColor1] = useState('#202020');
  // const [color2, setColor2] = useState(props.color2);
  // const [bgStyle, setBgStyle] = useState({fill: '#666666', "fillRule": "evenodd"});
  // const [keyStyle, setKeyStyle] = useState({fill: '#666666', "fillRule": "evenodd"});

  return (
    <div className="display-keyboard">

      <div className='keyboard-bg'>
        <KeyboardBG fill={props.color1} />
      </div>
      <div className='keyboard-keys'>
        <KeyboardKeys fill={props.color2} />
      </div>
    </div>
  )
}