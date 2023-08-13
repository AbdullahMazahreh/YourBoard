import React, { Fragment } from "react";
import "./button.css";

function Button({ placeholder, onClickFunctionality, backgroundColor, color }) {
  return (
    <Fragment>
      <button
        className="btn-large"
        onClick={onClickFunctionality}
        style={{ backgroundColor: backgroundColor, color: color }}
      >
        {placeholder}
      </button>
    </Fragment>
  );
}

export default Button;
