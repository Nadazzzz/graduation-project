import React from "react";
import BusinessForm from "./Business";
import "./styles/business.css";
import formImg from "../assets/restaurant.jfif";
import rest2 from "../assets/restaurant2.webp";
import rest3 from "../assets/restaurant3.webp";
import BusinessAccordion from "./BusinessAccordion";
function Restaurant() {
  return (
    <div className="business-main">
      <div className="business">
        <div className="container">
          <BusinessForm
            normalText={"more footfall FOR A new "}
            specText={" revenue stream"}
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
                <img src={rest2} alt="Restaurant" />
                <div className="text">
                  <h2>Fateer</h2>
                  <p>
                    "A practical and easy way to combat food waste that is
                    easily managed as part of the nightly routine."
                  </p>
                  <a href="#register" className="main-button">
                    Register Your Business
                  </a>{" "}
                </div>
              </li>
              <li className="slide">
                <img src={rest3} alt="Restaurant" />
                <div className="text">
                  <h2>El-Nile Restaurant</h2>
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
            <h3 className="heading">FOOD WASTE IN RESTAURANTS</h3>
            <p>
              There are a number of reasons that restaurants waste food every
              single day, but luckily there is a way to make sure that less food
              is wasted. 42,108 restaurants have already joined Too Good To Go
              to make sure that the food ends up on the plate and not in the
              bin.
            </p>
          </div>
          <div className="content">
            <div className="img-holder grocery"></div>
            <div className="causes">
              <h4 className="title">CAUSES FOR FOOD WASTE IN RESTAURANTS</h4>
              <ul>
                <li>Over-preparation</li>
                <li>Incorrect and oversized portions</li>
                <li>Lack of storage facilities</li>
                <li>
                  Over-ordering, overstocking and lack of adequate storage
                  facilities
                </li>
                <li>
                  Preparation residues (e.g trimmings, peels) and lack of
                  repurposing of ingredients
                </li>
                <li>
                  No practice of allowing customers to take home their own
                  leftovers
                </li>
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

export default Restaurant;
