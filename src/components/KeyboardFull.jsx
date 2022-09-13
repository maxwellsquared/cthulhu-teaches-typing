import { useState, useEffect, useContext } from 'react';
import {ReactComponent as KeyboardBG} from './keyboards/full-bg.svg'
import {ReactComponent as KeyboardKeys} from './keyboards/full-keys.svg'


export default function KeyboardFull(props) {
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