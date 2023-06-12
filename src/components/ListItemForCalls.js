import React, {useState} from "react";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import { format } from 'date-fns';

async function deleteCallFromDB(request) {
    console.log(request)
    return fetch('https://ztiprojectbackend-production.up.railway.app/talk/deletecall', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
}
function ListItemForCalls (context) {
    const [deletion, setDeletion] = useState(false);

    const deleteCall = async e => {
        e.preventDefault();
        console.log("debugging")

        const response = await deleteCallFromDB({
            id : context.id
        })
        setDeletion(true)
        console.log(response)

    }
    return (
        <ListGroup.Item>
            <Container>
                <Row>
                    <Col className="d-flex fs-6 mt-1">
                        {context.caller}
                    </Col>
                    <Col className="d-flex fs-6 mt-1">
                        {context.addressee}
                    </Col>
                    <Col className="d-flex fs-6 mt-1">
                        {Math.floor(context.time / 60)} : {context.time % 60 < 10 ? 0 : ""}{context.time % 60}
                    </Col>
                    <Col className="d-flex fs-9 mt-1">
                        {format(new Date(context.date), 'yyyy-MM-dd')}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="danger"
                            disabled={deletion}
                            onClick={!deletion ? deleteCall : null}
                        >
                            {deletion ? "deleted" : "delete"}
                        </Button>
                    </Col>

                </Row>
            </Container>
        </ListGroup.Item>
    )

}


export default ListItemForCalls;