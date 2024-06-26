import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
function DashboardHeader() {
  function ShowNav() {
    let nav = document.querySelector(".nav");
    nav.style.left = "0";
  }

  return (
    <header>
      <FontAwesomeIcon
        onClick={() => ShowNav()}
        className="nav-toggler"
        icon={faBars}
      />
      <FontAwesomeIcon icon={faBell} />
    </header>
  );
}

export default DashboardHeader;
