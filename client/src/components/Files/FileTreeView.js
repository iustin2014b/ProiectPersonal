//import TreeMenu from 'react-simple-tree-menu';
import { useState, createContext, useContext, useEffect ,useRef} from "react";
import { ListGroup } from "react-bootstrap";
import { globContext, setDatContext, UserContext } from '../Global/GlobalContext';
import { useApiProjectFileLst1 } from '../ApiCall';
//let MY_LIST = [];

//https://www.freakyjolly.com/react-filter-list-example-search-filter-dynamic-list-items/
export const FileTreeView = (props) => {

      
        const [search, setSearch] = useState("");
        const [selected, setSelected] = useState({});

    const dat = useContext(UserContext);
    const [mlist, setMlist] = useState(dat);
    const [plist, setPlist] = useState(dat);
    const [selectedList, setSelectedList] = useState("");
    const glb = useContext(globContext); 

    function OnChgD() {
        useApiProjectFileLst1()
        setMlist(dat)
    }
    useEffect(OnChgD, dat);
    function onSelectItem(e, item) {
        if (e.detail == 1) {
    console.log(selectedList)
            return
        }
            setSelected(item);
           // const res = dat.find(myf);

           // function myf(value,index)
//            {
//                console.log(item.key)
//                return item.key===value.key
//            }
            const fndf = 0
           let fndd = dat[0]; 
            const fnds = item.key
            function fnd(datt) {
                for (let v in datt) {
                    if (fnds === datt[v].key) {
                       // fndf = 1
                        fndd = datt[v]
                    }
                    fnd(datt[v].nodes)
                }
            }
            fnd(dat)
            setMlist(fndd.nodes)
        setPlist(fndd.key)
        setSelectedList(fndd.key)
        console.log(selectedList)
    }
    function btnUp() {
        let fndd = plist;
        const fnds = plist
        function fnd(datt ,par) {
            for (let v in datt) {
                if (fnds === datt[v].key) {
                    fndd = par
                }
                fnd(datt[v].nodes,datt[v])
            }
        }
        fnd(dat)
        setMlist(fndd.nodes)
        setPlist(fndd.key)
        setSelectedList(fndd.key)
    }
 
    function btn1() {
        glb.setGlob(true)
    }
       

        return (
            <div>
               
                <div>
                    <h6>
                       {/* Selected Item : {selected.key} {selected.label}*/}
                        <input type="button" onClick={btnUp} value="..." />
                        <input type="button" onClick={btn1} value="fis" />
                    </h6>
                </div>
                <ul className="list-group">
                    {mlist.map((item, key) => 
                        <li
                            className="list-group-item"
                            key={key}
                            style={item.key === selectedList ? { color: "red" } : { color: "green" }}
                            onClick={(e) => { onSelectItem(e, item); setSelectedList(item.key) }}
                        >
                             {item.label}
                        </li>
                    )}
                </ul>
            </div>
        );
    }

