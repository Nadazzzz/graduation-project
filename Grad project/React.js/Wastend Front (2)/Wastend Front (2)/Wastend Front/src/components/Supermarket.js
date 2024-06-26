import React from "react";
import BusinessForm from "./Business";
import "./styles/business.css";
import formImg from "../assets/superMarket.jfif";
import grocery1 from "../assets/grocery1.jpg";
import grocery2 from "../assets/grocery2.webp";
import BusinessAccordion from "./BusinessAccordion";
function Supermarket() {
  return (
    <div className="business-main">
      <div className="business">
        <div className="container">
          <BusinessForm
            normalText={"A ONE-STOP SHOP FOR YOUR surplus food "}
            specText={"MANAGEMENT"}
          />
          <img src={formImg} alt="cahsier" />
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
      <div className="testimonials">
        <div className="container">
          <div className="heading">
            GROCERY SHOPS LOVE USING <span>Wastend</span>
          </div>
          <div className="slider-holder">
            <button
              className="slider-arrow left disabled"
              onClick={(e) => {
                let slider = document.querySelector(".slider");
                slider.style.transform = "translate(0)";
                e.target.classList.add("disabled");
                let rightBtn = document.querySelector(".slider-arrow.right");
                rightBtn.classList.remove("disabled");
              }}
            >
              {" "}
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              className="slider-arrow right"
              onClick={(e) => {
                let slider = document.querySelector(".slider");
                slider.style.transform = "translate(-100%)";
                e.target.classList.add("disabled");
                let leftBtn = document.querySelector(".slider-arrow.left");
                leftBtn.classList.remove("disabled");
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <ul className="slider">
              <li className="slide">
                <img src={grocery1} alt="Grocery" />
                <div className="text">
                  <h2>MURRAY'S CHEESE</h2>
                  <p>I love how simple the process is</p>
                  <a href="#register" className="main-button">
                    Register Your Business
                  </a>{" "}
                </div>
              </li>
              <li className="slide">
                <img src={grocery2} alt="Grocery" />
                <div className="text">
                  <h2>BROOKLYN FARE</h2>
                  <p>
                    It has allowed us to repurpose GOOD food, instead of being
                    thrown away.
                  </p>
                  <a href="#register" className="main-button">
                    Register Your Business
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="waste">
        <div className="container">
          <div className="text">
            <h3 className="heading">FOOD WASTE IN SUPERMARKETS</h3>
            <p>
              Overstocking, inadequate package sizes and seasonal products are
              just a few of the many examples of why supermarkets waste food.
              Luckily more than 86,492 supermarkets across the Globe have
              already started fighting food waste along with consumers and Too
              Good To Go.
            </p>
          </div>
          <div className="content">
            <div className="img-holder grocery"></div>
            <div className="causes">
              <h4 className="title">CAUSES FOR FOOD WASTE IN RESTAURANTS</h4>
              <ul>
                <li>
                  Regular replenishment of stock and large product quantities on
                  display
                </li>
                <li>Inadequate package sizes to attract consumers </li>
                <li>Lack of storage facilities</li>
                <li>
                  Demand unpredictability and challenges in demand forecasting
                </li>
                <li>Overstocking in bulk and lack of storage facilities</li>
                <li>Availability of ready-made fresh food</li>
              </ul>
            </div>
          </div>
          <div className="contact">
            If your business wants to join or have an issue that we could help
            with then we’d love to hear from you. Feel free to{" "}
            <a href="#register">contact us.</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supermarket;
