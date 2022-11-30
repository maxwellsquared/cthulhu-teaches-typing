import { useState, useContext } from 'react';
import { UserContext } from '../helpers/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsKeyboard } from 'react-icons/bs';

function CreateKeyboard() {
  const { user, setUser, userKeyboards, setUserKeyboards } = useContext(UserContext);
  const [keyboard, setKeyboard] = useState('');
  const [color1, setColor1] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));
  const [color2, setColor2] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));
  const [keyboardType, setKeyboardType] = useState('full');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  // used to redirect to home page after login
  const navigate = useNavigate();

  const getKeyboardsByUserId = (userId) => {
    const config = {
      method: 'get',
      url: `https://stark-fortress-32519.herokuapp.com/keyboards/${userId}`,
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

  function changeStyle(color) {
    return { backgroundColor: color, margin: '15px' };
  }

  function sendRequest(user, keyboard, setUserKeyboards) {
    let keyboardData = {
      user_id: user.id,
      name: keyboard,
      color1: color1,
      color2: color2,
      keyboard_type: keyboardType,
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`https://stark-fortress-32519.herokuapp.com/keyboards/new`, keyboardData, {
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
          <li className="text-lg text-cosmic-purple dark:text-pale-gold" key={keyboard.id}>
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
            <div className="space-y-px rounded-md text-cosmic-purple shadow-sm dark:text-pale-gold">
              <div>
                <label htmlFor="keyboard_type">Keyboard Name</label>

                <input
                  type="text"
                  name="keyboard"
                  placeholder="name"
                  className="relative block w-full appearance-none rounded-t-lg border border-blood-red bg-darker-beige px-3 py-2 text-dark-navy placeholder-gray-500 focus:z-10 focus:border-gold-hover focus:outline-none focus:ring-blood-red dark:bg-incorrectInput dark:text-pale-gold"
                  onChange={(event) => {
                    setKeyboard(event.target.value);
                  }}
                />
                <div className="flex items-center justify-around">
                  <label htmlFor="keyboard_type">Keyboard Type</label>
                  <select
                    name="keyboard_type"
                    id="keyboard_type"
                    placeholder="Select keyboard type"
                    className=" w-40 appearance-none rounded-lg border border-blood-red bg-darker-beige px-3 py-2 text-center text-dark-navy placeholder-gray-500 focus:z-10 focus:border-gold-hover focus:outline-none focus:ring-blood-red dark:bg-incorrectInput dark:text-pale-gold"
                    onChange={(event) => {
                      setKeyboardType(event.target.value);
                    }}
                  >
                    <option value="full">Full-size</option>
                    <option value="tenkeyless">Tenkeyless</option>
                    <option value="75%">75%</option>
                    <option value="65%">65%</option>
                    <option value="laptop">Laptop</option>
                  </select>
                </div>
                <div className="color-select mt-10">
                  <input
                    type="color"
                    style={changeStyle(color1)}
                    value={color1}
                    name="color1"
                    onChange={(event) => {
                      setColor1(event.target.value);
                    }}
                  />
                  <label htmlFor="color1">Base Colour</label>

                  <input
                    type="color"
                    style={changeStyle(color2)}
                    name="color2"
                    value={color2}
                    onChange={(event) => {
                      setColor2(event.target.value);
                    }}
                  />
                  <label htmlFor="color2">Keycap Colour</label>
                </div>
              </div>
            </div>

            <button
              className="group relative mt-10 flex transform items-center justify-center gap-3 rounded-md border border-transparent bg-darker-beige px-6 text-lg font-medium text-dark-navy transition duration-300 ease-in-out hover:scale-105 hover:bg-kinda-teal focus:outline-none focus:ring-2 focus:ring-blood-red focus:ring-offset-2 dark:bg-pale-gold  dark:text-cosmic-purple dark:hover:bg-gold-hover"
              onClick={() => {
                sendRequest(user, keyboard, setUserKeyboards);
              }}
            >
              <BsKeyboard className="h-10 w-10 text-dark-navy dark:text-cosmic-purple" />
              Create Keyboard
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center text-cosmic-purple dark:text-pale-gold">
          <h1 className="text-3xl ">Your Keyboards</h1>
          <ul className="flex flex-col items-center justify-center text-cosmic-purple">
            {keyboardList(userKeyboards)}
          </ul>
        </div>
      </div>
      {/* create a list for all the keybaords */}
    </>
  );
}

export default CreateKeyboard;
