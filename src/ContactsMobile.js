import React from "react";
import "./ContactsMobile.css";

export default function ContactsMobile() {
  return (
    <div className="ContactsMobile">
      <div className="email-info">
        <a href="mailto:i.v.v@live.com">Please do contact me</a>
        <span> at i.v.v@live.com</span>
      </div>
      <div className="contact-icons">
        <a
          href={require("./CV.pdf")}
          download="CV - 3D Artist - Victoria Martynenko"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={require("./svg/cv-icon-white.svg").default}
            alt="CV download icon"
          />
        </a>
        <a
          href="https://www.behance.net/3dmvv"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-square-behance"></i>
        </a>
        <a
          href="https://linkedin.com/in/victoria-martynenko"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}
