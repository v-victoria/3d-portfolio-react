import React, { useState, useEffect } from "react";
import "./Contacts.css";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";

export default function Contacts() {
  const [email, setEmail] = useState("i.v.v@live.com");
  const [showEmail, setShowEmail] = useState(false);
  const [time, setTime] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  window.addEventListener("scroll", function (e) {
    let footerElem = document.querySelector("footer");
    let scrollDistance = window.scrollY;

    if (footerElem.offsetTop <= scrollDistance + window.innerHeight) {
      setShowContacts(true);
    } else {
      setShowContacts(false);
    }
  });

  useEffect(() => {
    if (time !== null) {
      setShowEmail((prevState) => !prevState);
      setEmail("i.v.v@live.com");
      setCopied(false);
    }
  }, [time, setCopied, setEmail, setShowEmail]);

  useEffect(() => {
    if (copied) {
      const interval = setInterval(() => setTime(Date.now()), 1500);
      return () => {
        clearInterval(interval);
      };
    }
  });

  function copyEmailToClipboard() {
    navigator.clipboard
      .writeText("i.v.v@live.com")
      .then(() => {
        setEmail("Copied!");
        setCopied(true);
      })
      .catch(() => {
        setEmail("Error...");
        setCopied(true);
      });
  }

  function handleShowEmail() {
    setShowEmail(!showEmail);
  }

  return (
    <XyzTransition
      appear={false}
      xyz="fade-100% right-25%"
      duration={{ appear: "auto", in: 300, out: 300 }}
    >
      {showContacts && (
        <div className="Contacts">
          <div className="email-container">
            <XyzTransition
              appear={false}
              xyz="fade-100% right-25%"
              duration={{ appear: "auto", in: 300, out: 300 }}
            >
              {showEmail && (
                <div className="email-copy">
                  <i
                    className="fa-solid fa-clone"
                    onClick={copyEmailToClipboard}
                  ></i>

                  <span>{email}</span>
                </div>
              )}
            </XyzTransition>
            <i
              className="fa-solid fa-square-envelope"
              onClick={handleShowEmail}
            ></i>
          </div>
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
          <a
            href={require("./CV.pdf")}
            download="CV - 3D Artist - Victoria Martynenko"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={require("./svg/cv-icon.svg").default}
              alt="CV download icon"
            />
          </a>
        </div>
      )}
    </XyzTransition>
  );
}
