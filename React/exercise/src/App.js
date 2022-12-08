import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components//NavBar/Nav";
import Home from "./components/Pages/Home";
import Strength from "./components/Pages/Strength";
import Cardio from "./components/Pages/Cardio";

function App() {
  const [validUser, setValidUser] = useState(false);
  const valid = () => setValidUser(!validUser);
  return (
    <div className="App">
      {validUser ? (
        <>
          <Nav setValidUser={valid} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strength" element={<Strength />} />
            <Route path="/cardio" element={<Cardio />} />
          </Routes>
        </>
      ) : (
        <Login setValidUser={valid} />
      )}
    </div>
  );
}

export default App;
