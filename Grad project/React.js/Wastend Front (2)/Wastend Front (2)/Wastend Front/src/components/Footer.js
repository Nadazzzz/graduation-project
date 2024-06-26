import React from "react";
import "./styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer(props) {
  return props.display ? (
    <footer>
      <div className="container">
        <div className="row">
          <ul>
            <li>Press</li>
            <li>Careers</li>
            <li>MyStore</li>
            <li>DE&I Manifesto</li>
            <li>Code of Ethics</li>
            <li>Board Members</li>
          </ul>
          <ul>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Terms & Conditions</li>
            <li>Candidate Notice</li>
            <li>Code of Ethics</li>
            <li>Board Members</li>
          </ul>
          <ul className="social">
            <li>
              <FontAwesomeIcon icon={faFacebookF} />{" "}
            </li>
            <li>
              <FontAwesomeIcon icon={faYoutube} />{" "}
            </li>
            <li>
              <FontAwesomeIcon icon={faXTwitter} />{" "}
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedinIn} />{" "}
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} />{" "}
            </li>
          </ul>
        </div>
        <h4>Copyright © 2023 WastEnd All Rights Reserved.</h4>
      </div>
    </footer>
  ) : (
    ""
  );
}
export default Footer;
