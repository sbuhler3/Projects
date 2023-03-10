import "./App.css";
import React, { useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import Cardio from "./components/Pages/Cardio";
import Strength from "./components/Pages/Strength";
import { AuthContext } from "./context/authContext.js";
function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/cardio"
          element={currentUser ? <Cardio /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/strength"
          element={
            currentUser ? <Strength /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
