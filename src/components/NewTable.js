import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function NewTable() {
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

  const columns = [
    {
      field: "brand_logo",
      headerName: "Logo",
      width: 100,
      renderCell: (params) => <Image height={70} src={params.value} />,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "name",
      headerName: "Analyzer",
      width: 150,
    },
    {
      field: "width",
      headerName: "width [cm]",
      width: 150,
      valueFormatter: (params) => (params.value * 100).toFixed(2),
      type: "number",
    },
    {
      field: "depth",
      headerName: "depth [cm]",
      width: 150,
      valueFormatter: (params) => (params.value * 100).toFixed(2),
      type: "number",
    },
    {
      field: "height",
      headerName: "height [cm]",
      width: 150,
      valueFormatter: (params) => (params.value * 100).toFixed(2),
      type: "number",
    },
    {
      field: "id",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/build/${params.value}`}>
            <Button size="sm">Build Model</Button>
          </Link>

            <Button onClick={()=>deleteModel(params.value)} className="ml-2" size="sm" variant="danger">
              Delete
            </Button>

        </>
      ),
    },
  ];

  return (
    <div className="mt-3" style={{ height: "100%", width: "100%" }}>
      <DataGrid
      autoHeight={true}
        components={{
          Toolbar: CustomToolbar,
        }}
        rows={data}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}

export default NewTable;
