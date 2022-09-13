import React, { useState, useContext } from 'react';
import { UserContext } from '../helpers/context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsKeyboard } from 'react-icons/bs';

function CreateKeyboard() {
  const { user, setUser, userKeyboards, setUserKeyboards } = useContext(UserContext);
  const [keyboard, setKeyboard] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  // used to redirect to home page after login
  const navigate = useNavigate();

  const getKeyboardsByUserId = (userId) => {
    const config = {
      method: 'get',
      url: `http://localhost:3000/keyboards/${userId}`,
      headers: {},
    };

    axios(config)
      .then((res) => {
        console.log('Success: user keyboards retrieved');
        setUserKeyboards(res.data); // set user keyboards to state
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  function sendRequest(user, keyboard, setUserKeyboards) {
    let keyboardData = {
      user_id: user.id,
      name: keyboard,
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:3000/keyboards/new`, keyboardData, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          //setUserKeyboards(res.data.id);
          // if server returns 200 (success)
          if (res.status === 200) {
            setStatusCode(res.status);
            getKeyboardsByUserId(user.id);
            navigate('/user');
          }
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          setStatusCode(err.response.status);
          reject(err);
        });
    });
  }

  // array of keyboard names as a list
  const keyboardList = (keyboards) => {
    if (keyboards) {
      const keyboardNames = userKeyboards.map((keyboard) => {
        return (
          <li className="text-lg text-pale-gold" key={keyboard.id}>
            {keyboard.name}
          </li>
        );
      });
      return keyboardNames;
    }

    const noKeyboards = <li>You have no keyboards</li>;
    return noKeyboards;
  };

  // if status code == 401 -> go sad route
  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 w-full max-w-md space-y-8">
          <form
            className="mt-8 flex flex-col items-center justify-center"
            onSubmit={(event) => {
              event.preventDefault();
            }}
            autoComplete="off"
          >
            <div className="space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  name="keyboard"
                  placeholder="Keyboard name"
                  className="relative block w-full appearance-none rounded-t-lg border border-blood-red bg-darker-beige px-3 py-2 text-dark-navy placeholder-gray-500 focus:z-10 focus:border-gold-hover focus:outline-none focus:ring-blood-red dark:bg-incorrectInput dark:text-pale-gold"
                  onChange={(event) => {
                    setKeyboard(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm"></div>
            </div>

            <button
              className="group relative flex transform items-center justify-center gap-3 rounded-md border border-transparent bg-darker-beige px-6 text-lg font-medium text-dark-navy transition duration-300 ease-in-out hover:scale-105 hover:bg-kinda-teal focus:outline-none focus:ring-2 focus:ring-blood-red focus:ring-offset-2 dark:bg-pale-gold  dark:text-blood-red dark:hover:bg-gold-hover"
              onClick={() => {
                sendRequest(user, keyboard, setUserKeyboards);
              }}
            >
              <BsKeyboard className="h-10 w-10 text-dark-navy dark:text-blood-red" />
              Create Keyboard
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-pale-gold">Your Keyboards</h1>
          <ul className="flex flex-col items-center justify-center">
            {keyboardList(userKeyboards)}
          </ul>
        </div>
      </div>
      {/* create a list for all the keybaords */}
    </>
  );
}

export default CreateKeyboard;
