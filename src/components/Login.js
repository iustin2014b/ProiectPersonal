import React, { useState, useEffect ,useContext} from 'react'
import { Link } from "react-router-dom";
import { Register } from "./Register";
import axios from 'axios';
import { genContext } from './GlobalContext'

export function Login(props) {
    const [users, setUsers] = useState({ Email: '', Password: '', Name: '',NameEmail:'' });
    const apiUrl = "https://localhost:7156/api/Upload/user"// "http://localhost:1680/api/users/Login";
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext);

    const Login = (e) => {
        e.preventDefault();
       // debugger;
        const data = { Email: users.Email, Password: users.Password, Name: users.Name };
        axios.post(apiUrl+"/login", data)
            .then((result) => {
               // debugger;
                console.log(result.data);
                if (result.data.status == '200') {
                    setUserName(result.data.userDetails.name)
                }
                else
                    alert('Invalid User !');
            })
    };

    const disconnect = () => {
        const data = { Email: users.Email, Password: users.Password, Name: userName };
        setUsers(prevState => ({ ...prevState, Name : userName}))
        axios.post(apiUrl + "/disconnect", data)
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
    if (userName=="")
    return (
        <div class="container">        
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form onSubmit={Login} class="user">
                                            <div class="form-group">
                                                <input type="email" class="form-control" value={users.Email} onChange={onChange} name="Email" id="Email" aria-describedby="emailHelp" placeholder="Enter Email" />
                                                <p>OR</p>
                                                <input type="text" class="form-control" value={users.Name} onChange={onChange} name="Name" id="Name" aria-describedby="Name" placeholder="Enter User Name" />
                                            </div>
                                            <div class="form-group">
                                                <br/>
                                                <input type="password" class="form-control" value={users.Password} onChange={onChange} name="Password" id="DepPasswordartment" placeholder="Password" />
                                            </div>
                                            <button type="submit" className="btn btn-info mb-1" block><span>Login</span></button>
                                            <hr />
                                            <Link to="/Register"><button>
                                                Register
                                            </button>
                                            </Link>
                                        </form>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        )
    else 
        return (
            <div class="container">
                <p> User <span style={{ color: "red" }}> {userName}</span> is connected </p>
                <button className="btn btn-info mb-1" onClick={disconnect} block><span>Disconnect</span></button>
            </div>
            )
}
