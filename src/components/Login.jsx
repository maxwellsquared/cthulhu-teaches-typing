import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Fragment>
      <form onSubmit={event => {
        event.preventDefault();
      }} autoComplete="off">
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => { setEmail(event.target.value); }}
        />
      </form>
      <div></div>
      <form onSubmit={event => {
        event.preventDefault();
      }} autoComplete="off">
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => { setPassword(event.target.value); }}
        />
      </form>
      <button
        onClick={() => {
          sendRequest(email, password);
        }}
      >
        Login
      </button>
    </Fragment>
  )
}

function sendRequest(email, password) {

  let loginData = {
    email: email,
    password: password
  }

  const putPromise = new Promise((resolve, reject) => {
    axios.post(`http://localhost:3000/login`, loginData, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
  console.log(putPromise);

}

export default Login