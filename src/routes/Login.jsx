import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  // used to redirect to home page after login
  const navigate = useNavigate();

  // function to set UserRef and user state
  const successfulLogin = (response) => {
    setUser(response.data);
  };

  // async function to login, called when login button is clicked
  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:3000/login`, loginData, {
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

  // if status code == 401 -> go sad route
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-60" src="./images/cthulhu.png" alt="cthulhu logo" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blood-red">
              Sign in to your account
            </h2>
          </div>
          {statusCode === 401 && <h1>Invalid Credentials</h1>}
          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
            }}
            autoComplete="off"
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input name="remember-me" type="checkbox" className="h-4 w-4" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blood-red">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/login" className="font-medium text-blood-red hover:text-candle">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-blood-red hover:bg-pale-gold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => {
                sendRequest(email, password, user, setUser);
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-5 w-5 text-blood-red" />
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
