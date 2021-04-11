import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Image, Button } from "react-bootstrap";
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
      history.push("/");
    } catch (err) {
      console.log(err.response.data);
      return err.response;
    }
  };

  useEffect(() => {
    console.log(brand);
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Analyzer name"
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
          </Col>
          <Col xs={2}>
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
            <Image height={40} src={brand.logo}></Image>
          </Col>
        </Form.Row>
        <Form.Row className="mt-2">
          <Col>
            <Form.Control
              onChange={(e) => setWidth(e.target.value / 100)}
              type="number"
              placeholder="width [cm]"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={(e) => setDepth(e.target.value / 100)}
              type="number"
              placeholder="depth [cm]"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={(e) => setHeight(e.target.value / 100)}
              type="number"
              placeholder="height [cm]"
            />
          </Col>
        </Form.Row>
        <Button onClick={() => postData()} className="mt-2">
          Add
        </Button>
      </Form>
    </Container>
  );
}

export default AddAnalyzerScreen;
