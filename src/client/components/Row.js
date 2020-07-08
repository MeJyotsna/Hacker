import React from "react";

const RowComponent = (props) => {
  console.log("props", props);
  return (
    <tr>
      <td> {props.data.id}</td>
      <td>djhshb</td>
      <td>djhshb</td>
      <td>djhshb</td>
    </tr>
  );
};
export default RowComponent;
