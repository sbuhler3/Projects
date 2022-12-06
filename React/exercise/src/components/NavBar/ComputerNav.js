import NavLinks from "./NavLinks";

export default function ComputerNav(props) {
  return (
    <nav className="computerNav">
      <NavLinks setValidUser={props.setValidUser} />
    </nav>
  );
}
