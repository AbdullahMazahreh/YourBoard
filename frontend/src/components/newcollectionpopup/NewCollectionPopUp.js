import React, { Fragment, useContext, useState } from "react";
import "./newcollectionpopup.css";
import { Button, InputField } from "../Index";
import { useParams } from "react-router";
import axios from "axios";
import { context } from "../../context/ContextProvider";

function NewCollectionPopUp({ setShowNewCollectionPopUp }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#13bf36");
  const { boardId } = useParams();
  const { reFetchBoardCollections, setReFetchBoardCollections } =
    useContext(context);

  const addNewCollection = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/v1/tasksgroup/newcollection`,
        {
          boardId: boardId,
          name: name,
          color: color,
        }
      );
      setReFetchBoardCollections(!reFetchBoardCollections);
      setShowNewCollectionPopUp(false);
    } catch (err) {
      console.log(err);
    }
  };

  const colors = [
    "#13bf36",
    "#806fe3",
    "#00FFFF",
    "#ff4040",
    "#ff80ed",
    "#081d8d",
    "#ff7f00",
    "#ffd700",
  ];

  const displayColors = colors.map((ele) => {
    return (
      <div
        key={ele}
        className={
          color === ele
            ? "onecolor-big-container active"
            : "onecolor-big-container"
        }
        onClick={() => setColor(ele)}
      >
        <div
          className="onecolor-container"
          style={{ backgroundColor: ele }}
        ></div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className="newcollectionpopup-container">
        <div className="newcollectionpopup-title">Add New Collection</div>
        <InputField
          value={name}
          setValue={setName}
          placeHolder="New Collection Name"
        />
        <div className="colors-container">{displayColors}</div>
        <div
          className="close-container"
          onClick={() => setShowNewCollectionPopUp(false)}
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
        <Button
          placeholder="Add New Collection"
          onClickFunctionality={addNewCollection}
          backgroundColor="#5953b1"
          color="white"
        />
      </div>
    </Fragment>
  );
}

export default NewCollectionPopUp;
