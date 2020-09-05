import React from "react";

function Avatar(props) {
  let name = props.children;
  let arr = name.split(" ");
  if (arr.length > 1) {
    name = arr[0][0] + arr[1][0];
  } else {
    name = name.slice(0, 2);
  }

  return (
    <div>
      <div id="avatar">{name}</div>
    </div>
  );
}

export default Avatar;
