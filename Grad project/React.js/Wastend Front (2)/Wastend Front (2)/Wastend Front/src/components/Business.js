import React from "react";
import "./styles/business.css";
import formImg from "../assets/cashier.jpg";
import BusinessAccordion from "./BusinessAccordion";
import BusinessForm from "./BusinessForm";

export default function Business() {
  return (
    <div className="business-main">
      <div className="business">
        <div className="container">
          <BusinessForm />
          <img src={formImg} alt="cahsier" />
        </div>
      </div>
      <div className="sec2">
        <div className="container">
          <h2 className="heading">
            GOOD FOR BUSINESS, EVEN BETTER FOR THE PLANET
          </h2>
          <p>
            Be part of the solution. Cut food waste, find customers and unlock
            new revenue with Wastend.
          </p>
          <a href="#register" className="main-button">
            Register Your Business
          </a>
        </div>
      </div>
      <div className="wtn">
        <div className="container">
          <h2 className="heading">
            WHAT TO <span>KNOW</span>
          </h2>
          <BusinessAccordion />
        </div>
      </div>
    </div>
  );
}
