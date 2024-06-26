import React from "react";
import "./styles/User.css";
import Appstore from "../assets/app store.svg";
import Playstore from "../assets/google play.svg";
import UserAccordion from "./UserAccordion";
function User() {
  return (
    <>
      <div className="user-main">
        <div className="banner">
          <div className="center">
            <h2 className="heading">
              Save <span>the planet</span> at closing time
            </h2>
            <div className="sotres">
              <a href="#">
                <img src={Appstore} alt="get from App store" />
              </a>
              <a href="#">
                <img src={Playstore} alt="get from Play store" />
              </a>
            </div>
          </div>
        </div>
        <div className="getApp">
          <div className="container">
            <div className="heading">
              <h2>
                2.8 BILLION TONS OF <span>FOOD</span> IS <span>WASTED</span>{" "}
                EVERY YEAR
              </h2>
            </div>
            <p>
              We dream of a planet with no food waste. Every day, unsold food
              from your favorite restaurants, grocery stores, cafés, and shops
              goes to waste simply because it isn’t sold in time. The Wastend
              app makes it easy to make a difference, allowing you to save
              Surprise Bags of good food at an even better price.
            </p>
            <button className="main-button">Download The App</button>
          </div>
        </div>
      </div>
      <div className="wtn">
        <div className="container">
          <div className="heading">
            <h2>
              WHAT TO <span>KNOW</span>
            </h2>
            <UserAccordion />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
