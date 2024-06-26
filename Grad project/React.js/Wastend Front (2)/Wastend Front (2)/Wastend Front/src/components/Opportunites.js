import React from "react";
import "./styles/Opportunites.css";
function Opportunites() {
  return (
    <>
      <div className="main-banner">
        <div className="container">
          <div div className="heading">
            Explore <span>careers</span> at Wastend
          </div>
          <div className="filters">
            <select className="location">
              <option>Austria</option>
              <option>Belgium</option>
              <option>Canada</option>
              <option>Denmark</option>
            </select>
            <select className="dep">
              <option>Key Accounts</option>
              <option>Sales</option>
              <option>Global Management Team</option>
              <option>Tech</option>
              <option>Care</option>
              <option>Commercial</option>
            </select>
            <button className="main-button search">Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Opportunites;
