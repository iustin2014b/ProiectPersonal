
import React, { useState } from "react";
import axios from "axios";
//https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
export const Dwn1 = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        let value = URL.createObjectURL(e.target.files[0]);

        setFileName(e.target.files[0].name);
    };
    //https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
    const uploadFile = async (e) => {
        let t = 1;
      //  const response = await fetch('https://your-website.com/your-image.jpg' + 'test-download.jpg', {
        const response = await fetch('https://localhost:7156/api/Upload/path/1.txt' , {

        method: 'GET',
            headers: {
                'Content-Type': 'plain/text',
            },
        })
        const data = await response.text();
       // response = response.blob();
     //   const url = window.URL.createObjectURL(response);
     //   const link = document.createElement('a');
      //  link.href = url;
    }

    return (
        <>
            <input type="file" onChange={saveFile} />
            <input type="button" value="upload" onClick={uploadFile} />
        </>
    );
};