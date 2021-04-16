import React, {useRef, Suspense} from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three'
import { groupBy } from "lodash";

function Box({ dims, color, img }) {

  const texture = useLoader(THREE.TextureLoader, img)

  const width = dims[0]
  const height = dims[1]

  const imgHeight = texture.image.height
  const imgWidth = texture.image.width

  const scaleImage = imgHeight / imgWidth

  let textWidth = 1
  let textHeight = 1

  if (width <= height) {

    textWidth = width/2
    textHeight = height/2 * width/height

    

  } else {

    textHeight = height/2
    textWidth = width/2 * height/width

  }

  if (scaleImage < 1) {
    textHeight = textHeight * scaleImage
  }
  if (scaleImage > 1) {
    textWidth = textWidth * scaleImage
  }


  return (
    <group>
      <mesh position={[0, 0, dims[2]/2]}>
      <boxBufferGeometry attach="geometry" args={[textWidth,textHeight,0.001]} />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" color={color}  />
      <meshStandardMaterial attachArray="material" attach="material" map={texture} toneMapped={false}/>
      <meshStandardMaterial attachArray="material" color={color}  />
    </mesh>
      <mesh position={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={dims} />
      <meshStandardMaterial attach="material" color={color}  />
    </mesh>
    </group>

    
  );
}

export default Box;
