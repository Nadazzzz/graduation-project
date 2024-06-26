import React from "react";
import "./styles/header.css";
import { Link, NavLink, useParams } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header(props) {
  const params = useParams();
  if (params.lang) {
    console.log(params.lang);
  }
  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          Wastend
        </Link>
        <button
          className="main-button navbar-toggler"
          onClick={() => {
            let navbar = document.querySelector(".navbar");
            navbar.classList.toggle("show");
          }}
        >
          <FontAwesomeIcon icon={faBars} />{" "}
        </button>
        {!props.different ? (
          <>
            <div className="navbar">
              <div className="container">
                <NavLink to="/careers">CAREERS</NavLink>
                <NavLink to="/diversity">Diversity, Equity & Inclusion</NavLink>
                <Link to="/carrers/opportunities" className="main-button">
                  See Open Positon
                </Link>
              </div>
            </div>
            <div className="links">
              <NavLink to="/careers">CAREERS</NavLink>
              <NavLink to="/diversity">Diversity, Equity & Inclusion</NavLink>
              <Link to="/carrers/opportunities" className="main-button">
                See Open Positon
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="navbar">
              <div className="container">
                {props.different && props.isHome ? (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                  </>
                ) : props.isUser ? (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                    <div className="industries">
                      <NavLink>Industries</NavLink>
                      <ul className="subMenu">
                        <Link to={`/${params.lang}/business/bakery`}>
                          Bakeries
                        </Link>
                        <Link to={`/${params.lang}/business/supermarket`}>
                          Grocery Stores
                        </Link>
                        <Link to={`/${params.lang}/business/restaurant`}>
                          Restaurants
                        </Link>
                      </ul>
                    </div>
                    <NavLink to={`/MyStoreLogin`}>MyStore Login</NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="links">
              <div className="u-b">
                {props.different && props.isHome ? (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                  </>
                ) : props.isUser ? (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to={`/${params.lang}/user`}>USER</NavLink>
                    <NavLink to={`/${params.lang}/business`}>BUSINESS</NavLink>
                    <Link
                      className="link-dropdown"
                      onClick={() => {
                        let industriesNav =
                          document.querySelector(".industries-holder");
                        industriesNav.classList.toggle("show");
                      }}
                    >
                      Industries
                    </Link>
                    <NavLink to={`/MyStoreLogin`}>MyStore Login</NavLink>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="industries-holder">
        <div className="container">
          {" "}
          <h4>Industries</h4>
          <div className="links">
            <Link to={`/${params.lang}/business/bakery`}>Bakeries</Link>
            <Link to={`/${params.lang}/business/supermarket`}>
              Grocery Stores
            </Link>
            <Link to={`/${params.lang}/business/restaurant`}>Restaurants</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
