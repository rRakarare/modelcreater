import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function DataTable(props) {
    console.log(props)

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/analyzers/').then(response => {
            console.log(response.data)
            setData(response.data)
        })
    }, [])

    return (
        data === [] ? null:
        <Table className="mt-3" striped bordered hover size="sm" >
            <thead>
                <tr>
                <th>Logo</th>
                <th>brand</th>
                <th>name</th>
                <th>width</th>
                <th>height</th>
                <th>depth</th>
                <th>build</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr>
                        <td className="text-center"><Image height={30} src={item.brand_logo} rounded /></td>
                        <td>{item.brand}</td>
                        <td>{item.name}</td>
                        <td>{item.width}</td>
                        <td>{item.height}</td>
                        <td>{item.depth}</td>
                        <td className="text-center"><Link to={`/build/${item.id}`}><Button size="sm">Build Model</Button></Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default DataTable
