import "./App.css";
import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Cardio from "./components/Pages/Cardio";
import Strength from "./components/Pages/Strength";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/strength" element={<Strength />} />
      </Routes>
    </div>
  );
}

export default App;
