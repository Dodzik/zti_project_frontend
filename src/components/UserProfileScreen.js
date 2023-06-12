import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";

function UserProfileScreen(context) {

    return(
        <Container>
            <Col>
                <Row className="justify-content-md-center w-100">
                    <Container className="align-content-center w-50 p-1">
                        <Card className="rounded-5 justify-content-center my-auto">
                            <p className="font-italic text-center fs-1 fw-bold">My Profile</p>
                        </Card>
                    </Container>
                </Row>
                <ListGroup>
                    <ListGroup.Item>
                        <Container>
                            <Row>
                                <Col className="d-flex fs-6 mt-1">
                                    Name
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    User Internet Usage
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    Number
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                    {context.data.map((item) => (
                    <ListGroup.Item>
                        <Container>
                            <Row>
                                <Col className="d-flex fs-6 mt-1">
                                    {item.userInfo}
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    {item.userInternetUsage}
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    {item.userTel}
                                </Col>

                            </Row>
                        </Container>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>

        </Container>
    )
}


export default UserProfileScreen;