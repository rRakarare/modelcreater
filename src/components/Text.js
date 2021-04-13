import React, { Suspense, useRef, useEffect, useState } from "react";
import JSONfont from "../Roboto_Regular.json";
import * as THREE from "three";

function Text({ text, boxHeight, boxWidth, boxDepth, color }) {
  const font = new THREE.FontLoader().parse(JSONfont);
  const textmesh = useRef();
  const [size, setSize] = useState(1);
  const [xshift, setXshift] = useState(0);
  const [yshift, setYshift] = useState(0);
  const [fontstatus, setFontstatus] = useState(false);


  useEffect(() => {
    const vec = new THREE.Vector3();
    textmesh.current.geometry.computeBoundingBox();
    const vecsize = textmesh.current.geometry.boundingBox.getSize(vec);
    setXshift(vecsize.x);
    setYshift(vecsize.y/2);


    if (vecsize.x/vecsize.y > boxWidth/boxDepth) {
      setSize((boxWidth * (9 / 10) * size) / vecsize.x);
    } else {
      setSize((boxDepth * (8 / 10) * size) / vecsize.y);
    }

    
    
    setFontstatus(true);
  }, [size]);

  const textOptions = {
    font,
    size: size,
    height: 0.01,
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      ref={textmesh}
      position={[-xshift / 2, boxHeight / 2, yshift / 2]}
    >
      <textGeometry attach="geometry" args={[text, textOptions]} />
      <meshPhongMaterial
        transparent={true}
        opacity={fontstatus ? 1 : 0}
        attach="material"
        color={`rgb(${color.r},${color.g},${color.b})`}
      />
    </mesh>
  );
}

export default Text;
