/* eslint-disable */
import * as THREE from 'three';
import * as React from 'react';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr'
import { Navbar } from "../components/Navbar/Navbar";
import Container from "../components/Container/Container";
import { ComponentProps } from 'react';
import { useCursor} from '@react-three/drei';

function Image() {
    var img = "/slideshow/joffee.png";
    const texture = useLoader(THREE.TextureLoader, img)

  return (

    <mesh>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  
  )
}

export default function ARview() {
  return (

    <Container maxWidth="sm">
      <Navbar/>
     
      
        <ARButton />
        <Suspense fallback={null}>
          <Canvas>
              <XR>  
                <Image />
              </XR>
          </Canvas>
        </Suspense>
    </Container>


  )
}