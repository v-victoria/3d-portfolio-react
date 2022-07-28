import React, { useState, useEffect } from "react";
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
    function setImgList() {
      let images = tempImgList;
      let imagesArray = images[projectIndex].imagesArray;

      if (images[projectIndex].openStatus) {
        for (let i = imagesArray.length - 1; i > 0; i--) {
          if (imagesArray[i].display === "inline") {
            imagesArray[i].display = "none";
            images[projectIndex].imagesArray = imagesArray;

            if (i === 1) {
              images[projectIndex].openStatus = false;
              setRunTimer(false);
            } else {
              setRunTimer(true);
            }
            i = 0;
          }
        }
      } else {
        for (let i = 1; i < imagesArray.length; i++) {
          if (imagesArray[i].display === "none") {
            imagesArray[i].display = "inline";
            images[projectIndex].imagesArray = imagesArray;

            if (i === imagesArray.length - 1) {
              images[projectIndex].openStatus = true;
              setRunTimer(false);
            } else {
              setRunTimer(true);
            }
            i = imagesArray.length;
          }
        }
      }

      setTempImgList(images);
      setListChange((prevState) => !prevState);
    }

    if (projectIndex !== null) {
      setImgList();
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
