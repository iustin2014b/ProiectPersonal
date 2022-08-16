import axios from "axios";
import { useState, createContext, useContext } from "react";
import { setDatContext ,UserContext} from './GlobalContext';
import { genContext } from './GlobalContext'


export const useApiProjectFileLst = async () => {
    //let res = await
    //const setdat = useContext(setDatContext);
    let data 
    let res = await axios.get("https://localhost:7156/api/Upload/7");
     data = res.data;
   
   // const response = await fetch("https://localhost:7156/api/Upload/7");
  //  const data = await response.json();

   // axios.get("https://localhost:7156/api/Upload/7").then(resp => {
   //     console.log(resp.data);
   //      data= resp.data;
 //   });
    //setDatContext(data)
    console.log(data);
    return [ data ]
}
export const useApiProjectFileLst1 = async () => {
    // const [dat, setDat] = useState([])
    const dat = useContext(UserContext);
    const setdat = useContext(setDatContext);

    // const [data] = useApiProjectFileLst()
    let res = await axios.get("https://localhost:7156/api/Upload/7");
    const data = res.data;
    //  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");
    //       const   [data] = useFetch("https://localhost:7156/api/Upload/7");
    let ii = 0;
    setdat(data)

    //https://openbase.com/js/react-simple-tree-menu

    return 
}
export const useApiSearchProject = (serachedProject) => {
    let data
  //  let res = await axios.get("https://localhost:7156/api/Upload/searchProject/"+serachedProject);
   // data = res.data;

     //const response = await fetch("https://localhost:7156/api/Upload/7");
     // data = await response.json();

     axios.get("https://localhost:7156/api/Upload/7").then(resp => {
         console.log(resp.data);
          data= resp.data;
       });
    //setDatContext(data)
    console.log(data);
    return [data]
}
export const useApiGetAllProjects = async () => {
    let data
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext);
    //  let res = await axios.get("https://localhost:7156/api/Upload/"+userName+"allProjects/");
    // data = res.data;

    const response = await fetch("https://localhost:7156/api/Upload/" + userName + "allProjects/");
     data = await response.json();

  //  axios.get("https://localhost:7156/api/Upload/7").then(resp => {
  //      console.log(resp.data);
  //      data = resp.data;
  //  });
    //setDatContext(data)
    console.log(data);
    return [data]
}

