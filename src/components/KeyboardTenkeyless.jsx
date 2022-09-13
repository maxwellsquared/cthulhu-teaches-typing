import { useState, useEffect, useContext } from 'react';
import {ReactComponent as KeyboardBG} from './keyboards/tenkeyless-bg.svg'
import {ReactComponent as KeyboardKeys} from './keyboards/tenkeyless-keys.svg'


export default function KeyboardTenkeyless(props) {
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