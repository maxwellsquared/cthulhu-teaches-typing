import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../helpers/context';

import TypingField from '../components/TypingField';

const About = function () {
  const { userScore } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const socket = io('ws://localhost:8080'); // url of the server
  useEffect(() => {
    // listen to the connection event from the server
    socket.on('connection', (texts) => {
      // set the messages to the state
      setText((text) => [...text, texts]);
    });

    socket.on('message', (arg) => {
      setMessages((messages) => [...messages, arg]);
    });

    socket.on('game-start', () => {
      socket.emit('message sent');
    });

    // when user goes to page, send a message

    return () => socket.disconnect(); // prevents memory leaks
  }, []);

  console.log('userScore', userScore);

  // function to send a message to the server
  const sendMessage = () => {
    socket.emit('message', userScore.wpm);
    setText('');
  };

  console.log('messages', messages);
  console.log('text', text);

  return (
    <>
      <h1>About</h1>
      <h1 className="font-mono text-green-500">Messages:</h1>
      <ul>
        {messages.map((message, index) => (
          <li className="font-mono text-red-500" key={index}>
            {message}
          </li>
        ))}
      </ul>

      <input type="text" placeholder="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <TypingField />
    </>
  );
};

export default About;
