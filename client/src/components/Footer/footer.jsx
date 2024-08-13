// client/src/components/Footer/footer.jsx
import React from "react";
import "./footer.css";
import facebook from "./../../media/images/facebook.png";
import twitter from "./../../media/images/twitter.png";
import google_plus from "./../../media/images/google_plus.png";
import instagram from "./../../media/images/instagram.png";
import { Link } from "react-router-dom";

const renderSpan = (word) => <span>{word}</span>;

export const Footer = () => {
  return (
    <section className="footer-section" id="footer">
      <div className="footer-up">
        <div className="footer-list">
          <h3 className="footer-title">About Us</h3>
          <p>{renderSpan("About Movie App")}</p>
          <p>{renderSpan("Contact Us")}</p>
          <p>{renderSpan("Terms of Service")}</p>
          <p>{renderSpan("Private Policy")}</p>
        </div>
        <div className="footer-list">
          <h3 className="footer-title">Top Movies</h3>
          <Link to={`/genre/${28}`}>
            <p>{renderSpan("Action")}</p>
          </Link>
          <Link to={`/genre/${10749}`}>
            <p>{renderSpan("Romance")}</p>
          </Link>
          <Link to={`/genre/${35}`}>
            <p>{renderSpan("Comedy")}</p>
          </Link>
          <Link to={`/genre/${27}`}>
            <p>{renderSpan("Horror")}</p>
          </Link>
        </div>
        <div className="footer-list">
          <h3 className="footer-title">Genres</h3>
          <Link to={`/genre/${12}`}>
            <p>{renderSpan("Adventure")}</p>
          </Link>
          <Link to={`/genre/${80}`}>
            <p>{renderSpan("Crime")}</p>
          </Link>
          <Link to={`/genre/${14}`}>
            <p>{renderSpan("Fantasy")}</p>
          </Link>
          <Link to={`/genre/${16}`}>
            <p>{renderSpan("Animation")}</p>
          </Link>
        </div>
        <div className="footer-subscribe">
          <h3 className="footer-title">Subscribe</h3>
          <p>Join our mailing list and get the latest movie alerts!</p>
          <form className="footer-form">
            <input
              type="email"
              className="footer-input"
              placeholder="Email Address"
              required
            />
            <button type="submit" className="footer-submit-button">
              Submit
            </button>
          </form>
          <div className="footer-social">
            <img src={facebook} alt="Facebook" />
            <img src={twitter} alt="Twitter" />
            <img src={google_plus} alt="Google Plus" />
            <img src={instagram} alt="Instagram" />
          </div>
        </div>
      </div>
      <div className="footer-down">
        <p>© 2024 All rights reserved | Built and designed by Achiya Tzuriel</p>
      </div>
    </section>
  );
};
