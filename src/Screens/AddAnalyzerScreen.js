import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Image, Button, Alert } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import logoClearbit from "../api/logoClearbit";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddAnalyzerScreen() {
  let history = useHistory();
  const [querydata, setQuerydata] = useState([]);
  const [term, setTerm] = useState("");
  const [brand, setBrand] = useState("");

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState('')

  const [unit, setUnit] =useState('cm')

  const getData = async (keyword) => {
    const response = await logoClearbit.get("suggest?", {
      params: {
        query: keyword,
      },
    });
    setQuerydata(response.data);
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/analyzers/`,
        {
          brand: company,
          name: name,
          brand_logo: brand.logo,
          code: code,
          width: width,
          height: height,
          depth: depth,
        }
      );
      setDisplay(name)
      setShow(true)
    } catch (err) {
      console.log(err.response.data);
      return err.response;
    }
  };

  const asdqwe = (id) => {
    console.log(id)
  }

  useEffect(() => {
    if (term) {
      getData(term);
    }
  }, [term, brand]);

  return (
    <Container>
      <Form className="mt-2">
        <Form.Row>
        <Col xs={2}>
            <Form.Control
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              placeholder="Analyzer name"
            />
          </Col>

          <Col xs={2}>
            <Form.Control
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
          </Col>
          </Form.Row>
          <Form.Row className="mt-2 ">
          <Col xs={5}>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              options={querydata}
              getOptionLabel={(option) => (option.name ? option.name : "")}
              style={{ height: 10 }}
              renderInput={(params, data) => (
                <TextField
                  size="small"
                  style={{ padding: 0 }}
                  {...params}
                  label="Logo"
                  variant="outlined"
                />
              )}
              value={brand}
              onChange={(event, newValue) => {
                setBrand(newValue);
              }}
              inputValue={term}
              onInputChange={(event, newInputValue) => {
                setTerm(newInputValue);
              }}
              renderOption={(option) => (
                <React.Fragment>
                  <Image
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "1rem",
                    }}
                    src={option.logo ? option.logo : ""}
                  />
                  {option.name}
                </React.Fragment>
              )}
            />
          </Col>
          <Col>
            <Image height={40} src={brand ? brand.logo : "logo.png"}></Image>
          </Col>
        </Form.Row>
        <Form.Row className="mt-2">
          <Col xs={6}>
          <Form.Control onChange={(e)=>setUnit(e.target.value)} as="select">
            <option>cm</option>
            <option>in</option>
          </Form.Control>
          </Col>
        </Form.Row>
        <Form.Row className="mt-2">
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setWidth(unit == "cm" ? e.target.value / 100: e.target.value *2.54 / 100)}
              type="number"
              placeholder={`width [${unit}]`}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setDepth(unit == "cm" ? e.target.value / 100: e.target.value *2.54 / 100)}
              type="number"
              placeholder={`depth [${unit}]`}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setHeight(unit == "cm" ? e.target.value / 100: e.target.value *2.54 / 100)}
              type="number"
              placeholder={`height [${unit}]`}
            />
          </Col>
        </Form.Row>
        <Button onClick={() => postData()} className="mt-2">
          Add
        </Button>
      </Form>
      <Alert className="mt-2" show={show} variant="success">
        

        <div className="d-flex">
        <p className="justify-self-start py-1 m-0">{display} Added!</p>
          <Button className="ml-auto" size="sm" onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    </Container>
  );
}

export default AddAnalyzerScreen;
