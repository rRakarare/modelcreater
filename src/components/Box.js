import React from "react";

function Box({ dims, color }) {
  return (
    <mesh position={[0, 0, 0]}>
      <boxBufferGeometry args={dims} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Box;
