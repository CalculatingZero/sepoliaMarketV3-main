/* eslint-disable */
import * as THREE from 'three';
import * as React from 'react';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr'
import { Navbar } from "../../../../components/Navbar/Navbar";
import ContainerAR from "../../../../components/Container/ContainerAR";
import { ComponentProps } from 'react';
import { useCursor} from '@react-three/drei';
import { useRouter } from "next/router";
import {
    useContract,
    useAddress,
    useValidDirectListings,
    useValidEnglishAuctions,
    Web3Button,
  } from "@thirdweb-dev/react";
import Skeleton from "../../../../components/Skeleton/Skeleton";
import {
  ETHERSCAN_URL,
  MARKETPLACE_ADDRESS,
  NETWORK,
  ALCH_NET,
} from "../../../../const/contractAddresses";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../../../util/toastConfig";
import styles from "../../../../styles/Token.module.css";

function Image() {
    const router = useRouter();
    const img = router.query.image as string;
    console.log(img)
    const texture = useLoader(THREE.TextureLoader, img);
    const ref = React.useRef<THREE.Mesh>(null!);


    // Set the initial viewing angle at 45 degrees
    React.useEffect(() => {
      if (ref.current) {
      ref.current.rotation.x = -0.785;
      }
    }, []);
  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default function ARview() {
  const router = useRouter(); 
  const NFT_COLLECTION_ADDRESS = router.query.contractAddress as string;
  const tokenID = router.query.tokenId as string;
  
    // Connect to marketplace smart contract
    const { contract: marketplace, isLoading: loadingContract } = useContract(
      MARKETPLACE_ADDRESS,
      "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirect } =
  useValidDirectListings(marketplace, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: tokenID,
  });

  const { data: auctionListing, isLoading: loadingAuction } =
      useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: tokenID,
      });

  async function buyListing() {
      let txResult;
  
      if (auctionListing?.[0]) {
          txResult = await marketplace?.englishAuctions.buyoutAuction(
          auctionListing[0].id
          );
      } else if (directListing?.[0]) {
          txResult = await marketplace?.directListings.buyFromListing(
          directListing[0].id,
          1
          );
      } else {
          throw new Error("No valid listing found for this NFT");
      }
      return txResult;
      }
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <ContainerAR maxWidth="lg">
        <Navbar/>
        <div className={styles.mixedButtons}>
        <Link className={styles.mixedReality} href={`/token/${NFT_COLLECTION_ADDRESS}/${tokenID}`}>Back</Link>
        {loadingContract || loadingDirect || loadingAuction ? (
              <Skeleton width="100%" height="164" />
          ) : (
              <Web3Button
                  contractAddress={MARKETPLACE_ADDRESS}
                  action={async () => await buyListing()}
                  onSuccess={() => {
                  toast(`Purchase success!`, {
                      icon: "✅",
                      style: toastStyle,
                      position: "bottom-center",
                  });
                  }}
                  onError={(e) => {
                  toast(`Purchase failed! Reason: ${e.message}`, {
                      icon: "❌",
                      style: toastStyle,
                      position: "bottom-center",
                  });
                  }}
              >
                  Buy at asking price
              </Web3Button>)}
            </div>
          <ARButton />
          <Suspense fallback={null}>
            <Canvas>  
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
                <XR>  
                  <Image />
                </XR>
            </Canvas>
          </Suspense>    
      </ContainerAR>
    </div>
  )
}