import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

function Login() {
  const { user, setUser, setUserKeyboards } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  // used to redirect to home page after login
  const navigate = useNavigate();

  // function to set UserRef and user state
  const successfulLogin = (response) => {
    setUser(response.data);
    getKeyboardsByUserId(response.data.id);
  };

  // async function to login, called when login button is clicked
  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`https://stark-fortress-32519.herokuapp.com/login`, loginData, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          setUser({ name: res.data.name });
          // if server returns 200 (success)
          if (res.status === 200) {
            successfulLogin(res);
            setStatusCode(res.status);
            navigate('/');
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

  // axios request to get user keyboards using user id
  // runs in the successfulLogin function
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

  // if status code == 401 -> go sad route
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-60" src="./images/cthulhu.png" alt="cthulhu logo" />
            <h2 className="mt-6 text-center text-3xl tracking-tight text-dark-navy dark:text-blood-red">
              Sign in to your account
            </h2>
          </div>
          {statusCode === 401 && (
            <h1 className="text-dark-navy dark:text-pale-gold">Invalid Credentials</h1>
          )}
          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
            }}
            autoComplete="off"
          >
            <div className="space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="relative block w-full appearance-none rounded-t-lg border border-blood-red bg-darker-beige px-3 py-2 text-dark-navy placeholder-gray-500 focus:z-10 focus:border-gold-hover focus:outline-none focus:ring-blood-red dark:bg-incorrectInput dark:text-pale-gold"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="relative block w-full appearance-none rounded-b-lg border border-blood-red bg-darker-beige px-3 py-2 text-dark-navy placeholder-gray-500 focus:z-10 focus:border-gold-hover focus:outline-none focus:ring-blood-red dark:bg-incorrectInput dark:text-pale-gold"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input name="remember-me" type="checkbox" className="h-4 w-4 accent-kinda-teal" />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-dark-navy dark:text-blood-red"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-dark-navy hover:text-kinda-teal dark:text-blood-red dark:hover:text-candle"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              className="group relative flex w-full transform justify-center rounded-md border border-transparent bg-darker-beige py-2 px-4 text-lg font-medium text-dark-navy transition duration-300 ease-in-out hover:scale-105 hover:bg-kinda-teal focus:outline-none focus:ring-2 focus:ring-blood-red focus:ring-offset-2 dark:bg-pale-gold  dark:text-blood-red dark:hover:bg-gold-hover"
              onClick={() => {
                sendRequest(email, password, user, setUser);
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-5 w-5 text-dark-navy dark:text-blood-red" />
              </span>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
