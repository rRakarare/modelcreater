import React, { useRef, useState, Suspense, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

import Box from "../components/Box";
import Text from "../components/Text";

extend({ OrbitControls });

function BuildScreen({ match }) {
  const analyzerID = match.params.id;
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/analyzers/${analyzerID}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  return (
    <Container>
      Analyzer {analyzerID}
      <div style={{ height: "400px" }}>
        {data ? (
          <Canvas camera={{ position: [2, 2, 2] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, -10]} />
            <Box dims={[data.width, data.height, data.depth]} color="blue" />
            <Suspense fallback={null}>
              <Text
                text={data.code}
                boxHeight={data.height}
                boxWidth={data.width}
              />
            </Suspense>
            <OrbitControls />
          </Canvas>
        ) : null}
      </div>
    </Container>
  );
}

export default BuildScreen;
