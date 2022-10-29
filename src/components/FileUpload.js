import React, { useState, useEffect } from "react";
import "./FileUpload.css";
import { ExcelRenderer } from "react-excel-renderer";
function FileUpload(props) {
  const [fileObject, setFileObject] = useState();
  const [data, setData] = useState([]);
  function fileUploadHandler(event) {
    // console.log(event.target.files[0]);
    // console.log("File Uploaded");
    setFileObject(event.target.files[0]);
  }
  const getJsDateFromExcel = excelDate => {
    return new Date((excelDate - (25567+2)) * 86400 * 1000);
};
  function dataSubmitHandler(event){
    props.getUploadedData(data);

  }
  useEffect(() => {
    
    if (fileObject) {
      ExcelRenderer(fileObject, (err, resp) => {
        if (err) {
          console.log("error");
        } else {
          const modifyData = resp.rows?.slice(1)?.map((itm, index) => ({
            "key":index,
            "name": itm[1] || "",
            "batch": itm[2] || "",
            "stock": itm[3] || "",
            "deal": itm[4] || 0,
            "free": itm[5] || 0,
            "mrp": itm[6] || "",
            "rate": itm[7] || "",
            "exp": getJsDateFromExcel(itm[8])|| "",
            
          }));
          setData(modifyData);
        }
      });
    }
  }, [fileObject]);

  return (
    <div className="container">
      <div className="label">
        <label>Upload Excel File</label>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="file"
            id="input"
            accept=".xlx,.xlsx,.csv"
            onChange={fileUploadHandler}
          />
          <input id="parse" type="submit" value="Parse Data" onClick={dataSubmitHandler}/>
        </div>
      </div>
    </div>
  );
}
export default FileUpload;
