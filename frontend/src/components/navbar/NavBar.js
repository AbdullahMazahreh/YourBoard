import React, { Fragment, useContext, useState } from "react";
import "./navbar.css";
import { Button, InputField } from "../Index";
import { context } from "../../context/ContextProvider";
import { useParams } from "react-router";
import axios from "axios";

function NavBar({ setDisplayUserSettings }) {
  const {
    boards,
    isDarkTheme,
    setReFetchBoardName,
    reFetchBoardName,
    setShowNewTaskPopUp,
  } = useContext(context);
  const { boardId } = useParams();
  const [showBoardNameEdit, setShowBoardNameEdit] = useState(false);

  const currentBoard = boards.find((ele) => ele._id === boardId);

  const [newBoardName, setNewBoardName] = useState(currentBoard?.name);

  const updateBoardName = async () => {
    try {
      await axios.patch(`http://localhost:3001/api/v1/boards/updateboard`, {
        boardId: boardId,
        name: newBoardName,
      });
      setReFetchBoardName(!reFetchBoardName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <header
        className={
          isDarkTheme ? "navbar-container dark-theme" : "navbar-container"
        }
      >
        <div
          className={
            isDarkTheme ? "logo-container dark-theme" : "logo-container"
          }
        >
          {showBoardNameEdit ? (
            <Fragment>
              <InputField
                placeHolder={currentBoard?.name}
                value={newBoardName}
                setValue={setNewBoardName}
              />
              <svg
                width="34"
                height="34"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  updateBoardName();
                  setShowBoardNameEdit(false);
                }}
              >
                <g clip-path="url(#clip0_262_7)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C9.48912 0 11.3968 0.790176 12.8033 2.1967C14.2098 3.60322 15 5.51088 15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15C5.51088 15 3.60322 14.2098 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5ZM7.072 10.71L11.39 5.312L10.61 4.688L6.928 9.289L4.32 7.116L3.68 7.884L7.072 10.711V10.71Z"
                    fill={isDarkTheme ? "white" : "black"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_262_7">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="34"
                height="34"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowBoardNameEdit(false)}
              >
                <g clip-path="url(#clip0_262_9)">
                  <path
                    d="M2.92996 17.0701C1.97486 16.1476 1.21303 15.0442 0.688943 13.8241C0.164853 12.6041 -0.111009 11.2919 -0.122547 9.96409C-0.134085 8.6363 0.118932 7.3195 0.62174 6.09054C1.12455 4.86158 1.86708 3.74506 2.80601 2.80613C3.74493 1.8672 4.86145 1.12467 6.09042 0.621863C7.31938 0.119054 8.63618 -0.133963 9.96397 -0.122425C11.2918 -0.110887 12.604 0.164975 13.824 0.689065C15.044 1.21316 16.1475 1.97498 17.07 2.93008C18.8915 4.8161 19.8995 7.34212 19.8767 9.96409C19.8539 12.5861 18.8022 15.0942 16.9481 16.9483C15.0941 18.8023 12.5859 19.854 9.96397 19.8768C7.342 19.8996 4.81598 18.8917 2.92996 17.0701ZM11.4 10.0001L14.23 7.17008L12.82 5.76008L9.99996 8.59008L7.16996 5.76008L5.75996 7.17008L8.58996 10.0001L5.75996 12.8301L7.16996 14.2401L9.99996 11.4101L12.83 14.2401L14.24 12.8301L11.41 10.0001H11.4Z"
                    fill={isDarkTheme ? "white" : "black"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_262_9">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Fragment>
          ) : (
            <Fragment>
              {currentBoard?.name}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowBoardNameEdit(true)}
              >
                <path
                  d="M7 17.0129L11.413 16.9979L21.045 7.4579C21.423 7.0799 21.631 6.5779 21.631 6.0439C21.631 5.5099 21.423 5.0079 21.045 4.6299L19.459 3.0439C18.703 2.2879 17.384 2.2919 16.634 3.0409L7 12.5829V17.0129ZM18.045 4.4579L19.634 6.0409L18.037 7.6229L16.451 6.0379L18.045 4.4579ZM9 13.4169L15.03 7.4439L16.616 9.0299L10.587 15.0009L9 15.0059V13.4169Z"
                  fill={isDarkTheme ? "white" : "black"}
                />
                <path
                  d="M5 21H19C20.103 21 21 20.103 21 19V10.332L19 12.332V19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21Z"
                  fill={isDarkTheme ? "white" : "black"}
                />
              </svg>
            </Fragment>
          )}
        </div>
        <div className="navbar-right-side">
          <Button
            placeholder="+ Add New Task"
            backgroundColor="#5953b1"
            color="white"
            onClickFunctionality={() => setShowNewTaskPopUp(true)}
          />
          <div
            className="user-menu-container"
            onClick={() => setDisplayUserSettings(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.25C8.41421 3.25 8.75 2.91421 8.75 2.5C8.75 2.08579 8.41421 1.75 8 1.75C7.58579 1.75 7.25 2.08579 7.25 2.5C7.25 2.91421 7.58579 3.25 8 3.25Z"
                stroke={isDarkTheme ? "white" : "#2c2c38"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
                stroke={isDarkTheme ? "white" : "#2c2c38"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14.25C8.41421 14.25 8.75 13.9142 8.75 13.5C8.75 13.0858 8.41421 12.75 8 12.75C7.58579 12.75 7.25 13.0858 7.25 13.5C7.25 13.9142 7.58579 14.25 8 14.25Z"
                stroke={isDarkTheme ? "white" : "#2c2c38"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default NavBar;
