import React, {useState} from "react";
import {Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import ListItemForCalls from "./ListItemForCalls";

async function addCall(request, context) {
    console.log(request)
    return fetch('http://localhost:8080/talk/createCall/' + context.userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(data => data.json())
}
async function queryForAllMyCalls(request) {
    console.log(request)
    return  fetch('http://localhost:8080/talk/getAllCalls/'+request.userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

function AllMyCallsScreen(context) {

    console.log("All my calls userId")
    console.log(context.userId)

    let [list, setList] = useState(context.data);
    console.log("data w UserContactsScreen")
    console.log(context.data)
    console.log(list)
    const [caller, setCaller] = useState("")
    const [addressee, setAddressee] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const submitAddCall = async e => {
        e.preventDefault();
        console.log("debugging")


        const response = await addCall({
            caller: caller,
            addressee: addressee,
            time: time,
            date: date
        }, context);
        console.log(response)
        console.log("add contact")
        setList(await queryForAllMyCalls(context))
    }
    return (
        <Container>
            <Col>
                <Row className="justify-content-md-center w-100">
                    <Container className="align-content-center w-50 p-1">
                        <Card className="rounded-5 justify-content-center my-auto">
                            <p className="font-italic text-center fs-1 fw-bold">My Calls</p>
                        </Card>
                    </Container>
                </Row>
                <ListGroup>
                    <ListGroup.Item>
                        <Container>
                            <Row>
                                <Col className="d-flex fs-6 mt-1">
                                    Caller
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    Addressee
                                </Col>
                                <Col className="d-flex fs-6 mt-1">
                                    Time (in seconds)
                                </Col>
                                <Col className="d-flex fs-9 mt-1">
                                    Date
                                </Col>
                                <Col className="d-flex justify-content-end">
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                    {list.map((item) => (
                        <ListItemForCalls userId={context.userId} id={item.talkId} caller={item.caller}
                                          addressee={item.addressee} time={item.time} date={item.date}/>
                    ))}
                </ListGroup>
            </Col>
            <Row>
                <Col>
                    <Container className="d-flex justify-content-center mt-5">
                    </Container>

                </Col>

                <Col>
                    <Container className="d-flex justify-content-center mt-5">
                        <Card className="rounded-5 text-center my-auto" style={{width: '13rem'}}>
                            Add Call
                        </Card>
                    </Container>
                    <Form onSubmit={submitAddCall} className="justify-content-center">
                        <div className="Auth-form-content">
                            <div className="form-group mt-3">
                                <label>Caller</label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Caller"
                                    onChange={e => setCaller(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Addressee</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Addressee"
                                    onChange={e => setAddressee(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="Auth-form-content">
                            <div className="form-group mt-3">
                                <label>Time</label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Time"
                                    onChange={e => setTime(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Date format (yyyy-mm-dd)</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Date"
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </Form>
                    <Container className="d-flex justify-content-center mt-2">
                        <Button variant="success" type="submit" className="btn btn-primary"
                                onClick={submitAddCall}>Add</Button>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default AllMyCallsScreen;