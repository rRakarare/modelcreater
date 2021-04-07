import React from 'react';
import {Container} from 'react-bootstrap'

function BuildScreen({match}) {
    const analyzerID = match.params.id
    return (
        <Container>
            Analyzer {analyzerID}
        </Container>
    )
}

export default BuildScreen
