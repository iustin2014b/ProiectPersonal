import React, { Component ,useState ,useContext} from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, NavLogo, Nav, Bars } from 'reactstrap';
import { genContext } from './GlobalContext'
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    const [st, setSt] = useState(true)
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext)
    const toggleNavbar = () => {
        setSt(false)
    }
    return (
  
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">HUB Projects</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={st} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Home">Home</NavLink>
                        </NavItem>
                       
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/Login">Login <span style={{ color: "red" }}> {userName}</span> </NavLink>
                        </NavItem>
                        {(userName != "") &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/ProjectsPage">Project Choose</NavLink>
                            </NavItem>
                        }
                        {(userName != "" & projectCrt != "") &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/FilesPage">Project Explore</NavLink>
                            </NavItem>
                        }
                    </ul>
                </Collapse>              
            </Navbar>
        </header>
 
    );
};


