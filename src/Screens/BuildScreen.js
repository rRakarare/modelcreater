import React, { useRef, useState, Suspense, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
} from "react-bootstrap";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SketchPicker } from "react-color";

import axios from "axios";

import Box from "../components/Box";
import Text from "../components/Text";
import { exportdata } from "../helpers/exportmodel";

extend({ OrbitControls });

function BuildScreen({ match }) {
  const analyzerID = match.params.id;
  const [data, setData] = useState(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [coloritem, setColoritem] = useState({ r: "0", g: "0", b: "0" });

  const [textcolorOpen, setTextColorOpen] = useState(false);
  const [textcoloritem, setTextColoritem] = useState({
    r: "255",
    g: "255",
    b: "255",
  });

  const model = useRef();

  const handleClick = () => {
    setColorOpen(!colorOpen);
  };

  const handleClose = () => {
    setColorOpen(false);
  };

  const handleChange = (color) => (color) => {
    setColoritem(color.rgb);
  };
  const handleClicktext = () => {
    setTextColorOpen(!textcolorOpen);
  };

  const handleClosetext = () => {
    setTextColorOpen(false);
  };

  const handleChangetext = (color) => (color) => {
    setTextColoritem(color.rgb);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/analyzers/${analyzerID}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const Scene = () => {
    // useFrame(() => {
    //   model.current.rotation.y += 0.01;
    // });

    return (
      <group ref={model}>
        <Box
          dims={[data.width, data.height, data.depth]}
          color={`rgb(${coloritem.r},${coloritem.g},${coloritem.b})`}
        />
        <Suspense fallback={null}>
          <Text
            text={data.code}
            boxHeight={data.height}
            boxWidth={data.width}
            color={textcoloritem}
          />
        </Suspense>
      </group>
    );
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <div
            className="shadow-sm"
            style={{ height: "400px", background: "rgba(203, 203, 212,0.1)" }}
          >
            {data ? (
              <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, -10]} />
                <Scene />
                <OrbitControls />
              </Canvas>
            ) : null}
          </div>
        </Col>
        <Col>
          {data ? (
            <Card>
              <Card.Header>
                <Image height={25} src={data.brand_logo} /> {data.name}
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 className="d-inline">Breite: </h5>{" "}
                  {(data.width * 100).toFixed(2)}cm
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="d-inline">Höhe: </h5>{" "}
                  {(data.height * 100).toFixed(2)}cm
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="d-inline">Tiefe: </h5>{" "}
                  {(data.depth * 100).toFixed(2)}cm
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="mr-2"
                    size="sm"
                    onClick={() => handleClicktext()}
                  >
                    Text color
                  </Button>
                  {textcolorOpen ? (
                    <div style={{ position: "absolute", zIndex: "2" }}>
                      <div
                        style={{
                          position: "fixed",
                          top: "0px",
                          right: "0px",
                          bottom: "0px",
                          left: "0px",
                        }}
                        onClick={() => handleClosetext()}
                      />
                      <SketchPicker
                        color={textcoloritem}
                        onChange={handleChangetext()}
                        presetColors={[
                          "#2089C6",
                          "#459382",
                          "#632B30",
                          "#EB9E69",
                          "#519599",
                          "#004D75",
                        ]}
                      />
                    </div>
                  ) : null}
                  <Button
                    className="mr-2"
                    size="sm"
                    onClick={() => handleClick()}
                  >
                    Model color
                  </Button>
                  {colorOpen ? (
                    <div style={{ position: "absolute", zIndex: "2" }}>
                      <div
                        style={{
                          position: "fixed",
                          top: "0px",
                          right: "0px",
                          bottom: "0px",
                          left: "0px",
                        }}
                        onClick={() => handleClose()}
                      />
                      <SketchPicker
                        color={coloritem}
                        onChange={handleChange()}
                        presetColors={[
                          "#2089C6",
                          "#459382",
                          "#632B30",
                          "#EB9E69",
                          "#519599",
                          "#004D75",
                        ]}
                      />
                    </div>
                  ) : null}
                  <Button
                    size="sm"
                    onClick={() => exportdata(model, `${data.name}.gltf`)}
                  >
                    Download
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default BuildScreen;
