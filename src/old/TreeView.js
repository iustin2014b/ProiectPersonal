import TreeMenu from 'react-simple-tree-menu';
import { useState, createContext, useContext } from "react";
import { UserContext } from '../GlobalContext';


export const TreeView = (props) => {
    const dat = useContext(UserContext);
    //https://openbase.com/js/react-simple-tree-menu

    return (
        <div>
            <TreeMenu
                data={dat}
                onClickItem={({ key, label, ...props }) => {
                    this.navigate(props.url); // user defined prop
                }}
                initialActiveKey='first-level-node-1/second-level-node-1' // the path to the active node
                debounceTime={125}>
            </TreeMenu>
        </div>
    );
};