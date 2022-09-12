import React, { useState, useContext } from 'react';
import { UserContext } from '../helpers/context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLock } from 'react-icons/fi';

function CreateKeyboard() {
  const { user, setUser, setUserKeyboards } = useContext(UserContext);
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
              getKeyboardsByUserId(user.id)
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



  // if status code == 401 -> go sad route
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <form
            className="mt-8 space-y-6"
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
              <div className="text-sm">
              </div>
            </div>

            <button
              className="group relative flex w-full transform justify-center rounded-md border border-transparent bg-darker-beige py-2 px-4 text-lg font-medium text-dark-navy transition duration-300 ease-in-out hover:scale-105 hover:bg-kinda-teal focus:outline-none focus:ring-2 focus:ring-blood-red focus:ring-offset-2 dark:bg-pale-gold  dark:text-blood-red dark:hover:bg-gold-hover"
              onClick={() => {
                sendRequest(user, keyboard, setUserKeyboards);
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-5 w-5 text-dark-navy dark:text-blood-red" />
              </span>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateKeyboard;
