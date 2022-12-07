import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import ComputerNav from "./components/NavBar/ComputerNav";
import MobileNav from "./components/NavBar/MobileNav";
import NavLinks from "./components/NavBar/NavLinks";
function App() {
  const [validUser, setValidUser] = useState(false);
  const valid = () => setValidUser(!validUser);
  console.log(validUser);
  return (
    <div className="App">
      {validUser ? (
        <>
          <Nav>
            <ComputerNav>
              <NavLinks setValidUser={valid} />
            </ComputerNav>
            <MobileNav>
              <NavLinks setValidUser={valid} />
            </MobileNav>
          </Nav>
          <h1>valid user logged on</h1>
        </>
      ) : (
        <Login setValidUser={valid} />
      )}
    </div>
  );
}

export default App;
