import React, { Fragment, useContext, useEffect, useState } from "react";
import "./newtaskpopup.css";
import { Button, InputField, NewSubTask } from "../Index";
import axios from "axios";
import { useParams } from "react-router";
import { context } from "../../context/ContextProvider";

function NewTaskPopUp() {
  const [subTasksArray, setSubTasksArray] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [subTasksObject, setSubTasksObject] = useState({
    subTask1: {
      placeholder: "e.g. Make coffee",
      value: "",
      id: 1,
      setValue: function (newValue) {
        this.value = newValue;
      },
    },
    subTask2: {
      placeholder: "e.g. Drink coffee and smile",
      value: "",
      id: 2,
      setValue: function (newValue) {
        this.value = newValue;
      },
    },
  });
  const [refresh, setRefresh] = useState(false);
  const { boardId } = useParams();
  const {
    setReFetchCollectionTasks,
    reFetchCollectionTasks,
    setShowNewTaskPopUp,
  } = useContext(context);

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

  useEffect(() => {
    const arr = Object.values(subTasksObject);
    setSubTasksArray(arr);
  }, [refresh]);

  useEffect(() => {
    fetchBoardStatuses();
  }, []);

  const displaySubTasks = subTasksArray.map((ele) => {
    return (
      <NewSubTask
        placeHolder={ele.placeholder}
        key={ele.id}
        subTasksObject={subTasksObject}
        setSubTasksObject={setSubTasksObject}
        ownObj={ele}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    );
  });

  const hangleAddNewSubTask = () => {
    let id = Object.keys(subTasksObject).length;

    for (let ele in subTasksObject) {
      if (subTasksObject[ele].id === id) {
        id++;
      }
    }

    const newSubTask = {
      placeholder: "New Subtask",
      value: "",
      id: id,
      setValue: function (newValue) {
        this.value = newValue;
      },
    };

    const newSubTasks = { ...subTasksObject, newSubTask };

    const newSubTaskName = "subTask".concat(id);

    newSubTasks[newSubTaskName] = newSubTasks.newSubTask;

    delete newSubTasks.newSubTask;

    setSubTasksObject(newSubTasks);
    setRefresh(!refresh);
  };

  const handleAddNewTask = async () => {
    if (title.length > 0 && description.length > 0) {
      try {
        let subTasksTobePosted = subTasksArray.filter(
          (ele) => ele.value.length > 0
        );
        subTasksTobePosted = subTasksTobePosted.map((ele) => ({
          name: ele.value,
        }));

        const newTask = {
          name: title,
          description: description,
          tasksGroupId: status,
          subTasksTobePosted: subTasksTobePosted,
        };
        await axios.post("http://localhost:3001/api/v1/task/newtask", newTask);
        setReFetchCollectionTasks(!reFetchCollectionTasks);
        setShowNewTaskPopUp(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
    
  return (
    <Fragment>
      <div className="newtaskpopup-container">
        <div className="newtaskpopup-title">Add New Task</div>
        <div className="input-container">
          <div className="input-label">Title</div>
          <InputField
            placeHolder="e.g. Take coffee break"
            value={title}
            setValue={setTitle}
          />
        </div>
        <div className="input-container">
          <div className="input-label">Description</div>
          <textarea
            className="input-field-componenet text-area"
            placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-container">
          <div className="input-label">Subtasks</div>
          {displaySubTasks}
          <Button
            placeholder="Add New SubTask"
            backgroundColor="white"
            color="#5953b1"
            onClickFunctionality={hangleAddNewSubTask}
          />
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
            {statuses.map((ele) => {
              return (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>
        <Button
          placeholder="Create Task"
          backgroundColor="#5953b1"
          color="white"
          onClickFunctionality={handleAddNewTask}
        />
        <div
          className="close-container"
          onClick={() => setShowNewTaskPopUp(false)}
        >
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

export default NewTaskPopUp;
