// import React from "react";

// function ProductRow(props) {

// //   function STOCK(batch) {
// //     if (batch === "All") {
// //       var sum = 0;
// //       for (let i = 0; i < props.objs.length; i++) {
// //         sum += props.objs[i].stock;
// //       }
// //       return sum;
// //     } else {
// //       for (let i = 0; i < props.objs.length; i++) {
// //         if (props.objs[i].batch === batch) {
// //           return props.objs[i].stock;
// //         }
// //       }
// //     }
// //   }
// //   function RATE(batch) {
// //     if (batch === "All") {
// //       var max = 0;
// //       for (let i = 0; i < props.objs.length; i++) {
// //         if (props.objs[i].rate > max) {
// //           max = props.objs[i].rate;
// //         }
// //       }
// //       return max;
// //     } else {
// //       for (let i = 0; i < props.objs.length; i++) {
// //         if (props.objs[i].batch === batch) {
// //           return props.objs[i].rate;
// //         }
// //       }
// //     }
// //   }
// //   function MRP(batch) {
// //     if (batch === "All") {
// //       var max = 0;
// //       for (let i = 0; i < props.objs.length; i++) {
// //         if (props.objs[i].mrp > max) {
// //           max = props.objs[i].mrp;
// //         }
// //       }
// //       return max;
// //     } else {
// //       for (let i = 0; i < props.objs.length; i++) {
// //         if (props.objs[i].batch === batch) {
// //           return props.objs[i].mrp;
// //         }
// //       }
// //     }
// //   }

//   return (
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td>{props.row.name}</td>
//             <td><select>
//                 {props.row.batch.map(batchItem=>{
//                     return <option key={batchItem }>{batchItem}</option>
//                 })}
//                 </select></td>
//             <td>{props.row.stock}</td>
//             <td>{props.row.deal}</td>
//             <td>{props.row.free}</td>
//             <td>{props.row.mrp}</td>
//             <td>{props.row.rate}</td>
//             <td>{props.row.exp}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default ProductRow;
