import React, { Fragment, useContext, useEffect, useState } from "react";
import "./onetask.css";
import { context } from "../../context/ContextProvider";
import axios from "axios";

function OneTask({ task }) {
  const { setClickedOnTask, isDarkTheme, reFetchSubTasks } =
    useContext(context);
  const [subTasks, setSubTasks] = useState([]);
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);

  const fetchTaskSubTasks = async () => {
    try {
      const subTasks = await axios.post(
        `http://localhost:3001/api/v1/subtask/gettasksubtasks`,
        {
          taskId: task._id,
        }
      );
      setSubTasks(subTasks.data.subTasks);
      const finished = subTasks.data.subTasks.filter(
        (ele) => ele.isFinished === true
      );
      setFinishedSubTasks(finished);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskSubTasks();
  }, [reFetchSubTasks]);

  return (
    <Fragment>
      <div
        className={
          isDarkTheme ? "onetask-container dark-theme" : "onetask-container"
        }
        onClick={() => setClickedOnTask(task)}
      >
        <div
          className={isDarkTheme ? "onetask-title dark-theme" : "onetask-title"}
        >
          {task.name}
        </div>
        <div className="onetask-progres">{`${finishedSubTasks.length} of ${task.subTasks.length} substasks`}</div>
      </div>
    </Fragment>
  );
}

export default OneTask;
