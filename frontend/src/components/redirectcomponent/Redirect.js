import React, { useContext } from "react";
import { context } from "../../context/ContextProvider";
import { useNavigate } from "react-router";

function RedirectComponent() {
  const { boards } = useContext(context);
  const navigate = useNavigate();

  navigate(`/yourboard/${boards[0]?._id}`);

  return <div></div>;
}

export default RedirectComponent;
