import React, { Suspense, useRef, useEffect, useState } from "react";
import JSONfont from "../Roboto_Regular.json";
import * as THREE from "three";

function Text({ text, boxHeight, boxWidth }) {
  const font = new THREE.FontLoader().parse(JSONfont);
  const textmesh = useRef();
  const [size, setSize] = useState(1);
  const [xshift, setXshift] = useState(0);
  const [yshift, setYshift] = useState(0);
  const [fontstatus, setFontstatus] = useState(false)

  useEffect(() => {
    const vec = new THREE.Vector3();
    textmesh.current.geometry.computeBoundingBox();
    const vecsize = textmesh.current.geometry.boundingBox.getSize(vec);
    setXshift(vecsize.x);
    setYshift(vecsize.y);

    if (vecsize.x > boxWidth - 0.1) {
      setSize(size - 0.05);
    } else {
      setFontstatus(true)
    }
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
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

export default Text;
