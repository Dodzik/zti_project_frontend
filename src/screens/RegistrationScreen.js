import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";

async function loginUser(credentials) {
    return fetch('https://ztiprojectbackend-production.up.railway.app/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function RegistrationScreen(){

    const [input, setInput] = useState({
        username: '',
        number: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        username: 'Please enter Username.',
        password: 'Please enter Password.',
        confirmPassword: 'Please enter Confirm Password.'
    })
    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const handleSubmit = async e => {
        if (error.username === "" && error.password === "" && error.confirmPassword === "") {
            e.preventDefault();
            console.log("debugging")
            const response = await loginUser({
                number: input.number,
                password: input.password,
                userInfo: input.username
            });
            console.log(response)
        }
        else {
            console.log("wrong credentials")
        }
    }
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    }
                    else if (input.password.length < 8) {
                        stateObj[name] = "password must by 8 characters long."
                    } else if (input.confirmPassword && value !== input.password) {
                            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";

                    }
                    // else {
                    //     stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    // }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }


    return (
        <div className="min-vh-100 justify-content-center my-auto modal-dialog-centered" style={{
            width: '100vw',
            height: '100vh'}} >
            <Card className="rounded-4" style={{ width: '28rem'}}>
                <Card.Body className="justify-content-center my-auto modal-dialog-centered">
            <Form className="justify-content-center w-75" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="text-center">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Number address</label>
                        <input
                            required
                            // type="email"
                            name="number"
                            className="form-control mt-1"
                            placeholder="Enter number"
                            onChange={onInputChange}
                            onBlur={validateInput}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={onInputChange}
                            onBlur={validateInput}
                        />
                        {error.password && <span className='err'>{error.password}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            required
                            type="password"
                            name="confirmPassword"
                            className="form-control mt-1"
                            placeholder="Confirm password"
                            onChange={onInputChange}
                            onBlur={validateInput}
                        />
                        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>User Name</label>
                        <input
                            required
                            type="username"
                            name="username"
                            className="form-control mt-1"
                            placeholder="User Name"
                            onChange={onInputChange}
                            onBlur={validateInput}
                        />
                        {error.username && <span className='err'>{error.username}</span>}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        { (error.username || error.password || error.confirmPassword) ?
                            <button type="button" className="btn btn-lg btn-primary" disabled>
                                Wrong credentials
                            </button>
                            :
                            <button type="submit" className="btn btn-primary">
                            Submit
                            </button>
                        }
                    </div>
                </div>
                <div className="text-center">
                    <p><a href="/">Go to Logging</a></p>
                </div>
            </Form>
                </Card.Body>
            </Card>
        </div>
    )
}


export default RegistrationScreen;
