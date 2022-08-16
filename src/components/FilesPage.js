import React, { useState, createContext } from "react";
import { FileUploadS } from './FileUploadS';

//import '../node_modules/react-simple-tree-menu/dist/main.css';
import ListGroup from 'react-simple-tree-menu';
import ListItem from 'react-simple-tree-menu';

import { Container, Row, Col } from 'react-bootstrap'  
import { FileTreeView } from './FileTreeView'
import { FileViewEdit } from './FileViewEdit'
//import { ProjectFileLst } from './ProjectFileLst'
import { UserContext, setDatContext } from './GlobalContext';
import { globContext } from './GlobalContext';
//import 'react-bootstrap/dist/css/bootstrap.min.css';  

//import fs from 'fs'

// const filenames = fs.readdirSync('content')
export const FilesPage = () => {
   const [dat, setDat] = useState([        { key: 'a', label: 'A', nodes: [] },        { key: 'b', label: 'B', nodes: [{ key: 'b1', label: 'B1', nodes: [] }, { key: 'b2', label: 'B2', nodes: [] }] },        { key: 'c', label: 'C', nodes: [] }    ]);
  const [glob, setGlob] = useState(false)
  
//https://www.javatpoint.com/react-bootstrap-grid-system
    let tst = 1
  return (
      <div>
          <UserContext.Provider value={dat}>
              <setDatContext.Provider value={setDat}>
                  <globContext.Provider value={{ glob, setGlob }}>
          <Container>
              <Row>
                  <Col className="bg-success p-2">
                  </Col>
                      </Row>

                      <Row>
                          <Col >
                              <FileUploadS />  
                          </Col>                         
                      </Row>
              <Row>
                  <Col >
                                  {glob ? <FileViewEdit /> : <FileTreeView />}                           
                  </Col>
                  <Col >
                      test
                  </Col>
              </Row>
                      </Container> 
              </globContext.Provider>   
              </setDatContext.Provider>   
          </UserContext.Provider>       
      </div>
  );
};


