import React, { useState } from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";
function Home() {
  const [country, setCountry] = useState("en-us");
  return (
    <div className="main-banner">
      <div className="container">
        <div className="countries-holder">
          <h2>Choose Your Country</h2>
          <select onChange={(e) => setCountry(e.target.value)}>
            <option value={"en-US"}>United States</option>
            <option value={"En-UK"}>United Kingdom</option>
            <option value={"Ast"}>Austria</option>
            <option value={"Fr"}>France</option>
            <option value={"Gr"}>Germany</option>
          </select>
          <Link to={`/${country}`} className="main-button">
            Go to website
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
