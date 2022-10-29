import React, { useState } from "react";
import "./ShowTable.css";
import "core-js/actual/array/group-by";
import _ from "lodash";

function ShowTable(props) {
  const [query, setQuery] = useState("");
  const [outputArr, setOutputArr] = useState([]);
  const [isBatchSelected, setIsBatchSelected] = useState(false);
  function searchHandler(event) {
    setQuery(event.target.value);
  }

  // const copy = props.Data.filter((item) =>
  //   item.name.toLowerCase().includes(query)
  // ).map((item) => {
  //   return (
  //     <tr key={item.key}>
  //       <td>{item.name}</td>
  //       <td>{item.batch}</td>
  //       <td>{item.stock}</td>
  //       <td>{item.deal}</td>
  //       <td>{item.free}</td>
  //       <td>{item.mrp}</td>
  //       <td>{item.rate}</td>
  //       <td>{item.exp}</td>
  //     </tr>
  //   );
  // });
  // console.log(props.Data);
  const batchDropdownHandler = (event) => {
    const selectedBatch = event.target.value;
    // console.log(selectedBatch);
    if (selectedBatch !== "All") {
      const filteredArr = props.Data.filter((item) => {
        return item.batch == selectedBatch;
      });
      setIsBatchSelected(true);
      setOutputArr(filteredArr);
    }
  };

  const groupedArr = _(props.Data)
    .groupBy("name")
    .map((objs, key) => {
      const filteredBatches = objs.filter((obj) => {
        return obj["name"] === key;
      });
      const groupedBatches = ["All"];
      for (const tempItem of filteredBatches) {
        groupedBatches.push(tempItem["batch"]);
      }
      const batches = groupedBatches.filter(
        (item, i, ar) => ar.indexOf(item) === i
      );
      const numerator = parseInt(_.minBy(objs, "free").free);
      let denominator = parseInt(_.maxBy(objs, "deal").deal);
      denominator = denominator === 0 ? 1 : denominator;
      let ratio = (numerator / denominator).toFixed(2);
      ratio = ratio === parseInt(ratio) ? parseInt(ratio) : ratio;

      return {
        name: key,
        stock: _.sumBy(objs, "stock"),
        mrp: _.maxBy(objs, "mrp").mrp,
        rate: _.maxBy(objs, "rate").rate,
        exp: _.minBy(objs, "exp").exp,
        batch: batches,
        free: ratio,
        deal: ratio,
      };
    })
    .value();
  const searchedDataArr = groupedArr.filter((item) => {
    return item.name.toLowerCase().includes(query);
  });
  function goBackHandler() {
    setIsBatchSelected(false);
  }
  return (
    <div>
      {isBatchSelected && <button onClick={goBackHandler}>Back</button>}
      {groupedArr.length !== 0 && (
        <div className="table-container">
          <input
            className="search"
            type="text"
            placeholder="Search by name"
            onChange={searchHandler}
            value={query}
          />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Stock</th>
                <th>Deal</th>
                <th>Free</th>
                <th>MRP</th>
                <th>Rate</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody>
              {!isBatchSelected &&
                searchedDataArr.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                      <select onChange={batchDropdownHandler}>
                        {item.batch.map((batchId) => {
                          return <option key={batchId}>{batchId}</option>;
                        })}
                      </select>
                    </td>

                    <td>{item.stock}</td>
                    <td>{item.deal}</td>
                    <td>{item.free}</td>
                    <td>{item.mrp}</td>
                    <td>{item.rate}</td>
                    <td>{item.exp.getDate()+"/"+(item.exp.getMonth()+1)+"/"+item.exp.getFullYear()}</td>
                  </tr>
                ))}
                {!isBatchSelected && searchedDataArr.length===0 && <div className="no-results"><p>No results found</p></div>}
              
              {isBatchSelected && 
                outputArr.map((item,index) => {
                  index=index+1;
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.batch}</td>
                      <td>{item.stock}</td>
                      <td>{item.deal}</td>
                      <td>{item.free}</td>
                      <td>{item.mrp}</td>
                      <td>{item.rate}</td>
                      <td>{item.exp.getDate()+"/"+(item.exp.getMonth()+1)+"/"+item.exp.getFullYear()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          
        </div>
      )}
      {query && groupedArr.length === 0 && (
        <div>
          <input
            type="text"
            placeholder="Search by name"
            onChange={searchHandler}
            value={query}
          />
          <p>No results found</p>
        </div>
      )}
    </div>
  );
}

export default ShowTable;
