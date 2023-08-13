import "./App.css";
import { Fragment } from "react";
import {
  BoardPage,
  SignupPage,
  RedirectComponent,
  SigninPage,
} from "./components/Index";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<SigninPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/yourboard" element={<RedirectComponent />}></Route>
        <Route path="/yourboard/:boardId" element={<BoardPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
