import React, { useRef, useState, Suspense, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import axios from "axios";

import Box from "../components/Box";
import Text from "../components/Text";
import { exportdata } from '../helpers/exportmodel'

extend({ OrbitControls });

function BuildScreen({ match }) {
  const analyzerID = match.params.id;
  const [data, setData] = useState(null);


  const model = useRef()


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/analyzers/${analyzerID}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);


  const Scene = () => {

    useFrame(() => {
      model.current.rotation.y += 0.01
    })

    return (
      <group ref={model}>
      <Box dims={[data.width, data.height, data.depth]} color="blue" />
      <Suspense fallback={null}>
        <Text
          text={data.code}
          boxHeight={data.height}
          boxWidth={data.width}
        />
      </Suspense>
      </group>
    )
  }

  return (
    <Container>
      <Row className="mt-2">
        <Col>
        <div className="shadow-sm" style={{ height: "400px", background:"rgba(203, 203, 212,0.1)"}}>
        {data ? (
          <Canvas camera={{ position: [2, 2, 2] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, -10]} />
            <Scene/>
            <OrbitControls />
          </Canvas>
        ) : null}
      </div>
        </Col>
        <Col>
        {data ? 
        <Card>
        <Card.Header><Image height={25} src={data.brand_logo}/> <h5 className="d-inline">{data.brand}</h5> {data.name}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><h5 className="d-inline">Breite: </h5> {data.width*100}cm</ListGroup.Item>
          <ListGroup.Item><h5 className="d-inline">Höhe: </h5> {data.height*100}cm</ListGroup.Item>
          <ListGroup.Item><h5 className="d-inline">Tiefe: </h5> {data.depth*100}cm</ListGroup.Item>

          <ListGroup.Item><Button onClick={() => exportdata(model, 'scene.gltf')}>Download model</Button></ListGroup.Item>
        </ListGroup>
      </Card>:
      null}
        </Col>
      </Row>

    </Container>
  );
}

export default BuildScreen;
