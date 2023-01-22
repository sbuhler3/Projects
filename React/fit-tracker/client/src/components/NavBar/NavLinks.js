import React, { useContext } from "react";
import { BiDumbbell, BiRun, BiHome, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
export default function NavLinks() {
  const { logout } = useContext(AuthContext);
  return (
    <ul className="navbar-items">
      <Link to="/home">
        {" "}
        <li className="navbar-item">
          <BiHome size={30} className="icon" />
          Home
        </li>
      </Link>
      <Link to="/strength">
        {" "}
        <li className="navbar-item">
          <BiDumbbell size={30} className="icon" />
          Strength Log
        </li>
      </Link>
      <Link to="/cardio">
        <li className="navbar-item">
          <BiRun size={30} className="icon" />
          Cardio Log
        </li>
      </Link>
      <Link to="/login">
        <li className="navbar-item" onClick={logout}>
          <BiLogOut size={30} className="icon" />
          Log out
        </li>
      </Link>
    </ul>
  );
}
