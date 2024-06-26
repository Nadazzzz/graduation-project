import React from "react";
import "./styles/Careers.css";
import { Link } from "react-router-dom";
import AboutAccordion from "./AboutAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faHandPeace,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLeaf,
  faPuzzlePiece,
  faEarthAfrica,
  faCakeCandles,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
function Careers() {
  return (
    <>
      <div className="main">
        <div className="text">
          <h2>Join us to fight food waste together</h2>
          <Link to={"/carrers/opportunities"} className="main-button">
            See Open Opportunites
          </Link>
        </div>
      </div>
      <div className="aboutUs">
        <div className="container">
          <div className="section-title">
            <h2>
              ABOUT <span>US</span>
            </h2>
            <p>
              we’re not a fan of waste; not food waste, wasting time or wasting
              opportunity. That’s why everyone at Wastend works to make a
              difference — driving real-world impact for the planet and society.
              Join us today to empower a movement.
            </p>
          </div>
          <div className="row">
            <div className="accordions">
              <AboutAccordion />
            </div>
            <div className="image"></div>
          </div>
        </div>
      </div>
      <div className="ourAmbition">
        <div className="container">
          <div className="section-title">
            <h2>
              OUR <span>AMBITION</span>
            </h2>
            <p>
              We're working to end food waste. To do so, we're assembling a
              passionate team of problem-solvers to help us make this happen.
              From customer care to sales, marketing to public affairs - we give
              you a chance to use your talent for good.
            </p>
          </div>
          <div className="row">
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faHandshake} /> <h5>MISSION</h5>
              </div>
              <p>
                To inspire and empower everyone to fight food waste together.
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faLeaf} /> <h5>Vision</h5>
              </div>
              <p>We dream of a planet with no food waste.</p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faEarthAfrica} /> <h5>Impact</h5>
              </div>
              <p>
                We are a B Corp and social impact company, making real change.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="benefits">
        <div className="container">
          <div className="section-title">
            <h2>
              Our global <span>benefits</span>
            </h2>
            <p>
              Each market has their own benefits, so these are just some of the
              great aspects about working at Wastend
            </p>
          </div>
          <div className="row">
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faPuzzlePiece} /> <h5>Work Flexibly</h5>
              </div>
              <p>
                - Enjoy hybrid working from our great offices, at home or
                abroad.
                <br />- Extra parental leave and days off beyond local
                legislation.
                <br /> - Health insurance and pension plans (subject to country
                of employment).{" "}
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faCakeCandles} />{" "}
                <h5>Celebrate & socialise</h5>
              </div>
              <p>
                - Regular social events like summer and winter parties.
                <br /> - Coffee, snacks and fully-equipped kitchens.
                <br /> - Get to know our community with free meal vouchers on
                joining.
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faCertificate} />{" "}
                <h5>Learn & develop</h5>
              </div>
              <p>
                - Discover learning and development opportunities for everyone
                from joining, including programmes to progress your career.
              </p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faHandPeace} />{" "}
                <h5>Volunteer your time</h5>
              </div>
              <p>- Paid volunteer time through our Shareback programme.</p>
            </div>
            <div className="card">
              <div className="icon">
                <FontAwesomeIcon icon={faHeart} /> <h5>Be yourself</h5>
              </div>
              <p>
                - Support for big life moments from fertility to bereavement.
                <br /> - Employee Resource Groups for Women in Leadership{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Careers;
