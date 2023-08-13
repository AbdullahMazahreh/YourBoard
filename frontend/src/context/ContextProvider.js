import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const context = createContext();

function ContextProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentUserToken, setCurrentUserToken] = useState(null);
  const [boards, setBoards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [reFetchBoardCollections, setReFetchBoardCollections] = useState(false);
  const [reFetchUserBoards, setReFetchUserBoards] = useState(false);
  const [showNewTaskPopUp, setShowNewTaskPopUp] = useState(false);
  const [showNewCollectionPopUp, setShowNewCollectionPopUp] = useState(false);
  const [reFetchCollectionTasks, setReFetchCollectionTasks] = useState(false);
  const [clickedOnTask, setClickedOnTask] = useState(null);
  const [reFetchSubTasks, setReFetchSubTasks] = useState(false);
  const [clickedOnCollection, setClickedOnCollection] = useState({});
  const [reFetchBoardName, setReFetchBoardName] = useState(false);

  const fetchUserBoards = async () => {
    const token = JSON.parse(localStorage.getItem("token")) || null;
    try {
      if (token) {
        const boards = await axios.get(
          `http://localhost:3001/api/v1/boards/getuserboards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBoards(boards.data.data.boards);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserBoards();
  }, [refresh, reFetchUserBoards, reFetchBoardName]);

  const valueToShare = {
    isDarkTheme,
    setIsDarkTheme,
    currentUserToken,
    setCurrentUserToken,
    boards,
    refresh,
    setRefresh,
    fetchUserBoards,
    reFetchBoardCollections,
    setReFetchBoardCollections,
    reFetchUserBoards,
    setReFetchUserBoards,
    showNewTaskPopUp,
    setShowNewTaskPopUp,
    showNewCollectionPopUp,
    setShowNewCollectionPopUp,
    reFetchCollectionTasks,
    setReFetchCollectionTasks,
    clickedOnTask,
    setClickedOnTask,
    reFetchSubTasks,
    setReFetchSubTasks,
    clickedOnCollection,
    setClickedOnCollection,
    reFetchBoardName,
    setReFetchBoardName,
  };

  return <context.Provider value={valueToShare}>{children}</context.Provider>;
}

export default ContextProvider;
