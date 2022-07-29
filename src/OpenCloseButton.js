import React, { useState, useEffect } from "react";
import { setImgListOnButtonClick } from "./setImgListOnButtonClick";
import "./OpenCloseButton.css";

export default function OpenCloseButton({
  project,
  tempImgList,
  setTempImgList,
  setListChange,
}) {
  const [projectIndex, setProjectIndex] = useState(null);
  const [time, setTime] = useState(null);
  const [runTimer, setRunTimer] = useState(false);
  const [btnClick, setBtnClick] = useState(false);

  useEffect(() => {
    if (projectIndex !== null) {
      setImgListOnButtonClick(
        tempImgList,
        setTempImgList,
        setListChange,
        projectIndex,
        setRunTimer
      );
    }
  }, [
    time,
    btnClick,
    projectIndex,
    setListChange,
    setTempImgList,
    tempImgList,
  ]);

  useEffect(() => {
    if (runTimer) {
      const interval = setInterval(() => setTime(Date.now()), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  function getFolderName(event) {
    let folder = event.target.id;

    tempImgList.map((tempListProject, i) => {
      if (tempListProject.folder === folder) {
        setBtnClick((prevState) => !prevState);
        setProjectIndex(i);
      }
      return true;
    });
  }

  if (project.imagesArray.length > 1) {
    return (
      <button
        className="OpenCloseButton"
        id={project.folder}
        onClick={getFolderName}
      >
        {project.openStatus ? "-" : "+"}
        {project.imagesArray.filter(function (img) {
          return project.openStatus
            ? img.display === "inline"
            : img.display === "none";
        }).length - (project.openStatus ? 1 : 0)}
      </button>
    );
  } else {
    return null;
  }
}
