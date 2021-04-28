import React, { Suspense, useRef, useEffect, useState } from "react";
import JSONfont from "../Roboto_Regular.json";
import * as THREE from "three";

function Text({ text, boxHeight, boxWidth, boxDepth, color, turn }) {
  const font = new THREE.FontLoader().parse(JSONfont);
  const textmesh = useRef();
  const [size, setSize] = useState(0.1);
  const [xshift, setXshift] = useState(0);
  const [yshift, setYshift] = useState(0);
  const [fontstatus, setFontstatus] = useState(false);
  const [run, setRun] = useState(0)


  const getVecSize = () => {
    const vec = new THREE.Vector3();
    textmesh.current.geometry.computeBoundingBox();
    const vecsize = textmesh.current.geometry.boundingBox.getSize(vec);
    return vecsize
  }


  const setTextSize = async () => {
    const vecsize = await getVecSize()

    if (vecsize.x/vecsize.y > boxWidth/boxDepth) {
      setSize((boxWidth * (9 / 10) * size) / vecsize.x);
    } else {
      setSize((boxDepth * (8 / 10) * size) / vecsize.y);
    }

    setXshift(vecsize.x/2);
    setYshift(vecsize.y/2);

    if (run < 1) {
      setRun(run+1)
    } else {
      setFontstatus(true);
    }

  }

  const setTextSizeTurned = async () => {
    const vecsize = await getVecSize()

    if (vecsize.x/vecsize.y > boxDepth/boxWidth) {
      setSize((boxDepth * (9 / 10) * size) / vecsize.x)
    } else {
      setSize((boxWidth * (9 / 10) * size) / vecsize.y)
    }

    
    

    setXshift(-vecsize.y/3);
    setYshift(vecsize.x/2);

    if (run < 1) {
      setRun(run+1)
    } else {
      setFontstatus(true);
    }

  }

  useEffect(() => {
    console.log('asd')
    if (!turn) {
      setTextSize()   
    } else {
      setTextSizeTurned()
    }
    
    
  }, [run]);

  const textOptions = {
    font,
    size: size,
    height: 0.001,
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, turn ? Math.PI/2 : 0]}
      ref={textmesh}
      position={[-xshift, boxHeight, yshift]}
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
