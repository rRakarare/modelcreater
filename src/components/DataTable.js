import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Image, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function DataTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/analyzers/").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const deleteModel = async (id) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/analyzers/${id}`
    );
    if (response.status === 204) {
      setData(data.filter((item) => item.id != id));
    }
  };

  const filterData = (key) => {
    const newdata = data.filter(
      (item) => item.brand.includes(key) || item.name.includes(key)
    );
    setData(newdata);
  };

  return data === [] ? null : (
    <>
      <Form.Row className="mt-2">
        <Col xs={3}>
          <Form.Control
            onChange={(e) => filterData(e.target.value)}
            placeholder="Search"
          />
        </Col>
      </Form.Row>
      <Table className="mt-3" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Logo</th>
            <th>brand</th>
            <th>name</th>
            <th>width</th>
            <th>height</th>
            <th>depth</th>
            <th>build</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="text-center">
                <Image height={30} src={item.brand_logo} rounded />
              </td>
              <td>{item.brand}</td>
              <td>{item.name}</td>
              <td>{item.width * 100}</td>
              <td>{item.height * 100}</td>
              <td>{item.depth * 100}</td>
              <td className="text-center">
                <Link to={`/build/${item.id}`}>
                  <Button size="sm">Build Model</Button>
                </Link>
              </td>
              <td className="text-center">
                <Button
                  onClick={() => deleteModel(item.id)}
                  className="btn-danger"
                  size="sm"
                >
                  Delete Model
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
