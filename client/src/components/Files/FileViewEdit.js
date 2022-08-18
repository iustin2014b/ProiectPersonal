//import TreeMenu from 'react-simple-tree-menu';
import { useState, createContext, useContext, useEffect } from "react";
import { globContext, setDatContext, UserContext } from '../Global/GlobalContext';

export const FileViewEdit = (props) => {

    const [text, setText] = useState("test")
    const glb = useContext(globContext); 
   function onChgD(){
   
    }
   // useEffect(onChgD, dat);
    
    function btnUp() {
        glb.setGlob(false)
    }
    function btnSv() {
        let st=document.getElementById("txta").value
        setText(st)
   
        

    }
  

        return (
      
               
                <div>
                    <h6>
                    <input type="button" onClick={btnUp} value="dir" />
                    <input type="button" onClick={btnSv} value="save" />
                    {/*<input type="text" value="dir" style={{ width: "800px" }, { height: "400px" }} />*/}
                    <textarea id="txta" name="w3review" rows="5" cols="50">
                        {text}
                    </textarea>
                        
                    </h6>
                </div>
              

        );
    }

