import React, { Fragment, useState } from "react";
import "./newsubtask.css";

function NewSubTask({
  placeHolder,
  subTasksObject,
  setSubTasksObject,
  ownObj,
  refresh,
  setRefresh,
}) {
  const [inputValue, setInputValue] = useState(ownObj.value);

  const handleSubTaskDelete = () => {
    const obj = { ...subTasksObject };
    const objToDeleteName = "subTask".concat(ownObj.id);
    delete obj[objToDeleteName];
    setSubTasksObject(obj);
    setRefresh(!refresh);
  };

  return (
    <Fragment>
      <div className="newsubtask-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            ownObj.setValue(e.target.value);
            setInputValue(e.target.value);
          }}
          className="input-field-componenet"
          placeholder={placeHolder}
        />
        <svg
          width="36"
          height="36"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSubTaskDelete}
        >
          <path
            d="M195.2 195.2C207.202 183.202 223.477 176.462 240.448 176.462C257.419 176.462 273.694 183.202 285.696 195.2L512 421.504L738.304 195.2C750.375 183.542 766.541 177.091 783.322 177.237C800.102 177.383 816.154 184.113 828.02 195.98C839.887 207.846 846.617 223.898 846.763 240.678C846.909 257.459 840.458 273.625 828.8 285.696L602.496 512L828.8 738.304C840.458 750.375 846.909 766.541 846.763 783.322C846.617 800.102 839.887 816.154 828.02 828.02C816.154 839.887 800.102 846.617 783.322 846.763C766.541 846.909 750.375 840.458 738.304 828.8L512 602.496L285.696 828.8C273.625 840.458 257.459 846.909 240.678 846.763C223.898 846.617 207.846 839.887 195.98 828.02C184.113 816.154 177.383 800.102 177.237 783.322C177.091 766.541 183.542 750.375 195.2 738.304L421.504 512L195.2 285.696C183.202 273.694 176.462 257.419 176.462 240.448C176.462 223.477 183.202 207.202 195.2 195.2Z"
            fill="rgb(111, 111, 111)"
          />
        </svg>
      </div>
    </Fragment>
  );
}

export default NewSubTask;
