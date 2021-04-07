import React, {useEffect, useState} from 'react';
import { Container, Table } from 'react-bootstrap'
import DataTable from '../components/DataTable'
import axios from 'axios'



function HomeScreen() {



    return (
        <Container>
            <DataTable/>
        </Container>
    )
}

export default HomeScreen
