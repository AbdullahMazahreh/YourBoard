import React, { Fragment } from "react";
import "./inputfield.css";

function InputField({ value, setValue, placeHolder }) {
  return (
    <Fragment>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-field-componenet"
        placeholder={placeHolder}
      />
    </Fragment>
  );
}

export default InputField;
