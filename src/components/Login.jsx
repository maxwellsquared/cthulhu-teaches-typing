import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import { useContext, useRef } from 'react';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('user', user);

  const loggedInUserRef = useRef(null);
  console.log('loggedInUserRef', loggedInUserRef);

  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    const successfullLogin = (response) => {
      loggedInUserRef.current = response.data;
      setUser(loggedInUserRef.current);
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:3000/login`, loginData, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          console.log('res.data', res.data);
          setUser({ name: res.data.name });
          successfullLogin(res);
          resolve(res.data);
          // need to use useRef to update the state of the user
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

    console.log(postRequest);
  }

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
