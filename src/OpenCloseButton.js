import React, { useState, useEffect } from "react";
import { setImgListOnButtonClick } from "./setImgListOnButtonClick";
import "./OpenCloseButton.css";

export default function OpenCloseButton({
  display,
  project,
  images,
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
        images,
        setTempImgList,
        setListChange,
        projectIndex,
        setRunTimer
      );
    }
  }, [time, btnClick, projectIndex, setListChange, setTempImgList, images]);

  useEffect(() => {
    if (runTimer) {
      const interval = setInterval(() => setTime(Date.now()), 500);
      return () => {
        clearInterval(interval);
      };
    }
  });

  function getFolderName(event) {
    let folder = event.target.id;
    console.log(folder);
    let imgArray = [];
    images.map((img, i) => {
      if (img.folder === folder) {
        imgArray[imgArray.length] = i;
      }
      return true;
    });
    if (imgArray !== []) {
      console.log(imgArray);
      setBtnClick((prevState) => !prevState);
      setProjectIndex(imgArray);
    }
  }

  if (project.length > 1) {
    return (
      <button
        className={"OpenCloseButton" + display}
        id={project[0].folder}
        onClick={getFolderName}
      >
        {project[0].openStatus ? "-" : "+"}
        {project.filter(function (img) {
          return project[0].openStatus
            ? img.display === "inline"
            : img.display === "none";
        }).length - (project[0].openStatus ? 1 : 0)}
      </button>
    );
  } else {
    return null;
  }
}
