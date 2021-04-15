import React, { useRef, useState, Suspense, useEffect, useReducer } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
  Form
} from "react-bootstrap";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { SketchPicker } from "react-color";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Box from "../components/Box";
import Text from "../components/Text";
import { exportdata } from "../helpers/exportmodel";

extend({ OrbitControls });



function BuildScreen({ match }) {

  const analyzerID = match.params.id;
  const [data, setData] = useState(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [coloritem, setColoritem] = useState({ r: "120", g: "120", b: "120" });

  const [textcolorOpen, setTextColorOpen] = useState(false);
  const [textcoloritem, setTextColoritem] = useState({
    r: "255",
    g: "255",
    b: "255",
  });

  const [unit, setUnit] =useState('cm')
  const [modelheight, setHeigth] = useState(0)
  const [modelwidth, setWidth] = useState(0)
  const [modeldepth, setDepth] = useState(0)

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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

  const updateModel = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/analyzers/${analyzerID}/`,
        {
          brand: data.brand,
          brand_logo: data.brand_logo,
          code: data.code,
          name: data.name,
          width: unit == 'cm' ? modelwidth/100 : modelwidth*2.54/100,
          height: unit == 'cm' ? modelheight/100 : modelheight*2.54/100,
          depth: unit == 'cm' ? modeldepth/100 : modeldepth*2.54/100,
        }
      );
      forceUpdate()
    } catch (err) {
      console.log(err.response.data);
      return err.response;
    }
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/analyzers/${analyzerID}/`)
      .then((response) => {
        setData(response.data);
        setHeigth(unit == 'cm' ? (response.data.height*100).toFixed(2): (response.data.height*100/2.54).toFixed(2))
        setWidth(unit == 'cm' ? (response.data.width*100).toFixed(2): (response.data.width*100/2.54).toFixed(2))
        setDepth(unit == 'cm' ? (response.data.depth*100).toFixed(2): (response.data.depth*100/2.54).toFixed(2))
      });
  }, [unit, ignored]);

  const Scene = () => {

    return (
      
      <group position={[0,0.1,0]} ref={model}>
        <Suspense fallback={null}>
        <Box
          dims={[data.width, data.height, data.depth]}
          color={`rgb(${coloritem.r},${coloritem.g},${coloritem.b})`}
          img={data.brand_logo}
        
          
        />
        </Suspense>
        <Suspense fallback={null}>
          <Text
            text={data.code}
            boxHeight={data.height}
            boxWidth={data.width}
            boxDepth={data.depth}
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
                <OrbitControls autoRotate={false} />
                <ContactShadows opacity={1}
  width={1}
  height={1}
  blur={1} 
  far={10} 
  resolution={256}  />
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
              <Form.Control onChange={(e)=>setUnit(e.target.value)} as="select">
            <option>cm</option>
            <option>in</option>
          </Form.Control>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="d-inline">Breite [{unit}]</h5>{" "}
                  <Form.Control onChange={(e)=>setWidth(e.target.value)} type="number" placeholder="Enter width" value={modelwidth}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="d-inline">Tiefe [{unit}]</h5>{" "}
                  <Form.Control onChange={(e)=>setDepth(e.target.value)} type="number" placeholder="Enter depth" value={modeldepth}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className="d-inline">Höhe [{unit}]</h5>{" "}
                  <Form.Control onChange={(e)=>setHeigth(e.target.value)} type="number" placeholder="Enter height" value={modelheight}/>
                </ListGroup.Item>


                <ListGroup.Item className="text-center">
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
                    className="mr-2"
                    onClick={() => updateModel()}
                  >
                    Update
                  </Button>
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
