import React from "react";
import ComputerNav from "./ComputerNav";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
export default function Nav(props) {
  return (
    <nav className="navbar">
      <h4 className="nav-sitename">FitTracker</h4>
      <ComputerNav>
        <NavLinks />
      </ComputerNav>
      <MobileNav>
        <NavLinks />
      </MobileNav>
    </nav>
  );
}
