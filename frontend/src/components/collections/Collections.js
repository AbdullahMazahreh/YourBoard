import React, { Fragment, useContext, useEffect, useState } from "react";
import "./collections.css";
import { OneCollection } from "../Index";
import { useParams } from "react-router";
import axios from "axios";
import { context } from "../../context/ContextProvider";

function Collections({ setDisplayUserSettings }) {
  const { boardId } = useParams();
  const { reFetchBoardCollections, setShowNewCollectionPopUp } =
    useContext(context);
  const [collections, setCollections] = useState([]);

  const fetchBoardCollections = async () => {
    try {
      const collections = await axios.post(
        `http://localhost:3001/api/v1/tasksgroup/getboardcollections`,
        {
          boardId: boardId,
        }
      );
      setCollections(collections.data.collections);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBoardCollections();
  }, [reFetchBoardCollections]);

  const displayCollections = collections.map((ele) => {
    return <OneCollection collection={ele} key={ele._id} />;
  });

  return (
    <Fragment>
      <div className="boards-container" onClick={() => setDisplayUserSettings(false)}>
        {displayCollections}
        <div
          className="newboard-collection-container"
          onClick={() => setShowNewCollectionPopUp(true)}
        >
          + Add New Collection
        </div>
      </div>
    </Fragment>
  );
}

export default Collections;
