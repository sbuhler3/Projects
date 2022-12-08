import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function MobileNav(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav className="mobileNav">
      <FiMenu className="hamburger" size={40} onClick={handleClick} />
      {openMenu && props.children}
    </nav>
  );
}
