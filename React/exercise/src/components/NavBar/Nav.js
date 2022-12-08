import ComputerNav from "./ComputerNav";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
export default function Nav(props) {
  return (
    <nav className="navbar">
      <h4 className="nav-sitename">MyExercise</h4>
      <ComputerNav>
        <NavLinks setValidUser={props.setValidUser} />
      </ComputerNav>
      <MobileNav>
        <NavLinks setValidUser={props.setValidUser} />
      </MobileNav>
    </nav>
  );
}
