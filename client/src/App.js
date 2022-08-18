import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Global/Layout';
import './custom.css';
import { genContext } from './components/Global/GlobalContext';
import { useState, createContext } from "react";


export default function App() {
    const [userName, setUserName] = useState("");// ( "aa");
    const [projectCrt, setProjectCrt] = useState("")
   // https://progressivewebninja.com/how-to-pass-multiple-values-in-react-context/#:~:text=To%20pass%20multiple%20values%20in%20React%20Context%2C%20we%20can%20use,look%20at%20a%20simple%20example.
 
    return (
      <genContext.Provider value={{ userName, setUserName,projectCrt,setProjectCrt }}>
        <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
          </Layout>
      </genContext.Provider>   
    );
}
