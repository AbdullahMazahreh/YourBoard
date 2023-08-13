import React, { Fragment, useContext, useEffect, useState } from "react";
import "./onesubtask.css";
import axios from "axios";
import { context } from "../../context/ContextProvider";

function OneSubTask({ subTask }) {
  const [checked, setChecked] = useState(subTask.isFinished);
  const { setReFetchSubTasks, reFetchSubTasks } = useContext(context);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const updateSubTask = async () => {
    try {
      await axios.patch(`http://localhost:3001/api/v1/subtask/updatesubtask`, {
        isFinished: checked,
        subTaskId: subTask._id,
      });
      setReFetchSubTasks(!reFetchSubTasks)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateSubTask();
  }, [checked]);

  return (
    <Fragment>
      <div className="one-sub-task-container">
        <input
          type="checkbox"
          value={subTask._id}
          className="subtask-checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <label>{subTask.name}</label>
      </div>
    </Fragment>
  );
}

export default OneSubTask;
