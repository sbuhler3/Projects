import { BiDumbbell, BiRun, BiHome, BiLogOut } from "react-icons/bi";
export default function NavLinks() {
  return (
    <ul className="navbar-items">
      <li className="navbar-item">
        <BiHome size={20} className="icon" />
        Home
      </li>
      <li className="navbar-item">
        <BiDumbbell size={20} className="icon" />
        Strength Log
      </li>
      <li className="navbar-item">
        <BiRun size={20} className="icon" />
        Cardio Log
      </li>
      <li className="navbar-item">
        <BiLogOut size={20} className="icon" />
        Log out
      </li>
    </ul>
  );
}
