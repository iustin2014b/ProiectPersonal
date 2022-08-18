import React, { Component } from 'react';
import { useState, createContext ,useContext} from "react";
import { useApiSearchProject } from './ApiCall'
import { useNavigate } from "react-router-dom";
import { globContext, setDatContext, UserContext, genContext } from './Global/GlobalContext';
import { ProjectsPage } from './Projects/ProjectsPage'

export function Home () {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext);

    const SearchProject = () => {
        const resp = useApiSearchProject(search)       
    }

    const GoToProject = () => {
        if (userName === "")
            navigate('/Login')
         else
            navigate('/ProjectsPage')
    }
    return (
        <div>
            <h1>Public projects hub</h1>
            <p>Search for all publics project (no registration required) :</p> 
            <input type="text" value={search} />
            <input type="button" onClick={SearchProject} value="Search" />
            <p>...</p>
            <h1>Personal projects hub</h1>
            <p>Manage your personal projects :</p> 
            <input type="button" onClick={GoToProject} value="MyHub" />
        </div>
    );
}
