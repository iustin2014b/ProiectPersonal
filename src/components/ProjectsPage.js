import { useContext,useState,useEffect } from 'react'
import { genContext } from './GlobalContext'
//import { useApiGetAllProjects } from './ApiCall'

export const ProjectsPage = () => {
    const [lstProj, setLstProj] = useState([{ name: "dumy", Info: "i1" }, { name: "dumy2", Info: "i2" }] )
    const { userName, setUserName, projectCrt, setProjectCrt } = useContext(genContext)
    const LoadProjects = () => {
        const resp = useApiGetAllProjects();
      //  if (resp!= undefined)
      //      setLstProj(resp);
    }

    useEffect(LoadProjects, userName);

    const useApiGetAllProjects = async () => {
        let data
     
        //  let res = await axios.get("https://localhost:7156/api/Upload/"+userName+"allProjects/");
        // data = res.data;

        const response = await fetch("https://localhost:7156/api/Upload/" + "ListProjects/" + userName);
        data = await response.json();

        //  axios.get("https://localhost:7156/api/Upload/7").then(resp => {
        //      console.log(resp.data);
        //      data = resp.data;
        //  });
        //setDatContext(data)
        console.log(data);
       // if (data.length()>0)
            setLstProj(data);
      
    }
    const selectItem = () => {

    }
    const addProject = () => {

    }
    return (
        <div>
            <input type="button" onClick={addProject} value="Add" />
            <ul className="list-group">
                {lstProj.map((item, key) =>
                    <li
                        className="list-group-item"
                        key={key}
                        onClick={(e) => { selectItem(e, item) }}
                    >
                        {item.name}
                    </li>
                )}
            </ul>
           
        </div>
        )

}