import React, {useState} from 'react';
import {Alert,Button} from 'react-bootstrap'

function BAlert( {name}) {

    const [show, setShow] = useState(true)

    return (
        <Alert className="mt-2" show={show} variant="success">
        

        <div className="d-flex">
        <p className="justify-self-start py-1 m-0">{name} Added!</p>
          <Button className="ml-auto" size="sm" onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    )
}

export default BAlert
