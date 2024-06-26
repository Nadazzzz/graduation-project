import React from "react";
import "./styles/Site.css";
import sideImg from "../assets/cooking.jpg";
import download from "../assets/Google-Play-and-App-Store.webp";
import {
  faAnglesDown,
  faEarthAfrica,
  faUsers,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Site() {
  return (
    <>
      <div className="landing">
        <div className="row">
          <div className="container">
            <div className="left">
              <div>
                <h2 className="heading">
                  Let's fight <span>food waste</span> together
                </h2>
                <p>
                  Food waste is a big problem, and we can be a solution. Too
                  Good To Go is the app that lets you rescue unsold food at your
                  favorite spots from an untimely fate.
                </p>
                <p>
                  Use the app to explore stores and restaurants in your local
                  area and save surprise bags of surplus food from going to
                  waste at a great price.
                </p>
              </div>
              <div className="next-section">
                <a href="#icons">
                  <FontAwesomeIcon icon={faAnglesDown} />{" "}
                </a>
              </div>
            </div>
            <div className="right">
              <div className="img-holder">
                <img src={sideImg} alt="sideImg" />
              </div>
            </div>
          </div>
        </div>
        <div className="icons" id="icons">
          <div className="container">
            <div className="heading">
              MORE THAN <span>1/3</span> OF ALL FOOD IS BEING WASTED
            </div>
            <div className="row">
              <div className="card">
                <div className="icon">
                  <FontAwesomeIcon icon={faEarthAfrica} /> <p>Environmental</p>
                </div>
                <p>
                  Food waste is responsible for 10% of greenhouse gas emissions
                  (that's more than the whole aviation industry).
                </p>
              </div>
              <div className="card">
                <div className="icon">
                  <FontAwesomeIcon icon={faUsers} /> <p>Social</p>
                </div>
                <p>
                  We waste 2.8 billion tons of food annually, while 828 million
                  people go hungry every day.
                </p>
              </div>
              <div className="card">
                <div className="icon">
                  <FontAwesomeIcon icon={faMoneyBillWave} /> <p>Economic</p>
                </div>
                <p>Wasting food costs us $1.2 trillion each year.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="downloadApp">
        <div className="container">
          <div className="heading">Doing good made tasty</div>
          <p>
            Feeling hungry? With the Too Good To Go app, you can eat well while
            making an impact. Save Surprise Bags of good food at an even better
            price from restaurants and stores near you.
          </p>
          <div className="content">
            <div className="left">
              <img src={download} alt="get The App" />
            </div>
            <div className="right">
              <button className="main-button ">Download The App</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Site;
