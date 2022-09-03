import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import { useContext, useRef } from 'react';
import LayoutWrapper from '../components/LayoutWrapper';
import TypingField from '../components/TypingField';
import { Routes, Route } from 'react-router-dom';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  const loggedInUserRef = useRef(null); // initialize ref to null, no user yet

  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    // function to set UserRef and user state
    const successfulLogin = (response) => {
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
            successfulLogin(res);
            setStatusCode(res.status);
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

  // if status code == 200 -> go happy route
  // * need to add correct component to render, props, etc.
  if (loggedInUserRef.current && statusCode === 200) {
    const { name, email } = loggedInUserRef.current;
    return (
      <Routes>
        <Route
          path={`/`}
          element={
            <LayoutWrapper>
              <TypingField userRef={loggedInUserRef.current} />
            </LayoutWrapper>
          }
        />
      </Routes>
    );
  }

  // if status code == 401 -> go sad route
  return (
    <LayoutWrapper>
      {statusCode === 401 && <h1>Invalid Credentials</h1>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={email}
          type="email"
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
        <button
          onClick={() => {
            sendRequest(email, password, user, setUser);
          }}
        >
          Login
        </button>
      </form>
    </LayoutWrapper>
  );
}

export default Login;
