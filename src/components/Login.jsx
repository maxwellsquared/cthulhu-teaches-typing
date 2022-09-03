import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import { useContext, useRef } from 'react';

import TypingField from './TypingField';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loggedInUserRef = useRef(null); // initialize ref to null, no user yet

  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    // function to set UserRef and user state
    const successfullLogin = (response) => {
      loggedInUserRef.current = response.data;
      setUser(loggedInUserRef.current); // ?? note sure if we actually need this.
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
            successfullLogin(res);
          }
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // if status code == 200 -> go happy route
  // * need to add correct component to render, props, etc.
  if (loggedInUserRef.current) {
    const { name, email } = loggedInUserRef.current;
    return (
      <div>
        <h1>Welcome {name}</h1>
        <h2>Your email is {email}</h2>
        <TypingField />
      </div>
    );
  }

  // if status code != 200 -> go sad route
  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </form>
      <div></div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          sendRequest(email, password, user, setUser);
        }}
      >
        Login
      </button>
    </Fragment>
  );
}

export default Login;
