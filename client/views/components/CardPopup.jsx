import React from "react";
import { Button, Popup } from "semantic-ui-react";

function CardPopup(props) {
  return (
    <div>
      <Popup
        content={props.content}
        on="click"
        basic
        trigger={props.trigger}
      />
    </div>
  );
}

export default CardPopup;
