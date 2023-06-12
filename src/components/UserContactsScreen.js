import React, {useState} from "react";
import {Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import MyListItem from "./MyListItem";

async function addContact(request, context) {
    console.log(request)
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/add/contact/' + context.userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(data => data.json())
}

async function queryForMyContacts(request) {
    console.log(request)
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + request.userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}
async function queryForMyFilteredContacts(request) {
    console.log(request)
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + request.userId +'/filteredByName/'+request.contactName , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}


async function NameAsc(context) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + context.userId + '/sortedByNameASC', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function NameDesc(context) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + context.userId + '/sortedByNameDESC', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function NumberDESC(context) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + context.userId + '/sortedByNumberDESC', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function NumberASC(context) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/contacts/getAllUserContacts/' + context.userId + '/sortedByNumberASC', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

function UserContactsScreen(context) {

    console.log("MUserContactsScreen userId")
    console.log(context.userId)

    let [list, setList] = useState(context.data);
    console.log("data w UserContactsScreen")
    console.log(context.data)
    const [contactName, setContactName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [contactNumberFilter, setContactNumberFilter] = useState("")
    console.log(list)

    const submitAddContact = async e => {
        e.preventDefault();
        console.log("debugging")


        const response = await addContact({
            name: contactName,
            number: contactNumber
        }, context);
        console.log(response)
        console.log("add contact")
        setList(await queryForMyContacts(context))
    }

    const sortedNameAsc = async e => {
        e.preventDefault();
        console.log("debugging")
        setList(await NameAsc(context));
        console.log(list)
    }
    const sortedNameDesc = async e => {
        e.preventDefault();
        console.log("debugging")
        setList(await NameDesc(context));
        console.log(list)
    }
    const sortedNumberAsc = async e => {
        e.preventDefault();
        console.log("debugging")
        setList(await NumberASC(context));
        console.log(list)
    }
    const sortedNumberDesc = async e => {
        e.preventDefault();
        console.log("debugging")
        setList(await NumberDESC(context));
        console.log(list)
    }
    const myContactsFiltered = async e => {
        e.preventDefault();
        console.log("debugging")
        let response;
        if (contactNumberFilter === "") {
            response = await queryForMyContacts({
                "userId": context.userId,
            });
        }
        else {
            response = await queryForMyFilteredContacts({
                "userId": context.userId,
                "contactName": contactNumberFilter
            });
        }
        console.log(response)
        setList(response)
    }

    return (
        <Container>
            <Col>
                <Row className="justify-content-md-center w-100">
                    <Container className="align-content-center w-50 p-1">
                        <Card className="rounded-5 justify-content-center my-auto">
                            <p className="font-italic text-center fs-1 fw-bold">My Contacts Screen</p>
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
                                    Contact Number
                                </Col>
                                <Col className="d-flex fs-6 mt-1">

                                </Col>

                            </Row>
                        </Container>
                    </ListGroup.Item>
                    {list.map((item) => (
                        <MyListItem userId={context.userId} contactName={item.contactName}
                                    contactNumber={item.contactNumber} contactId={item.contactId}/>
                    ))}
                </ListGroup>
            </Col>
            <Row>
                <Col>
                    <Container className="d-flex justify-content-center mt-5">
                        <Row className="m-lg-2">

                            <Button onClick={sortedNameAsc}>Contacts sorted by name ASC</Button>
                            <Button onClick={sortedNameDesc}>Contacts sorted by name DESC</Button>
                        </Row>
                        <Row className="m-lg-2">
                            <Button onClick={sortedNumberAsc}>Contacts sorted by number ASC</Button>
                            <Button onClick={sortedNumberDesc}>Contacts sorted by number DESC</Button>
                        </Row>
                    </Container>

                </Col>
                <Col>
                    <Container className="d-flex justify-content-center mt-5">
                        <Card className="rounded-5 text-center my-auto" style={{width: '13rem'}}>
                            Filter Contacts
                        </Card>
                    </Container>
                    <Form onSubmit={submitAddContact} className="justify-content-center">
                            <div className="form-group mt-3">
                                <label>Contact Name</label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Contact Name"
                                    onChange={e => setContactNumberFilter(e.target.value)}
                                />
                            </div>
                    </Form>
                    <Container className="d-flex justify-content-center mt-2">
                        <Button variant="success" type="submit" className="btn btn-primary"
                                onClick={myContactsFiltered}>Filter</Button>
                    </Container>
                </Col>

                <Col>
                    <Container className="d-flex justify-content-center mt-5">
                        <Card className="rounded-5 text-center my-auto" style={{width: '13rem'}}>
                            Add Contact
                        </Card>
                    </Container>
                    <Form onSubmit={submitAddContact} className="justify-content-center">
                        <div className="Auth-form-content">
                            <div className="form-group mt-3">
                                <label>Contact Name</label>
                                <Form.Control
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Contact Name"
                                    onChange={e => setContactName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label>Contact Number</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Contact Number"
                                    onChange={e => setContactNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    </Form>
                    <Container className="d-flex justify-content-center mt-2">
                        <Button variant="success" type="submit" className="btn btn-primary"
                                onClick={submitAddContact}>Add</Button>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default UserContactsScreen;
