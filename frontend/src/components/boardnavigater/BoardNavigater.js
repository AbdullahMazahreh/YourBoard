import React, { Fragment, useContext, useEffect, useState } from "react";
import "./boardnavigater.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { context } from "../../context/ContextProvider";

function BoardNavigater({ board }) {
  const { boardId } = useParams();
  const { setReFetchBoardCollections, reFetchBoardCollections, isDarkTheme } =
    useContext(context);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(boardId === board._id);
  }, [boardId]);

  return (
    <Fragment>
      <Link to={`/yourboard/${board._id}`}>
        <div
          onClick={() => setReFetchBoardCollections(!reFetchBoardCollections)}
          className={
            isActive
              ? "board-navigater-container active"
              : "board-navigater-container"
          }
          style={{ color: !isDarkTheme ? "#172b4d" : "white" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6.75C3 5.75544 3.39509 4.80161 4.09835 4.09835C4.80161 3.39509 5.75544 3 6.75 3H21.25C22.2446 3 23.1984 3.39509 23.9017 4.09835C24.6049 4.80161 25 5.75544 25 6.75V21.25C25 22.2446 24.6049 23.1984 23.9017 23.9017C23.1984 24.6049 22.2446 25 21.25 25H6.75C5.75544 25 4.80161 24.6049 4.09835 23.9017C3.39509 23.1984 3 22.2446 3 21.25V6.75ZM4.5 14.5V21.25C4.5 21.8467 4.73705 22.419 5.15901 22.841C5.58097 23.2629 6.15326 23.5 6.75 23.5H16V14.5H4.5ZM16 13V4.5H6.75C6.15326 4.5 5.58097 4.73705 5.15901 5.15901C4.73705 5.58097 4.5 6.15326 4.5 6.75V13H16ZM21.25 23.5C21.8467 23.5 22.419 23.2629 22.841 22.841C23.2629 22.419 23.5 21.8467 23.5 21.25V18H17.5V23.5H21.25ZM23.5 16.5V11.5H17.5V16.5H23.5ZM17.5 4.5V10H23.5V6.75C23.5 6.15326 23.2629 5.58097 22.841 5.15901C22.419 4.73705 21.8467 4.5 21.25 4.5H17.5Z"
              fill={isDarkTheme ? "white" : "#172b4d"}
            />
          </svg>
          {board.name}
        </div>
      </Link>
    </Fragment>
  );
}

export default BoardNavigater;
