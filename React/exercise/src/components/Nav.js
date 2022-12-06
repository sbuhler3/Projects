import ComputerNav from "./NavBar/ComputerNav";
import MobileNav from "./NavBar/MobileNav";
export default function Nav(props) {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <nav className="navbar">
      <h4 className="nav-sitename">MyExercise</h4>
      <ComputerNav setValidUser={props.setValidUser} />
      <MobileNav setValidUser={props.setValidUser} />
    </nav>
  );
}
