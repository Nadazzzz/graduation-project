import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "./styles/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCalendarDays,
  faGears,
  faSignal,
  faVault,
  faCircleQuestion,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const params = useParams();

  function closeNav() {
    let nav = document.querySelector(".nav");
    nav.style.left = "-100%";
  }

  return (
    <div className="nav">
      <div className="close-nav">
        <FontAwesomeIcon onClick={() => closeNav()} icon={faXmark} />
      </div>
      <h3>Wastend</h3>
      <div className="dashboard-links">
        <NavLink
          to={`/${params.loggedUser}/dashboard`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faBagShopping} />
          Dashboard
        </NavLink>
        <NavLink
          to={`/${params.loggedUser}/calendar`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          Calendar
        </NavLink>
        <NavLink
          to={`/${params.loggedUser}/schedule`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          Schedule
        </NavLink>
        <NavLink
          to={`/${params.loggedUser}/settings`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faGears} />
          Settings
        </NavLink>
        <NavLink
          to={`/${params.loggedUser}/performance`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faSignal} />
          Performance
        </NavLink>
        <NavLink to={`/${params.loggedUser}/sales`} className="dashboard-link">
          <FontAwesomeIcon icon={faVault} />
          Sales
        </NavLink>
        <NavLink
          to={`/${params.loggedUser}/help-center`}
          className="dashboard-link"
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
          Help Center
        </NavLink>
        <NavLink to={"/"} className="dashboard-link">
          <FontAwesomeIcon icon={faRightFromBracket} />
          Sign Out
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
