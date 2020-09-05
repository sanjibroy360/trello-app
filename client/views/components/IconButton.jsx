import React from "react";

function IconButton({ children }) {
  return (
    <div>
      <nobr>
        <button className="icon_btn">{children}</button>
      </nobr>
    </div>
  );
}

export default IconButton;
