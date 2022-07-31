import React, { useState } from "react";
import "./ProjectFullScreen.css";

export default function ProjectFullScreen({
  project,
  imgIndex,
  setShowProject,
}) {
  const [index, setIndex] = useState(imgIndex);

  function close() {
    setShowProject(false);
  }

  function prev() {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  }

  function next() {
    if (index + 1 < project.length) {
      setIndex(index + 1);
    }
  }

  function getSrc(image) {
    return require("./img_full/" + image.folder + "/" + image.imgName + ".jpg");
  }

  if (project) {
    return (
      <div className="ProjectFullScreen">
        <div className="project-container">
          <i className="fa-solid fa-xmark" onClick={close}></i>
          <div className="nav-container">
            <i
              className={
                "fa-solid fa-chevron-left " + (index === 0 ? "hide" : "")
              }
              onClick={prev}
            ></i>
            <div className="image-container">
              <div className="image-cover"></div>
              <img src={getSrc(project[index])} alt="" />
            </div>
            <i
              className={
                "fa-solid fa-chevron-right " +
                (index === project.length - 1 ? "hide" : "")
              }
              onClick={next}
            ></i>
          </div>
        </div>
      </div>
    );
  } else return null;
}
