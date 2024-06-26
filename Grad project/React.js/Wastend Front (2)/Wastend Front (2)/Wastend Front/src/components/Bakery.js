import React from "react";
import BusinessForm from "./Business";
import "./styles/business.css";
import formImg from "../assets/bakery.jpg";
import shop1 from "../assets/bakeryShop.png";
import shop2 from "../assets/bakeryShop2.png";
import BusinessAccordion from "./BusinessAccordion";
function Bakery() {
  return (
    <div className="business-main">
      <div className="business">
        <div className="container">
          <BusinessForm
            normalText={"MORE PROFIT"}
            specText={"AND LESS WASTE"}
          />
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
      <div className="testimonials">
        <div className="container">
          <div className="heading">
            BAKERIES LOVE USING <span>Wastend</span>
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
              {" "}
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <ul className="slider">
              <li className="slide">
                <img src={shop1} alt="shop" />
                <div className="text">
                  <h2>The Bakery Shop</h2>
                  <p>Prevents food waste in a creative way</p>
                  <a href="#register" className="main-button">
                    Register Your Business
                  </a>{" "}
                </div>
              </li>
              <li className="slide">
                <img src={shop2} alt="shop" />
                <div className="text">
                  <h2>The Bakery Shop</h2>
                  <p>
                    "We have gained regular customers that now visit a few times
                    a week to buy not only surprise bags but purchase other
                    daily items."
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
            <h3 className="heading">FOOD WASTE IN BAKERIES </h3>
            <p>
              With more than 36,229 bakeries, across the countries where you can
              save leftover food via Wastend, the bakery category is one of the
              most popular in the app. Because why not save the baked goods
              across Europe and not waste the resources and love that's put into
              the baking of bread?{" "}
            </p>
          </div>
          <div className="content">
            <div className="img-holder"></div>
            <div className="causes">
              <h4 className="title">CAUSES FOR FOOD WASTE IN BAKERIES</h4>
              <ul>
                <li>
                  Regular replenishment of stock and large product quantities on
                  display
                </li>
                <li>
                  Demand unpredictability and challenges in demand forecasting
                </li>
                <li>Lack of storage facilities</li>
                <li>
                  Availability of ready-made fresh food and products with
                  relatively short shelf-life
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

export default Bakery;
