import React from "react";

function Loader({ size }) {
  return (
    <div className="loader_wrapper">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default Loader;