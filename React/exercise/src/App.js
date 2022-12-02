import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";

function App() {
  const [validUser, setValidUser] = useState(false);
  const valid = () => setValidUser(!validUser);
  return (
    <div className="App">
      {validUser ? (
        <>
          <Nav setValidUser={valid} /> <h1>valid user logged on</h1>
        </>
      ) : (
        <Login setValidUser={valid} />
      )}
    </div>
  );
}

export default App;
