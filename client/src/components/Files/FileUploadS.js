import React, { useState } from "react";
import axios from "axios";
//import fs from 'fs'

// const filenames = fs.readdirSync('content')
export const FileUploadS = () => {
    const [file, setFile] = useState();
    const [files, setFiles] = useState();
  const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        setFiles(chosenFiles);
   // console.log(e.target.files[0]);
  //  setFile(e.target.files[0]);
 //   setFileName(e.target.files[0].name);
  };

    const uploadFile = async (e) => {

    console.log(files);
        const formData = new FormData();
        files.map((file, index) => {
            formData.append(`file${index}`, file);
        });
  //  formData.append("formFile", file);
  //  formData.append("fileName", fileName);
    try {
      const res = await axios.post("https://localhost:7156/api/Upload", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <input type="file" multiple onChange={saveFile} webkitdirectory="" />
      <input type="button" value="upload" onClick={uploadFile} />
    </>
  );
};
