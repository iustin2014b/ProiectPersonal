import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

 export function Register(props) {
    const [users, setusers] = useState({ Email: '', Password: '', Name: '' })
    const apiUrl = "https://localhost:7156/api/Login/register"
    const navigate = useNavigate();
    const onRegistration = (e) => {
        e.preventDefault();
        //debugger;
        const data1 = { Email: users.Email, Password: users.Password, Name: users.Name};
        axios.post(apiUrl, data1)
            .then((result) => {
               //debugger;
               console.log(result.data);
               if (result.data.status == 'Invalid')
                    alert('Invalid User');
               else
                   navigate('/Login')
            })
     }

    const onChange = (e) => {
        e.persist();
        setusers({ ...users, [e.target.name]: e.target.value });
     }

    return (
        <div class="container">
            <h1>Register a new user </h1>
            <Form onSubmit={onRegistration} class="user">
                <div class="col-lg-6">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={users.Email} onChange={onChange} name="Email" placeholder="name@example.com" />
                    <Form.Label>User nasme</Form.Label>
                    <Form.Control type="inputr" value={users.Name} onChange={onChange} name="Name" placeholder="name" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={users.Password} onChange={onChange} name="Password" placeholder="pass" />
                    <br></br>
                    <button type="submit" className="btn btn-info mb-1" block><span>Register</span></button>
                </div>
            </Form>
        </div>
    )
}

