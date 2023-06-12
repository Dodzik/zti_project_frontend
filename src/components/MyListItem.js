import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import React, {useState} from "react";


async function deleteContact(request) {
    console.log(request)
    return fetch('http://localhost:8080/contacts/delete/contact', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
}
function MyListItem (context) {
    const [deletion, setDeletion] = useState(false);

    const deleteCont = async e => {
        e.preventDefault();
        console.log("debugging")

        const response = await deleteContact({
            userId : context.userId,
            contactId : context.contactId
        })
        setDeletion(true)
        console.log(response)

    }
    return (
        <ListGroup.Item>
            <Container>
                <Row>
                    <Col className="d-flex fs-6 mt-1">
                        {context.contactName}
                    </Col>
                    <Col className="d-flex fs-6 mt-1">
                        {context.contactNumber}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="danger"
                            disabled={deletion}
                            onClick={!deletion ? deleteCont : null}
                        >
                            {deletion ? "deleted" : "delete"}
                        </Button>
                    </Col>

                </Row>
            </Container>
        </ListGroup.Item>
    )

}


export default MyListItem;
