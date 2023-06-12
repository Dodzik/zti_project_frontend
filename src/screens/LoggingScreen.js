import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import {Card, Form} from "react-bootstrap";

async function loginUser(credentials) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

        .then((response) => {
            if(!response.ok) return {message: "bad credentials"};
            else return response.json();
        })
}

function LoggingScreen (prop){
    const [number, setNumber] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();
    const [error, setError] = useState();
    console.log(prop.userId)

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("debugging")
        const response = await loginUser({
            number : number,
            password : password
        });

        console.log(response.userId !== undefined)
        if (response.userId !== undefined){
            setError('')
            prop.setUserId(response.userId)
            prop.setAuth(true)
            console.log(prop.userId)
            console.log(prop.auth)
            console.log("go to user panel")
            navigate("/UserPanel")
        }
        else {
            setError(response.message)
        }
    }

    return (
        <div className="min-vh-100 justify-content-center my-auto modal-dialog-centered" >
            <Card className="rounded-4" style={{ width: '28rem', height: '24rem'}}>
                <Card.Body className="justify-content-center my-auto modal-dialog-centered">
            <Form className="justify-content-center w-75" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="text-center">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Number address</label>
                        <input
                            required
                            // type="email"
                            className="form-control mt-1"
                            placeholder="Enter number"
                            onChange={e => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {error && <span className='err'>{error}</span>}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <p>First time? <Link to="/RegistrationScreen" >Registration</Link></p>
                </div>
            </Form>
                </Card.Body>
            </Card>
        </div>
    )
}


export default LoggingScreen;
