import NavLinks from "./NavLinks";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function MobileNav() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav className="mobileNav">
      <FiMenu className="hamburger" size={40} onClick={handleClick} />
      {openMenu && <NavLinks />}
    </nav>
  );
}
