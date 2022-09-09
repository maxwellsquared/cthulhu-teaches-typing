import { useState, useEffect, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';


function Box () {
  return (
    <mesh rotation={[-0.3, -0.5, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="#BADA55" />
    </mesh>
  );
}


export default function Geometry() {

  return (
    <Canvas id="bg">
      <Box />
      <Stars />
      <spotLight position={[10,15,10]} angle={0.3} />
    </Canvas>
  );
}