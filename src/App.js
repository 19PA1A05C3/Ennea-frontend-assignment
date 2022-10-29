import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ShowTable from "./components/ShowTable"

function App() {
  const [data,setData]=useState([]);
  function getUploadedData(convertedData){
    setData(convertedData);
  }
  return (
    <div>
      <FileUpload getUploadedData={getUploadedData}/>
      <ShowTable Data={data}/>
    </div>
  );
}

export default App;
