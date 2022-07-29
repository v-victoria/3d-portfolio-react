import React from "react";
import "./App.css";
import Gallery from "./Gallery";

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
      <footer>
        <div>
          © 2022. This website was designed and coded by{" "}
          <a href="/">Victoria Martynenko</a>, and it is{" "}
          <a href="/">open-sourced</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
