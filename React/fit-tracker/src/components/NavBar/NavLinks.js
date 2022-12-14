import { BiDumbbell, BiRun, BiHome, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function NavLinks(props) {
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
        <li
          className="navbar-item"
          onClick={() => {
            console.log("clicked cardio");
          }}
        >
          <BiRun size={30} className="icon" />
          Cardio Log
        </li>
      </Link>
      <Link to="/login">
        <li className="navbar-item" onClick={props.setValidUser}>
          <BiLogOut size={30} className="icon" />
          Log out
        </li>
      </Link>
    </ul>
  );
}
