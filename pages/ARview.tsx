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

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function ARview() {
  return(
    <>
   
    <ARButton />
 
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-4.2, 0, 0]} />
        <Box position={[4.2, 0, 0]} />
      </Canvas>

  </>
)
  }
// function Image() {
//     var img = "/slideshow/joffee.png";
//     const texture = useLoader(THREE.TextureLoader, img)

//   return (

//     <mesh>
//       <planeGeometry attach="geometry" args={[10, 10]} />
//       <meshBasicMaterial attach="material" map={texture} />
//     </mesh>
  
//   )
// }

// export default function ARview() {
//   return (

//     <Container maxWidth="sm">
//       <Navbar/>
     
      
//         <ARButton />
//         <Suspense fallback={null}>
//           <Canvas>
//               <XR>  
//                 <Image />
//               </XR>
//           </Canvas>
//         </Suspense>
//     </Container>


//   )
// }