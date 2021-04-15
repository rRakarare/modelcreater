import React, {useRef, Suspense} from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three'
import { groupBy } from "lodash";

function Box({ dims, color, img }) {

  const texture = useLoader(THREE.TextureLoader, img)
  const width = dims[0]
  const height = dims[1]

  let scale = 1

  if (width <= height) {
    scale = 1 /width
  } else {
    scale = 1 /height
  }

  console.log(height, width)
  console.log(texture.image.height)
  console.log(texture.image.width)
  // texture.center={x:width/4,y:height/4}
  texture.repeat={x:width*scale,y:height*scale}
  texture.offset={x:-0,y:-0}


  return (    
      <mesh position={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={dims} />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color} attach="material" map={texture} toneMapped={false}/>
      <meshStandardMaterial attachArray="material" color={color}  />
    </mesh>

    
  );
}

export default Box;
