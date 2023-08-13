import React, { Fragment, useContext, useEffect, useState } from "react";
import "./taskdetails.css";
import { context } from "../../context/ContextProvider";
import axios from "axios";
import { OneSubTask } from "../Index";
import { useParams } from "react-router";

function TaskDetails() {
  const { boardId } = useParams();
  const [taskDetails, setTaskDetails] = useState({});
  const {
    setClickedOnTask,
    clickedOnTask,
    reFetchSubTasks,
    clickedOnCollection,
    reFetchCollectionTasks,
    setReFetchCollectionTasks,
  } = useContext(context);
  const [subTasks, setSubTasks] = useState([]);
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState("");

  const fetchTaskSubTasks = async () => {
    try {
      const subTasks = await axios.post(
        `http://localhost:3001/api/v1/subtask/gettasksubtasks`,
        {
          taskId: clickedOnTask._id,
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

  const fetchBoardStatuses = async () => {
    try {
      const statuses = await axios.post(
        "http://localhost:3001/api/v1/boards/getallstatuses",
        {
          boardId: boardId,
        }
      );
      setStatuses(statuses.data.taskGroupsToBeSend);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskCollection = async () => {
    try {
      if (status.length > 0) {
        await axios.post(
          "http://localhost:3001/api/v1/task/changetaskcollection",
          {
            taskId: clickedOnTask._id,
            newCollection: status,
            previousCollection: clickedOnCollection._id,
          }
        );
        setReFetchCollectionTasks(!reFetchCollectionTasks);
        setClickedOnTask(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTaskDetails(clickedOnTask);
  }, [clickedOnTask]);

  useEffect(() => {
    fetchTaskSubTasks();
  }, [reFetchSubTasks]);

  useEffect(() => {
    fetchBoardStatuses();
  }, []);

  useEffect(() => {
    updateTaskCollection();
  }, [status]);

  const displaySubTasks = subTasks.map((ele) => {
    return <OneSubTask subTask={ele} />;
  });

  return (
    <Fragment>
      <div className="task-details-container">
        <div className="task-details-title">{taskDetails.name}</div>
        <div className="task-details-description">
          {taskDetails.description}
        </div>
        <div className="task-details-subtasks-container">
          <div className="task-details-subtasks-progress">
            {`Subtasks ( ${finishedSubTasks.length} of ${subTasks.length} )`}
          </div>
          <div className="task-details-subtasks-tasks">{displaySubTasks}</div>
        </div>
        <div className="input-container">
          <div className="input-label">Status</div>
          <select
            className="status-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select New Status
            </option>
            {statuses.map((ele) => {
              return (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="close-container" onClick={() => setClickedOnTask(null)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_228_12)">
              <path
                d="M2.93002 17.0701C1.97492 16.1476 1.21309 15.0442 0.689004 13.8241C0.164914 12.6041 -0.110948 11.2919 -0.122486 9.96409C-0.134024 8.6363 0.118993 7.3195 0.621801 6.09054C1.12461 4.86158 1.86714 3.74506 2.80607 2.80613C3.745 1.8672 4.86151 1.12467 6.09048 0.621863C7.31944 0.119054 8.63624 -0.133963 9.96403 -0.122425C11.2918 -0.110887 12.604 0.164975 13.8241 0.689065C15.0441 1.21316 16.1476 1.97498 17.07 2.93008C18.8916 4.8161 19.8995 7.34212 19.8768 9.96409C19.854 12.5861 18.8023 15.0942 16.9482 16.9483C15.0941 18.8023 12.586 19.854 9.96403 19.8768C7.34206 19.8996 4.81604 18.8917 2.93002 17.0701ZM11.4 10.0001L14.23 7.17008L12.82 5.76008L10 8.59008L7.17002 5.76008L5.76002 7.17008L8.59002 10.0001L5.76002 12.8301L7.17002 14.2401L10 11.4101L12.83 14.2401L14.24 12.8301L11.41 10.0001H11.4Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_228_12">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </Fragment>
  );
}

export default TaskDetails;
