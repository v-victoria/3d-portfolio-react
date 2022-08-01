import React from "react";
import "./App.css";
import Gallery from "./Gallery";
import Contacts from "./Contacts";
import ContactsMobile from "./ContactsMobile";

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          My name is <span className="name">Victoria</span>
        </h1>
        <h2>
          I am a 3D Artist in the direction of Architectural Visualisation
        </h2>
        <h3>My Portfolio</h3>
      </header>
      <Gallery />
      <footer className="footer">
        <Contacts />
        <ContactsMobile />
        <div>
          © 2022. This website was designed and coded by{" "}
          <a
            href="https://victoria-martynenko.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Victoria Martynenko
          </a>
          , and it is{" "}
          <a
            href="https://github.com/v-victoria/3d-portfolio-react"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
