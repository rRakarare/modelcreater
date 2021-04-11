import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import DataTable from "../components/DataTable";
import NewTable from "../components/NewTable";
import axios from "axios";

function HomeScreen() {
  return (
    <Container>
      <NewTable />
    </Container>
  );
}

export default HomeScreen;
