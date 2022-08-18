import React, { useState, useEffect ,useContext} from 'react'
import { Link } from "react-router-dom";
import { Register } from "./Register";
import axios from 'axios';
import { globContext, setDatContext, UserContext, genContext } from '../Global/GlobalContext';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

export function Login() {
    const [users, setUsers] = useState({ Email: '', Password: '', Name: '',NameEmail:'' });
    const apiUrl = "https://localhost:7156/api/Login"
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext);
    const navigate = useNavigate();

    const onSignIn = (e) => {
        e.preventDefault();
       // debugger;
        const data = { Email: users.Email, Password: users.Password, Name: users.Name };
        axios.post(apiUrl+"/signin", data)
            .then((result) => {
               // debugger;
                console.log(result.data);
                if (result.data.status == '200') {
                    setUserName(result.data.userDetails.name)
                }
                else
                    alert('Invalid User !');
                navigate('/Home')
            })
    };

    const onSignOut = () => {
        const data = { Email: users.Email, Password: users.Password, Name: userName};
        setUsers(prevState => ({ ...prevState, Name : userName}))
        axios.post(apiUrl + "/signout", data)
            .then((result) => {
                //debugger;
                console.log(result.data);
                const user = result.data.UserDetails;
                console.log(result.data.message);
                if (result.data.status != '200')
                    alert('Invalid User');
                setUserName("")
                setUsers({ Email: '', Password: '', Name: '', NameEmail: '' });
            }
        )
    }

    const onChange = (e) => {
        e.persist();
        setUsers({ ...users, [e.target.name]: e.target.value });
    }

    return (
         <div>
            <h1 class="h4 text-gray-900 mb-4">
                {userName != '' ? <p>User {userName} connected</p> : <p>Sign-in by name or email</p>}                                                                                                    
            </h1>              
            <div class="col-lg-6">
                {userName == '' &&
                    <Form onSubmit={onSignIn} class="user">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={users.Email} onChange={onChange} name="Email" placeholder="name@example.com" />
                        <Form.Label>OR</Form.Label>
                        <br></br>
                        <Form.Label>User nasme</Form.Label>
                        <Form.Control type="inputr" value={users.Name} onChange={onChange} name="Name" placeholder="name" />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={users.Password} onChange={onChange} name="Password" placeholder="pass" />
                        <br></br>
                        <button type="submit" className="btn btn-info mb-1" block><span>Login</span></button>
                    </Form>
                }
                {userName == '' ?
                    <Link to="/Register"><button>  Register </button> </Link> :
                    <button className="btn btn-info mb-1" onClick={onSignOut} block><span>Disconnect</span></button>
                }
            </div>                               
        </div>            
         )
}
