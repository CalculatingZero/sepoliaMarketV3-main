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
// function Box(props: JSX.IntrinsicElements['mesh']) {
  // // This reference will give us direct access to the THREE.Mesh object
  // const ref = useRef<THREE.Mesh>(null!)
  // const name = useRef<string>(null!)
  // // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false) 
  // // Rotate mesh every frame, this is outside of React without overhead
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    // <mesh
    //   {...props}
    //   ref={ref}
    //   scale={clicked ? 2.5 : 5}
    //   onClick={(event) => click(!clicked)}
    //   onPointerOver={(event) => hover(true)}
    //   onPointerOut={(event) => hover(false)}>
    //   <boxGeometry args={[1, 1, 1]} />
    //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    // </mesh>
  //   <mesh
  //   {...props}
  //   ref={ref}
  //   name={name}
  //   onPointerOver={(e) => (e.stopPropagation(), hover(true))}
  //   onPointerOut={() => hover(false)}
  //   scale={[1, 1.689 , 0.05]}
  //   position={[0, 1.689 / 2, 0]}> 
  //   <boxGeometry args={[1, 1, 1]} />
  //   <Image href={`https://nft-cdn.alchemy.com/eth-mainnet/c806cf7602f6ae0904205eef212e2c2a`} />
  // </mesh>
    <mesh>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  
  )
}

export default function ARview() {
  return (

    <Container maxWidth="lg">
      <Navbar/>
      {/* <ARButton />
         <Canvas>
         <XR>
           <ambientLight intensity={0.5} />
           <pointLight position={[5, 5, 5]} />
           <Controllers />
           <BoxText position={[0, 0.8, -1]} />
         </XR>
       </Canvas> */}
       <ARButton />

        <Canvas colorManagement>
            <XR>
                <Suspense fallback={null}>
                    <Image />
                </Suspense>
            </XR>
        </Canvas>

       
    </Container>


  )
}


// function BoxText(props: JSX.IntrinsicElements['mesh']) {
//   return (
//     <Box {...props} args={[0.4, 0.1, 0.1]}>
//       <meshStandardMaterial color={0x000077} />
//       <Text position={[0, 0, 0.06]} fontSize={10} color="#fff" anchorX="center" anchorY="middle">
//         This is a Test
//       </Text>
//     </Box>
//   )
// }

// export default function ARview() {
//   return (
//     <>
//       <ARButton />
//       <Canvas>
//         <XR>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[5, 5, 5]} />
//           <Controllers />
//           <BoxText position={[0, 0.8, -1]} />
//         </XR>
//       </Canvas>
//     </>
//   )
// }