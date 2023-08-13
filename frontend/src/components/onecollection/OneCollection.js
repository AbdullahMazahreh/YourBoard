import React, { Fragment, useContext, useEffect, useState } from "react";
import "./onecolection.css";
import { OneTask } from "../Index";
import { Button } from "../Index";
import axios from "axios";
import { context } from "../../context/ContextProvider";

function OneCollection({ collection }) {
  const [tasks, setTasks] = useState([]);
  const {
    setShowNewTaskPopUp,
    reFetchCollectionTasks,
    isDarkTheme,
    setClickedOnCollection,
  } = useContext(context);

  const fetchOneCollectionTasks = async () => {
    try {
      const tasks = await axios.post(
        `http://localhost:3001/api/v1/task/getcollectiontasks`,
        {
          tasksGroupId: collection._id,
        }
      );
      setTasks(tasks.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOneCollectionTasks();
  }, [reFetchCollectionTasks]);

  const displayTasks = tasks.map((ele) => {
    return <OneTask task={ele} key={ele._id} />;
  });

  return (
    <Fragment>
      <div
        className="one-collection-container"
        onClick={() => setClickedOnCollection(collection)}
      >
        <div className="one-collection-title">
          <div
            className="one-collection-title-color"
            style={{ backgroundColor: `${collection.color}` }}
          ></div>
          <div
            className={
              isDarkTheme
                ? "one-collection-title-name dark-theme"
                : "one-collection-title-name"
            }
          >
            {collection.name} ({collection.tasks.length})
          </div>
        </div>
        <div className="one-collection-tasks-container">
          {collection.tasks.length < 1 ? (
            <div>
              <Button
                placeholder="+ Add New Task"
                onClickFunctionality={() => setShowNewTaskPopUp(true)}
                backgroundColor="#5953b1"
                color="white"
              />
            </div>
          ) : (
            <Fragment>{displayTasks}</Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OneCollection;
