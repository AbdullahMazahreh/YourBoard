import React, { Fragment, useContext, useState } from "react";
import "./boardpage.css";
import {
  NavBar,
  SideBar,
  Collections,
  BlurBackGround,
  NewBoardPopUp,
  NewTaskPopUp,
  NewCollectionPopUp,
  TaskDetails,
  UserSettings,
  ProgressChart,
} from "../../components/Index";
import { context } from "../../context/ContextProvider";

function BoardPage() {
  const {
    boards,
    showNewTaskPopUp,
    showNewCollectionPopUp,
    setShowNewCollectionPopUp,
    clickedOnTask,
    isDarkTheme,
  } = useContext(context);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [displaySideBar, setDisplaySideBar] = useState(true);
  const [displayUserSettings, setDisplayUserSettings] = useState(false);
  const [displayChart, setDisplayChart] = useState(true);

  return (
    <Fragment>
      <div className="boardpage-container">
        {displaySideBar ? (
          <SideBar
            boards={boards}
            setDisplayPopUp={setDisplayPopUp}
            setDisplaySideBar={setDisplaySideBar}
          />
        ) : (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="open-sidebar"
            onClick={() => setDisplaySideBar(true)}
          >
            <path
              d="M32 2C15.432 2 2 15.432 2 32C2 48.568 15.432 62 32 62C48.568 62 62 48.568 62 32C62 15.432 48.568 2 32 2ZM33.693 48V37.428H15V27.143H33.693V16L49 32L33.693 48Z"
              fill={isDarkTheme ? "white" : "black"}
            />
          </svg>
        )}
        <div className="boardpage-content-container">
          <NavBar setDisplayUserSettings={setDisplayUserSettings} />
          <div
            className={
              isDarkTheme ? "chart-toggler dark-theme" : "chart-toggler"
            }
          >
            <div onClick={() => setDisplayChart(false)}>Board</div>
            <div onClick={() => setDisplayChart(true)}>Analytics</div>
          </div>
          {displayChart ? (
            <ProgressChart />
          ) : (
            <div
              className={
                isDarkTheme
                  ? "collections-container dark-theme"
                  : "collections-container"
              }
            >
              <Collections setDisplayUserSettings={setDisplayUserSettings} />
            </div>
          )}
        </div>
      </div>
      {displayPopUp ? (
        <Fragment>
          <BlurBackGround />
          <NewBoardPopUp setDisplayPopUp={setDisplayPopUp} />
        </Fragment>
      ) : null}
      {showNewTaskPopUp ? (
        <Fragment>
          <BlurBackGround />
          <NewTaskPopUp />
        </Fragment>
      ) : null}
      {showNewCollectionPopUp ? (
        <Fragment>
          <BlurBackGround />
          <NewCollectionPopUp
            setShowNewCollectionPopUp={setShowNewCollectionPopUp}
          />
        </Fragment>
      ) : null}
      {clickedOnTask ? (
        <Fragment>
          <BlurBackGround />
          <TaskDetails />
        </Fragment>
      ) : null}
      {displayUserSettings ? <UserSettings /> : null}
    </Fragment>
  );
}

export default BoardPage;
