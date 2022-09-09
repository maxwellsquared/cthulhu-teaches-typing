import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserContext } from './helpers/context';
import About from './routes/About';
import Login from './routes/Login';
import Home from './routes/Home';
import User from './routes/User';
import Nav from './components/Nav';
import Leaderboard from './routes/Leaderboard';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';

//three.js testing
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

function Box() {
  return (
    <mesh rotation={[-0.3, -0.5, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="#BADA55" />
    </mesh>
  );
}

// parent component for all other components
export default function App() {
  const [user, setUser] = useState(); // user state, set at login
  const [userKeyboards, setUserKeyboards] = useState(); // array of keyboards for the user, set at login
  const [currentKeyboard, setCurrentKeyboard] = useState(); // this is the id of the current keyboard, set when user goes to TypingField

  // this will wrap all other components
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
          userKeyboards,
          setUserKeyboards,
          currentKeyboard,
          setCurrentKeyboard,
        }}
      >
        <Canvas id="bg">
          <Box />
          <Stars />
          <spotLight position={[10, 15, 10]} angle={0.3} />
        </Canvas>
        <Nav />

        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </LayoutWrapper>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
